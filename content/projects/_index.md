---
title: "Projects"
date: 2026-01-01
draft: false
---

Some things I've built:

---

## NeoFuse — Kernel-Level GraphRAG for Neo4j _(Graduate Databases Project)_

Custom Neo4j kernel plugin that fuses vector search, graph-aware reranking, and parallel BFS into a single native procedure (`CALL rag.retrieve`). Benchmarked on the ogbn-arxiv citation graph (169K nodes, 1.17M edges, 128-dim embeddings) against a two-Cypher-call baseline and matches or beats the two-call latency in a single round trip while selecting less-redundant graph neighborhoods. Part of a CSCI-543 team project at USC Viterbi.

**Technologies:** Java, Neo4j 5.26.0, Maven, Python, HNSW vector index, Cypher, OGB (Open Graph Benchmark), Bolt driver
**Links:** [GitHub](https://github.com/chuynh00/CS543-Spring-2026-Project2-Neo4j)

---

## Semantic Equivalence Across Prediction Markets _(Graduate NLP Project)_

Cross-platform equivalence detector for Polymarket and Kalshi prediction market listings. Pipeline spans a 117K-market December 2025 snapshot → 473K candidate pairs (TF-IDF + Sentence-BERT hybrid retrieval) → 60K LLM-annotated labels (Qwen 2.5-14B, structured JSON schema) → fine-tuned FLAN-T5 + XGBoost ensemble, F1 = 0.70 on the held-out match class. Part of a CSCI-544 team project at USC Viterbi.

**Technologies:** Python, PyTorch, Hugging Face, vLLM, Qwen 2.5-14B, FLAN-T5, XGBoost, Sentence-BERT, Colab A100
**Links:** [GitHub](https://github.com/darraghmahns/semantic-equivalance) · [Blog post](/posts/semantic-equivalence-prediction-markets/)

---

## Unified Patient Communications Platform

Data-driven healthcare admin portal integrating 5 backend environments with Azure AD authentication and role-based access control. Enables clinic staff to manage patient communications and appointments across multiple systems from a single interface.

**Technologies:** Next.js, TypeScript, React, Azure AD, RBAC, Cerner API
**Impact:** Unified 5 backend systems at Keck Medicine of USC

---

## HIPAA-Compliant OCR Solution _(Hackathon Winner)_

First-place winner at the Keck GenAI Hackathon. Developed a HIPAA-compliant OCR solution using OpenAI's ChatGPT API, Langchain, and Docling to automate manual data entry hospital-wide.

**Technologies:** OpenAI ChatGPT API, Langchain, Docling, Python
**Achievement:** 1st Place — Keck GenAI Hackathon
**Links:** [GitHub](https://github.com/gleiceschaves/GENAI2-BACKEND/tree/docker)

---

## Common Crawl _(Open Source Contribution)_

Open source contributions to the Common Crawl Foundation's web-scale datasets infrastructure. Creating Java and Rust documentation and guides for accessing Common Crawl's distributed systems and columnar data.

**Technologies:** Rust, Java, Distributed Systems, Web Crawling
**Links:** [Pull Request](https://github.com/commoncrawl/cc-pyspark/pull/96)

---

## G3N3RATION AR

Interactive AR magazine experience created with Three.js for immersive web-based augmented reality content and digital storytelling.

**Technologies:** Three.js, React, WebGL, AR.js
**Links:** [Live Demo](https://g3nar.onrender.com) · [GitHub](https://github.com/darraghmahns/G3NAR)

---

## Reroute

AI-powered cycling route optimizer that generates personalized training routes. Full-stack application with Strava integration, GPT-4 powered route generation, and performance analytics.

**Technologies:** React, FastAPI, PostgreSQL, OpenAI GPT-4, Strava API, Mapbox GL
**Links:** [GitHub](https://github.com/darraghmahns/reroute-v3)

---

## SeaLevel Health

Blockchain-based medical file sharing application on Solana. Enables secure, decentralized patient data management with immutable audit trails and granular access control.

**Technologies:** React, Node.js, Python, FastAPI, AWS, Solana
**Links:** [Live Site](https://health.darraghmahns.com) · [GitHub](https://github.com/darraghmahns/sealevel-app)

---

## Standby

Payment platform connecting gig workers with flexible job opportunities. As Tech Lead, developed payment infrastructure processing $100K+ in transactions with Stripe integration.

**Technologies:** React, Node.js, TypeScript, Stripe, PostgreSQL, REST APIs
**Impact:** $100K+ processed
**Links:** [Live Site](https://standbyjobs.com)
