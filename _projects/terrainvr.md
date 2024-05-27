---
layout: page
title: Interactive Terrain Authoring in VR
description: a novel system written in Unity to provide game designer a tool to fast prototype terrain.
img: assets/img/terrain/terrainVR-draw-mode.png
importance: 1
category: VR/AR/XR
related_publications: false
---

When using the built-in terrain tools from game engines like Unity and Unreal Engine, it always bothers me that the brushes from those tools feel too cartoonish, many features from terrain in real life, such as erosions, cannot be well presented by those tools. Using custom brushes or real life satellite height image, on the other hand, lack of creative controls. Thus, I have designed this system, mainly to tackle the problems of lacking realism from existing terrain tools, using the power of AI model. To maximize the creative control, I put the system in VR to give the users the ability to create any terrain with the shape they want in 3D without any topological constraints, tackling an existing problem.

The system is developed in Unity using Oculus plugins. From the idea I have proposed, I have been responsible for the fine-tuning of the Generative Adversarial Network model, integrating the model to Unity, designing and engineering the interaction of VR users, and the terrain synthesis. The system, along with the user study we conduct in our lab, is being submitted to a related venue. Many users in the study with a game design or 3D design background found this system useful for fast prototyping and gave positive feedbacks. Sometimes even I use this system in my side project to create terrain!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrain/terrainVR-teaser.png" title="overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overview of the terrain VR system.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrain/terrainVR-draw-mode.png" title="draw" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrain/terrainVR-edit.png" title="edit" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrain/noise.png" title="smoothness" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Users can draw and edit strokes "like a noodle" (quoted from one of our users in the study), these strokes represent the shape of the terrain. User can also alter the surface smoothness of the terrain to create deep-eroded terrain or lightly-eroded terrain.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrain/demo.gif" title="demo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Drawing the volcano with only one action and within seconds.
</div>

Want to see the actual gameplay? Check out the teaser video we recorded below!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://www.youtube.com/embed/97SlG6hM5SE?si=pNnTNiCUls9gNLeH" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I have also implemented a simple procedural terrain-texturing system, as can be shown in the image. By reading the information of the surface normal and height, the system will assign the corresponded surface texture.