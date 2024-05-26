---
layout: page
title: Shooter Template
description: a framework for TPS/FPS game based on ALS plugin of Unreal Engine.
img: assets/img/shooter/thumbnail.png
importance: 1
category: Games
related_publications: false
---

Growing up playing classic shooter games like Max Payne series, I always want to make my own shooter games. Having previously try several classic ways of TPS mechanics in Unity and Unreal, I have made this template as an experiment. In this template, I have integrated the realism of ArmA series while keeping the interactions as simple as possible.

This template is made based on Advanced Locomotion System (ALS), a popular plugin of UE4. Because I was more comfortable coding in C++ back then, I have used the C++ version of it made by some community members. The original ALS has the animation state of the character holding rifle/pistol, but there is no shooter game mechanics in it. Based on the animation Blueprint, I have added several things: left hand Ik for weapon holding and reloading, and the aiming state in FPS mode. Of course, I have added a self-written weapon component that handles the weapon interaction for the character, as well as a simple health component and inventory component that are complementary with the weapon component.

As I have mentioned, I integrated some realistic behaviors from real life weapon interactions to the traditional shooter game mechanics. For example, the magazine is treated as an object instead of an integer indicating the remaining ammo, after reloading players will have to interact with the handle to finish loading, a cool interaction of checking if the weapon is loaded inspired by John Wick movie series is added, etc.. To simplify the interaction, I have added a floating menu that can be selected to handle different interactions.

Also, I have added an AI system. It's not very intricate, for the attackers, there are only several states including patrolling, searching and attacking, but I have done a lot of debugs to get it perform like a normal enemy would do.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/shooter/flashlight.gif" title="interaction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Player can call the menu to interact with weapons. These interactions include change fire mode, turn on/off flashlight, etc..
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/shooter/checkload.gif" title="interaction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Player can check if theie weapons are loaded by pulling up the handle.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/shooter/ai.gif" title="interaction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Two teams of AI engaging.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/shooter/ai_2.gif" title="interaction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An enemy AI is searching player based on the last known position.
</div>