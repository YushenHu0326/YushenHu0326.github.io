---
layout: page
title: Interactive Terrain Authoring in VR
description: a novel system written in Unity to provide game designer a tool to fast prototype terrain.
img: assets/img/terrainVR-draw-mode.png
importance: 1
category: VR/AR/XR
related_publications: false
---

When using the built-in terrain tools from game engines like Unity and Unreal Engine, it always bothers me that the brushes from those tools feel too cartoonish, many features from terrain in real life, such as erosions, cannot be well presented by those tools. Using custom brushes or real life satellite height image, on the other hand, lack of creative controls. Thus, I have designed this system, mainly to tackle the problems of lacking realism from existing terrain tools, using the power of AI model. To maximize the creative control, I put the system in VR to give the users the ability to create any terrain with the shape they want in 3D without any topological constraints, tackling an existing problem.

The system is developed in Unity using Oculus plugins. From the idea I have proposed, I have been responsible for the fine-tuning of the Generative Adversarial Network model, integrating the model to Unity, designing and engineering the interaction of VR users, and the terrain synthesis. The system, along with the user study we conduct in our lab, is being submitted to a related venue. Many users in the study with a game design or 3D design background found this system useful for fast prototyping and gave positive feedbacks. Sometimes even I use this system in my side project to create terrain!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/terrainVR-teaser.png" title="overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overview of the terrain VR system.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>

You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
