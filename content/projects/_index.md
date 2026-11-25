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

Selected things I've built or led. Headings are the story; details stay close to what is in the repo.

## How I built document extraction with Python and FastAPI

[DES-Demo](https://github.com/darraghmahns/DES-Demo) pulls structured fields out of PDF uploads: `extractor.py` and `processor.py` run the pipeline, `pii_scanner.py` and `verifier.py` sanity-check output before it hits the API. Live demo at [des.darraghmahns.com](https://des.darraghmahns.com).

## How I built an HTTP/1.1 server with raw Python sockets

[`http`](https://github.com/darraghmahns/http) is a from-scratch origin server (RFC 9112 messaging): persistent connections, chunked bodies, range requests, gzip, and virtual hosts in `server.py`, serving static files from `www/` on port 8080.

## How I matched prediction markets with Qwen labels and XGBoost

[semantic-equivalence](https://github.com/darraghmahns/semantic-equivalence) scores whether Kalshi and Polymarket listings describe the same event: TF-IDF + Sentence-BERT retrieval, 60k Qwen 2.5-14B labels under JSON schema, then FLAN-T5 + XGBoost (F1 0.70 on the held-out match class). Team project for USC CSCI-544; [write-up](/posts/semantic-equivalence-prediction-markets/).

## How I fused graph RAG into one Neo4j procedure call

NeoFuse (CSCI-543 team project) registers a kernel plugin that runs ANN search, graph-aware reranking, and parallel BFS in one `call rag.retrieve` against Neo4j 5.26. Benchmarked on ogbn-arxiv (169k nodes). [Blog post](/posts/graphrag-one-round-trip/) · teammate repo [on GitHub](https://github.com/chuynh00/CS543-Spring-2026-Project2-Neo4j).

## How I built a cycling coach with GPT-4 and Strava

[reroute-v3](https://github.com/darraghmahns/reroute-v3): React + FastAPI app with Strava OAuth, Mapbox, and GPT-4 generated training routes.

## How I shipped AR magazine pages with Three.js

[G3NAR](https://github.com/darraghmahns/G3NAR): Web AR for G3N3RATION magazine. [Live demo](https://g3nar.onrender.com).

## How I contributed docs to Common Crawl's Java toolchain

[cc-host-index](https://github.com/darraghmahns/cc-host-index): guides and tooling around Common Crawl host indexes; upstream PR [cc-pyspark #96](https://github.com/commoncrawl/cc-pyspark/pull/96).

---

### Older work: school and internships

**Unified patient communications:** Next.js admin portal at Keck Medicine *(Jan 2025 to May 2026)* (Azure AD, RBAC, Cerner integration across five backends).

**HIPAA OCR hackathon:** first place, Keck GenAI hackathon *(Jan 2025 to May 2026)*; LangChain + Docling pipeline ([backend repo](https://github.com/gleiceschaves/GENAI2-BACKEND/tree/docker)).

**Standby / Posted Software:** Stripe payment platform, $100k+ processed ([standbyjobs.com](https://standbyjobs.com)).

**SeaLevel Health:** Solana-based medical file sharing prototype ([health.darraghmahns.com](https://health.darraghmahns.com) · [GitHub](https://github.com/darraghmahns/sealevel-app)).