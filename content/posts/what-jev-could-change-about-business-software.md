+++
draft = false
date = 2026-09-18T12:00:00-07:00
title = "What Jev Could Change About Business Software"
description = "TypeSafe's new model gives up text generation to make decisions faster and cheaper. Here's where that could be useful."
slug = "what-jev-could-change-about-business-software"
authors = ["Darragh Mahns"]
tags = ["ai", "typesafe", "jev", "engineering"]
categories = ["writing"]
images = ["/images/blog/what-jev-could-change-about-business-software.webp"]
+++

![Stippled halftone artwork from TypeSafe AI's site](/images/blog/what-jev-could-change-about-business-software.webp)

An agent watching a shared conversation has to decide whether it should respond. A system collecting product feedback has to work out whether two messages describe the same bug. A tool processing records has to recognize when different descriptions refer to the same thing.

These decisions come up throughout the software we build at [Lattice Partners](https://latticepartners.ai). They are also where I would want to test Jev.

On September 15, TypeSafe released Jev into early access. Founder Diogo Almeida's [announcement on X](https://x.com/diogoalmeida) claimed it was 20 to 200 times faster and 40 to 400 times cheaper than existing models on the tasks it targets.

Those numbers need testing outside the launch benchmarks. But the approach is worth understanding, particularly if you are building software that makes lots of small decisions.

## What kind of model is Jev?

A regular large language model generates a sequence of tokens, the pieces of text that make up its answer. Each new token depends on the input and the tokens already generated. That flexibility lets the same model write an email, produce code, explain a concept, or reason through a problem.

Jev understands natural-language input, but its output is restricted to answers you define in advance. It can choose from a list, score something against a rubric, or estimate the probability that a statement is true. It cannot write a paragraph, generate code, or explain how it reached its answer. TypeSafe describes these capabilities in [its documentation](https://docs.typesafe.ai/).

For example, you could give it a conversation and ask:

- Does this message ask the agent to do something?
- Is the request already resolved?
- Which of these available tools is relevant?

The response contains values your software can use directly. Your code then decides whether to start an agent, request more information, or do nothing.

TypeSafe calls this a "System One" model, borrowing from Daniel Kahneman's description of fast, intuitive thinking. The name describes the kind of work it is intended to do: focused judgments given relevant context. A question requiring a long investigation would need to be broken into smaller steps or passed to another model. TypeSafe's [explanation of System One](https://docs.typesafe.ai/concepts/system-one) covers that distinction.

## How it differs from asking an LLM for JSON

You can already ask a regular LLM to classify a message or return a score. Providers also offer structured outputs that constrain the response to a format your software expects.

Jev changes how those answers are produced. TypeSafe says it developed a new model architecture and a parallel sampler, allowing multiple answers to be produced together rather than generating the response token by token. Independent questions can be evaluated against the same context in one call. Giving up open-ended text generation is part of how the company gets its reported speed and cost savings. The [launch announcement](https://typesafe.ai/blog/introducing-system-one-models-and-jev) explains the approach.

The training objective differs too. TypeSafe calls its method Reinforcement Learning for Calibrated Decisions, or RLCD. It aims to make the model's probabilities reflect actual outcomes. Across a well-calibrated set of predictions assigned an 80% probability, roughly 80% should turn out to be true.

That would be useful for deciding which cases software can handle and which need review. It still needs to hold up on the data you give it.

In an application, I would expect Jev to work alongside a regular LLM. Jev could decide whether a message warrants a response. The LLM could investigate the request, use tools, and write the answer. Jev could then run specific checks on the result.

## Deciding when an agent should respond

Someone in a shared conversation might be asking an agent to do something, updating a colleague, or discussing something that does not involve it.

Respond too often and people start ignoring it. Miss a request and someone has to chase it.

Jev could evaluate the recent conversation before a full agent run starts. Is someone requesting an action? Is the request directed at the agent? Has it already been handled? Another model would still do the work and write the response.

For the [persistent agents](https://latticepartners.ai/articles/persistent-agents) we have written about, this decision may happen far more often than the agent actually needs to act. An agent watching several conversations could make hundreds of checks without finding anything that requires a response.

The announced price is $0.042 per million input tokens, with free outputs. At 2,000 billed input tokens per request, a million requests would cost $84 in model usage. Building and maintaining the application still costs money, but that price gives developers room to check more frequently.

The result I would want is an agent that catches requests promptly and leaves everyone alone the rest of the time.

## Turning feedback into useful tickets

Product feedback arrives in fragments. Someone reports that a button did nothing. Someone else describes the same problem differently. A third person asks for a feature that already exists but was difficult to find.

Before an engineer can address any of it, someone has to work out what each message means and whether it belongs with something already tracked.

Jev could make a first pass: does this describe a bug, a feature request, or a question? Given a shortlist of existing tickets, does one cover the same issue? Is there enough information to investigate?

The system would still need to retrieve relevant tickets. A writing model could draft a new issue, and an engineer could review uncertain matches. Jev would handle the repeated sorting before those steps.

I would judge this by whether it reduces duplicate tickets and saves review time. If it quietly discards valid reports or creates a pile of questionable matches, cheaper model calls have not helped.

## Reviewing records that do not match cleanly

Business software often needs to reconcile records from different sources. Exact identifiers can be matched with ordinary code. Different descriptions of what appears to be the same item take more work.

Given a record and a small set of possible matches, Jev could score the candidates or flag the case as unresolved. The surrounding software would handle the lookup, calculations, and updates.

This is a useful place to begin with suggestions that a person reviews. Their corrections would show which cases the model handles well and which require more context. Over time, there may be a subset that can be automated with an acceptable error rate.

## What the early tests show

[Every published an early test](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) that gives some substance to the speed claims. Mike Taylor reported 777 writing judgments across 37 documents in under 0.7 seconds, costing an estimated quarter of a cent. He cautioned that he had not thoroughly checked their accuracy.

In a separate experiment, Every compared Jev with Fable 5.1 on 12 synthetic passages. Jev took a median of 0.35 seconds per passage, compared with 8.83 seconds for Fable at high effort. Jev caught six of seven intended defects. Fable caught all seven.

That is a small test, and it does not establish how Jev would perform on conversation routing, feedback, or record matching. It does suggest that repeated checks could be inexpensive enough to try.

## A valid answer can still be wrong

TypeSafe's claim that Jev "can't hallucinate" needs qualification. Its answers must fit the options and formats you supply. That prevents it from inventing a category outside your list. It can still choose the wrong category.

The probabilities need testing too. Calibration describes performance across groups of predictions; it does not certify an individual answer.

TypeSafe's published evaluations cover four workflows and use other models' answers as references. They are useful evidence, but they cannot tell you how Jev will perform on your conversations or records.

Before connecting it to a live process, I would run it against past examples with known outcomes, then let it observe new work without taking action. Count the missed cases and unnecessary escalations. Include the time someone spends reviewing them in the cost calculation.

For us, the first test could be as simple as comparing Jev's decision to respond with the decisions our agents already make. We would learn whether it is faster, whether it misses requests, and whether it interrupts conversations unnecessarily. That would tell us far more about its value than the launch numbers alone. We will just have to wait until we get off the waitlist.
