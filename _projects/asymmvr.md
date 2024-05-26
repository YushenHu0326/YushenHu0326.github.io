---
layout: page
title: Asymmetric VR for Education
description: a framework for the communication of VR users and non-VR users, presented in SIGGRAPH 2023 Immersive Pavilion.
img: assets/img/asymvr/asymvr.png
importance: 2
category: VR/AR/XR
related_publications: false
---

This framework was proposed when Prof. Ken Perlin was having difficulties in communicating with his students in VR class. When students put on their Quest 2 with no video passthrough, they cannot see their teacher's face, and neither can their teacher see what they are seeing. To bridge the gap, we proposed this framework, using various methods like video streaming, perspective switching, and AR to enhance the communication between non-VR teachers and VR students.

We use Unity as our platform. For the network solution, we use the Corelink developed by NYU's High Performance Computing team. I am responsible for implementing most of the features in our system, including video streaming and AR synchronization and perspective switching. 

Besides that, I have also designed the demonstration system, inspired by music games, I have made a set of candy-like music notes that will make sound once hitted by VR users. AR users, who are presumably music teachers and have the knowledge of how to play music on these notes, can highlight the notes to guide the students in VR world to play a full piece of music, so when a pair of visitors step in our booth, they can collaborate and play music together (if there is only one visitor, then we as the coordinator will play the role of AR instructor). I have implemented the music playing mechanics, as well as some bonus features, like a score system to record the accuracy on music keys and tempo, as well as a back tracking system so users can jam along with some pre-arranged music.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/asymvr/asymvr.png" title="ar-vr-1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The AR instructor seeing me playing music on his iPad.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/asymvr/asymvr-ar.png" title="ar-vr-2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The AR instructor guiding me in VR world to find the correct note to play.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/asymvr/asymvr-ins.png" title="hud" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The instrument HUD on AR device.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/asymvr/asymvr-mp.png" title="mp" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The multiplayer system.
</div>

Want to see the actual gameplay? Check out the teaser video we recorded below!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://www.youtube.com/embed/ZlEIHPUZtRc?si=2S5ug2cBA96x5QXN" class="img-fluid rounded z-depth-1" %}
    </div>
</div>