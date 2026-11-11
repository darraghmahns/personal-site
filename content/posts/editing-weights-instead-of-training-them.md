+++
draft = false
date = 2026-11-10T12:00:00-08:00
title = "Editing Weights Instead of Training Them"
description = "A new MIT paper shows a model reading another model's raw weights, finding what's wrong, and editing them directly. Here's what they did and why it matters."
slug = "editing-weights-instead-of-training-them"
authors = ["Darragh Mahns"]
tags = ["ai", "research", "model-weights", "engineering"]
categories = ["writing"]
+++

![An engineer adjusts the Mark I Perceptron, an early hardware neural network, in 1960](/images/blog/editing-weights-instead-of-training-them.webp)

*An engineer adjusts the Mark I Perceptron in 1960. It was one of the first neural networks built as hardware, and its weights were physical dials turned by motors. Photo: National Museum of the U.S. Navy, public domain.*

Beneath every AI model you've used is a giant list of numbers. If you wanted to change how the AI behaves, you essentially had one option: train it again. A new paper shows a model can now read those numbers directly, identify what's wrong, and edit them itself.

According to a paper written by Rikiya Takehi, Jayden Teoh, Alex Zhang and Omar Khattab at MIT CSAIL, their research team gave OpenAI's GPT-6 Astra the raw weights of other neural networks and asked it to read them, fix them, and in a few cases, write them from scratch. No gradient descent, no training loop.

They're calling it Weight-Space Programming, and the [full write-up](https://rikiyat.github.io/blog/weight-space-programming/) is worth the 20 minute read. This post is my spark note attempt to break down what they did, and why I think it matters.

## How models are typically trained

Usually you take a model and feed it a pile of data: examples with the right answers attached. It adjusts itself little by little with each one. The output is the weights, a huge list of numbers. Those numbers are the model and they're the closest thing it has to source code.

And normally the only way to change them is to train again. It's impossible to edit the numbers by hand because of the sheer amount (billions), and they mean nothing on their own.

## What MIT's team did differently

GPT-6 Astra can skip the training loop described above.

The first experiment entailed training four small neural networks to play grid versions of Breakout, Pong, Pac-Man and Freeway, in which every network had the exact same shape (essentially a graph of nodes or neurons). The research team provided Astra with only the weights as text. Astra was able to identify all four games, without being told which it could choose from.

The headline result was done on a real language model. Astra was asked to make Qwen3.5-0.8B better at math, so it figured out the model was getting stuck in reasoning loops (93% of its MATH-500 answers ran into the token limit), traced that to one direction in two of its MLP layers, and subtracted it out. The edit touched 131,072 weights, which is 0.016% of the model. MATH-500 went from 7.9% to 48.1%, GSM8K from 13.8% to 67.1%, and instruction following (IFEval) from 21.0% to 62.3%.

The research team had a Python notebook reviewing the weights with up to 50 forward passes on practice problems to check its work, but without gradients or training.

## Putting it to the test myself

I was fascinated by the experiment, so I conducted my own smaller version of the test. I already had an open-source speech model that essentially filters out background noise on my computer and wanted to see if I could use GPT-6 Astra to pinpoint why it acted in a specific way. So I passed it the weights file.

It came back with an explanation for the behavior I asked about, pointed to the specific weights it thought were responsible, and proposed an update to them. I didn't apply the edit. I only wanted to see whether it could get that far, and it did. The surprising thing to me wasn't the editing, but the fact that we as an industry could have been doing this (to some degree) for ages. It read that model's weights like you'd read a config file!

If you want to try this yourself, Simon Willison has a [great write-up](https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/) of getting Qwen 3.8 27B running locally on his laptop to interpret model weights. It's a much better starting point than my poking around, and it demonstrates that you don't need a frontier model to witness the effect.

## The catch

These results are early and come from one model only, and the authors are upfront about that. But two limits stood out to me.

Fixing Qwen's loops didn't teach Qwen new math. It let the model finish answers it could already work out. When they tried the same thing on Gemma 3 270M, a small model that rarely loops, Astra found ordinary arithmetic and algebra mistakes with no single part of the network to switch off, and its edits only moved MATH-500 by little more than a point. Editing weights could unblock an ability from getting stuck in something like an unnecessary loop, but it couldn't give the model a new ability.

Reading behavior straight off the weights has limits too. In one experiment, the MIT team fine-tuned two copies of the same small model (Gemma 3 270M) in exactly the same way, except one learned to agree with whatever answer the user suggested. Looking only at the weights, Astra found many differences between the two, but couldn't tell which one was the people-pleaser. It only got it right once it could run both models on text it wrote and discover what each one was paying attention to. To me, this signals that obvious, single failures like Qwen's loops are easy to identify in the weights, and subtler behaviors are still not.

## Why this is a big deal

We're moving into an era of model self improvement. Right now "recursive self-improvement" mostly means a model writing code that kicks off a training job. A model that can read and fix its own weights, or the weights of the next model, is a much more efficient and targeted version of that loop.

The more practical win is cost savings. The Qwen fix touched 0.016% of the weights and left the rest of the model alone, which the authors argue avoids the catastrophic "forgetting" that often arises from fine-tuning. If this holds up, a lot of the "collect data, fine-tune, hope nothing else broke" cycle turns into a targeted and direct solution. My guess is AI labs will start training models specifically to get good at self improvement. Astra was used as-is here, with no extra training for the job.

## Closing

For us at [Lattice Partners](https://latticepartners.ai), many of our clients have problems that are too specific for a general model to handle well, so we assume we'll have to build smaller, niche models for them. Today that means collecting data, fine-tuning, and computing every time something needs to change. If an LLM can look at a model's weights, tell us why it's falling short on a client's use case, and patch just that part, custom models start to become more realistic for a team our size. It won't replace training (the Gemma result shows editing can unblock an ability, not add one) but it makes the idea much more plausible.

The authors of the paper released every prompt, response, piece of code and weight diff on [GitHub](https://github.com/RikiyaT/lm_understand-logs), and the edited Qwen model is on [Hugging Face](https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming) if you want to try it yourself. Next, they're building a benchmark and harness for this experiment, something I'll definitely be keeping tabs on.
