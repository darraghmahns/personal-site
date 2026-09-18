+++
draft = false
date = 2026-09-18T12:00:00-07:00
title = "Using AI Without Outsourcing Your Judgment"
description = "Three routines for using AI to code faster without losing the skills and judgment you need to catch its mistakes."
slug = "using-ai-without-outsourcing-your-judgment"
authors = ["Darragh Mahns"]
tags = ["ai", "engineering", "software-development"]
categories = ["writing"]
+++

![Stippled halftone artwork from TypeSafe AI's site](/images/blog/using-ai-without-outsourcing-your-judgment.webp)

It's a challenge to balance the use of AI in engineering while still doing and understanding the work. As a Forward Deployed Engineer at [Lattice Partners](https://latticepartners.ai), I work on numerous company projects and establish engineering standards so we can move faster while maintaining high-quality output as our company grows. Here's what I've learned.

## Combat the Effects of Using AI

Anyone who has used a model to code knows the thrill of being able to output quality software in a tenth of the time it took a couple years ago. However, with that thrill comes the responsibility to check and maintain your new black box, model-built software, which is hard to do when you didn't write or see every single line of code… unless you have your model diagnosing any bugs or issues. AI lets us move faster, but it also abstracts away much of the technical work. Over time, we become more reliant on our model for any future work. This is the vicious cycle that has evolved as AI gets better and better. Being too reliant on AI makes me nervous as I ship more products. Because I like to take responsibility for my work and confirm things won't break, I am always thinking about how I can keep my development skills sharp.

I have three main routines I follow in order to minimize any potential long-term impacts AI has on my development skills:

The first is: **always using plan mode**; I'd say pretty much all model providers or 3rd party harnesses at this point have a plan mode and it is probably the easiest way you can increase the quality of your code. Don't just accept the first plan that the model prompts you with either, read it through and push back. I like to use multiple models to review and enhance my plans and diffs, which I talk about later in this post. Models read code similar to us using a sliding window (e.g. 100 lines of code at a time), so the context they use to build a plan or make edits won't be perfect. The achievement of 1 million token contexts makes a difference, but it still runs out, and you still have to manage what is being sent with each message you type.

Second, **I always run through multiple review loops** after the plan is executed. This is a quick way to identify any potential bugs or styling issues. I use different model providers and subagents to do this as a way to get different "perspectives" and keep iterating quickly in the same context. This creates more confidence that what you are outputting isn't going to break once it reaches the clients' hands.

The third is just **ask questions**! Always ask the model what it did, why it did that, have it walk through the code with you, and see if it can be done in a simpler way than it was done. You'll probably catch some bugs by doing this, and it will build awareness of what you are shipping.

## Diversify Your Sources

The recent [Claude Fable 5 disruption](https://www.anthropic.com/news/redeploying-fable-5) was a useful reminder that even frontier models can become unavailable with little notice. The disruption was a useful example of where AI regulation and oversight stand: fragmented, fast-changing, and still catching up to the pace of model deployment. Who knows what will happen to the model provider you have folded into every aspect of your work? Because of that, I try to use at least two different providers in each of my projects as a safety net.

This can actually benefit you because different models have different strengths you can play to. In my recent coding workflows, Anthropic's frontier models have often felt stronger for complex implementation and review, while OpenAI's models can be more cost-efficient with little quality loss for many tasks. The tradeoff changes quickly, so it's worth testing against your own workload. There are plenty of articles comparing the different models out there, and the landscape is changing every single day, so I'm not going to speak much to that. I recommend doing your homework about what each model is best at and using it for that purpose in tandem with other models. This also requires more reading of API docs, newsletters, or social media. I prefer newsletters in my inbox each morning. Long story short, if you are letting AI build your code, use that time to read about the best AI for your use case. Don't let yourself sit idle while your software is building itself — reinvest that time!

## Our Tooling Ecosystem

The tools we all use are changing frequently too as we navigate this insane transitionary period. From what I have experienced, the tooling ecosystem is clearly moving toward more automated coding workflows, parallel agents, and review-oriented orchestration. There are several existing platforms/harnesses that let you manage subagents. Claude and Codex also have their own workflows for this, but what will work for you depends on your use case. Lattice is a consulting company, and we have many projects that we have to switch back and forth between. I like to keep a terminal window running a coding agent open for each project, so I can quickly switch if needed. Through talking to friends at other companies who work on one project at a time, it makes sense to lean more heavily into agent orchestration and tools like Conductor and Solo to build features and manage PRs, code reviews, and multiple providers in one place.

If you use AI for your development practices, these are some of the rituals I use day to day. [Reach out](mailto:darraghmahns@gmail.com) if you want to chat about engineering workflows.
