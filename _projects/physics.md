---
layout: page
title: Simple Physics Engine
description: a simple hand-crafted physics engine written in javascript for FRL's XR interface
img:
importance: 3
category: Miscellaneous
---

Motivated by self-interest, I have written the basic structure of a simple physics engine for our lab's webXR platform. The physics engine is still unfinished, and I have only written the basic structure, the sphere to sphere collision and sphere to blocks collision. But writing a physics library from scratch is not an easy task. At first I thought a sphere to sphere collision level of algorithm would be easy, but sometimes it can be tricky when dealing with velocity change and multi-bodies collision. Javascript isn't an OOP language and I have to use an array of a fixed-size to store physical variables, and for the spheres, I sort them by height to deal with multi-bodies collision reaction.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/physics.gif" title="physics" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The box collision was added later by one of my talented collegues.
</div>