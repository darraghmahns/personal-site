---
title: "Projects"
description: "Personal and learning projects: AI agents, document extraction, graph RAG, prediction markets, and an HTTP server built from sockets."
keywords:
  - AI projects
  - forward deployed engineer portfolio
  - Neo4j
  - document extraction
date: 2026-01-01
draft: false
---

Selected things i've built or led. Headings are the story; details stay close to what is in the repo.

## how i built document extraction with python and fastapi

[DES-Demo](https://github.com/darraghmahns/DES-Demo) pulls structured fields out of pdf uploads: `extractor.py` and `processor.py` run the pipeline, `pii_scanner.py` and `verifier.py` sanity-check output before it hits the api. Live demo at [des.darraghmahns.com](https://des.darraghmahns.com).

## how i built an http/1.1 server with raw python sockets

[`http`](https://github.com/darraghmahns/http) is a from-scratch origin server (rfc 9112 messaging): persistent connections, chunked bodies, range requests, gzip, and virtual hosts in `server.py`, serving static files from `www/` on port 8080.

## how i matched prediction markets with qwen labels and xgboost

[semantic-equivalence](https://github.com/darraghmahns/semantic-equivalence) scores whether kalshi and polymarket listings describe the same event — tf-idf + sentence-bert retrieval, 60k qwen 2.5-14b labels under json schema, then flan-t5 + xgboost (f1 0.70 on the held-out match class). Team project for usc csci-544; [write-up](/posts/semantic-equivalence-prediction-markets/).

## how i fused graph rag into one neo4j procedure call

NeoFuse (csci-543 team project) registers a kernel plugin that runs ann search, graph-aware reranking, and parallel bfs in one `call rag.retrieve` against neo4j 5.26. Benchmarked on ogbn-arxiv (169k nodes). [Blog post](/posts/graphrag-one-round-trip/) · teammate repo [on github](https://github.com/chuynh00/CS543-Spring-2026-Project2-Neo4j).

## how i built a cycling coach with gpt-4 and strava

[reroute-v3](https://github.com/darraghmahns/reroute-v3) — react + fastapi app with strava oauth, mapbox, and gpt-4 generated training routes.

## how i shipped ar magazine pages with three.js

[g3nar](https://github.com/darraghmahns/G3NAR) — web ar for g3n3ration magazine. [Live demo](https://g3nar.onrender.com).

## how i contributed docs to common crawl's java toolchain

[cc-host-index](https://github.com/darraghmahns/cc-host-index) — guides and tooling around common crawl host indexes; upstream pr [cc-pyspark #96](https://github.com/commoncrawl/cc-pyspark/pull/96).

---

### older / school & internships

**Unified patient communications** — next.js admin portal at keck medicine *(Jan 2025 – May 2026)* (azure ad, rbac, cerner integration across five backends).

**HIPAA OCR hackathon** — first place, keck genai hackathon *(Jan 2025 – May 2026)*; langchain + docling pipeline ([backend repo](https://github.com/gleiceschaves/GENAI2-BACKEND/tree/docker)).

**Standby / Posted Software** — stripe payment platform, $100k+ processed ([standbyjobs.com](https://standbyjobs.com)).

**SeaLevel Health** — solana-based medical file sharing prototype ([health.darraghmahns.com](https://health.darraghmahns.com) · [github](https://github.com/darraghmahns/sealevel-app)).