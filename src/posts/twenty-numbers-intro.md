---
title: 'Twenty Numbers: The Game'
date: 2025-05-30
description:
  A rabbit-hole of an analysis into the win percentage of a simple game, from a friend from a Reddit post from a TikTok video. 
  What started as a simple statistical problem snowballed into a fascinating delve into algorithms, combinatorics, and areas of math I had previously avoided.
  (This is the first of two posts on this game, where I just describe the problem.)
tags:
- math
- cs
---

<script setup lang="ts">
import TwentyNumbersGame from "../components/twentynumbers/TwentyNumbersGame.vue";
</script>

# The Twenty Numbers Game, Part 1

Just the other day, a friend mentioned a simple but interesting problem.
(I initially wasn't given the Reddit post[^reddit_post], as that would be cheating.
I wanted to see where this would lead me, and not replicate the analyses of others.)

[^reddit_post]: The referenced Reddit post asked the simple question of how likely it was for the TikToker to win the game.

At the beginning of the game, you're given 20 empty slots.
One by one, a random number $x \in [1, 1000]$ is uniformly generated
(assuming without replacement, since that makes more sense for a game),
and you must place the given number in one of your 20 slots.
The catch is that the numbers in your slots must be in increasing order!

Here's a version of the game to play around with:

<TwentyNumbersGame></TwentyNumbersGame>

The beginning of the game is generally easy,
but it gets hard to complete the game as it gets more likely that a number that falls between two adjacent slotted numbers is generated.

So the first basic question:

> How often, on average, can you win the game (fill all 20 slots)?
>
> (For the Bayesian, how likely are you to win the game?)


## Parameterization

I'm going to try and keep my notation consistent.

- You are given $m$ slots to fill from a pool of $n$ numbers where $r$ numbers are generated.
  In the version of the game described above, $m = r = 20$ (you generate as many numbers as you have slots) and $n = 1000$.
- $Pr(\cdot)$ refers to the probability of some event,
  but $P(\cdot)$ will refer to specifically the probability of winning the game.

## Unknowns

There are a few interesting questions that we could ask, beyond the prime question above:

1. What are the odds that you win the game, assuming you can play the perfect strategy?
2. What *is* the perfect strategy? Could a human reasonably use it without the use of a computer?
3. Does the strategy that leads to the most wins also tend to get the farthest in the game? 
