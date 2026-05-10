+++
draft = false
date = 2026-05-10T12:00:00-07:00
title = "GraphRAG in one round trip"
description = "Building NeoFuse: a kernel-level Neo4j procedure that fuses ANN search, graph-aware reranking, and parallel BFS into a single transaction."
slug = "graphrag-one-round-trip"
authors = ["Darragh Mahns"]
tags = ["neo4j", "graph-rag", "databases", "usc"]
categories = ["projects"]
+++

## The setup

My other graduate-level course this semester was CSCI-543, "Foundations of Modern Data Management and Processing." The second project was team-based: build something interesting on top of a knowledge-graph database. Most teams picked Neo4j, including ours, and most picked a graph-RAG angle. We called the project **NeoFuse**, short for "fused graph RAG," and it turned out to be a much deeper dive into the internals of Neo4j than we'd expected.

The pitch in one sentence: Neo4j already has all the pieces you need for graph-RAG retrieval, but they live in three separate rooms and your application has to walk between them. We put them in one room at the kernel level.

## What graph-RAG actually looks like in Neo4j today

If you want retrieval-augmented generation with a knowledge graph, the usual Neo4j recipe is two Cypher queries:

1. Vector search: take the query embedding, hit the HNSW-backed vector index, get the top-K most similar nodes as "seeds."
2. Graph traversal: BFS out from those seeds to a specified depth, collect the resulting subgraph, return it to the client.

That's two round trips across the Bolt protocol, two query plans compiled by the Cypher planner, and (this is the part that bugged my group) no way to do anything smart *between* the two steps cheaply. The HNSW vector index tends to return tightly clustered top-K, because similar documents live in similar embedding-space neighborhoods. When you then BFS from all those seeds, you explore the same graph region multiple times. A lot of the traversal budget is wasted on redundant context.

The 'obvious' fix is to rerank the seeds before you traverse them, penalizing ones whose 1-hop neighborhoods already overlap with seeds you've chosen. But that requires reading neighborhoods from the database, which is cheap if you're *in* the database and expensive if you're a Python (AI) client making another round trip.

## What we built

A native Neo4j procedure, not a plugin drop-in but an actual kernel module under `community/rag-plugin/` (should probably rename, since it isn't really a plugin), that does all three stages in one KernelTransaction:

```cypher
CALL rag.retrieve(indexName, embedding, topK, depth, config)
  YIELD node, hopDepth, score
```

Inside the kernel, the call runs:

1. **ANN search.** Hit the HNSW index, but oversample: grab `5 × topK` candidates so we have room to pick good seeds out of a bigger pool.
2. **Graph-aware rerank.** For each candidate, collect its bounded 1-hop neighborhood. Then greedy-select seeds using a score that trades ANN similarity against how much the candidate's neighborhood overlaps with already-selected seeds:

    ```
    rerankScore(c) = annScore(c) − λ · max_{s ∈ S} Jaccard(N(c), N(s))
    ```

    where `N(x)` is the 1-hop neighborhood, `S` is the set of seeds we've already picked, and `λ` is a configurable overlap penalty. Pick the top candidate, add it to `S`, repeat until you have topK seeds.
3. **Parallel BFS.** BFS out to the requested depth, with a configurable parallelism knob. Each worker gets its own ExecutionContext and cursor pool; a `ConcurrentHashMap` handles the visited set with `putIfAbsent` so only one worker "wins" each node. Correctness preserved, scales with cores.

The whole thing runs in one transaction. The client sends one message and gets a stream of subgraph rows back.

## The benchmark harness

I owned most of this. The plugin is the interesting bit algorithmically, but there's a lot of infrastructure required to actually compare a native procedure against a two-Cypher-call baseline fairly. I built a Python CLI (`./scripts/bench.sh` with subcommands `doctor`, `setup`, `run`, `results`) that handles:

- Building the Neo4j + plugin tarball and extracting it into a runtime
- Importing the OGB `ogbn-arxiv` dataset (169K CS paper nodes, 1.17M citation edges, 128-dim precomputed embeddings) via `neo4j-admin import`
- Creating the cosine vector index
- Running a deterministic 6,000-case query manifest (500 seed nodes × 12 scenarios where `topK ∈ {1, 3, 5, 10}` and `depth ∈ {0, 1, 2}`)
- Executing both the native path and the two-call baseline, optionally with a server restart between phases so one method doesn't benefit from a warmer cache
- Dumping per-query latencies to CSV and aggregated metrics to JSON
- Post-processing: paired Jaccard overlap on result sets, mean pairwise seed-neighborhood overlap, label entropy

Manifests, logs, and result CSVs are all written to the repo, so anyone on the team could rerun a study and get byte-identical inputs.

## Results

Three metrics mattered.

**Latency.** Marginal win. Native `rag.retrieve()` has slightly lower end-to-end latency than the two-call baseline across most of the topK × depth grid, but not dramatically so. The interesting framing is that NeoFuse delivers roughly equivalent wall-clock time in one round trip instead of two, which is more operationally attractive than the raw number suggests, because application logic no longer has to sit in a Python loop making two sequential queries.

**Seed neighborhood overlap.** Clear win. The scatter plot of native-vs-baseline mean pairwise overlap is mostly below the equal-overlap diagonal, meaning NeoFuse consistently picks less-redundant seeds. From the quality summary: native averaged 0.0001 neighborhood overlap vs. 0.020 for the baseline. That's a 200× reduction in redundant traversal, which directly improves how much unique context the downstream LLM sees.

**Label diversity.** Wash. Both methods cover roughly the same number of unique CS subject labels in the final subgraph at each BFS depth. This one actually surprised me a little; I expected the reranker to widen label coverage, but ogbn-arxiv's 40 labels are coarse enough that even the baseline's redundant seeds are spread across a lot of subcategories at depth 2.

So the honest summary is: reranking buys you demonstrably less-redundant seeds, kernel-level fusion buys you one fewer round trip at comparable latency, and label diversity is a wash on this dataset.

## What I'd do differently

**Use a graph with finer-grained labels.** The label-diversity metric would probably look more interesting on a graph where the label space is larger than 40 classes, or where labels are hierarchical. ogbn-arxiv was a good starting point because it's standardized and comes with precomputed embeddings, but it doesn't fully test what reranking buys you.

**Run the benchmark on a bigger machine.** Our parallel BFS scales with cores; we ran the benchmark on our own laptops with limited cores. The scaling story on a 32-core box would be more compelling.

**Ablate the hyperparameters.** We shipped with a single oversample factor (5) and one overlap-penalty weight (λ). The final slide deck lists hyperparameter sweeps as future work, which is the right call but also the obvious next thing to do if this were a paper.

**Write more tests for the rerank path.** The module has unit tests for BFS correctness and for the procedure's output schema, but the greedy-select logic is tested mostly by whether the end-to-end metrics look reasonable. A focused test suite on the reranker, asking "given these candidates with these neighborhoods, does the selector pick the right seeds?", would be worth an afternoon more of work.

## Closing

Big chunks of credit for this one belong to Chelsea, who owned the reranker, and Chaya, who pulled a lot of weight on the slides and the writeup. Code lives on [GitHub](https://github.com/chuynh00/CS543-Spring-2026-Project2-Neo4j). It's a full Neo4j fork, so the interesting bits are under `community/rag-plugin/` and `neo4j-rag-benchmark/`.

If there's a theme across the two projects I wrote about this semester, it's that measurement infrastructure is worth more than the algorithmic work on top of it. For the NLP project it was the evaluation pipeline that surfaced the leakage problem. For this one it's the benchmark harness that lets us make any defensible claim at all about latency and diversity. "Is it better?" is a question that only means something if you've built the apparatus to answer it fairly.

Thanks for reading.
