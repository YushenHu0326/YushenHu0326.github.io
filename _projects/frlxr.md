---
layout: page
title: Future Reality Lab - XR
description: our lab's system for a multi-use colocated system
img:
importance: 3
category: VR/AR/XR
---

Starting from October 2023, our lab has been implemented a colocated XR system that can be used for teaching, content displaying, and social interaction. We were supposed to present this system to SIGGRAPH 2024, however, we got rejected for being "too ambitious", even though we have most of the features implemented. Another criticism is that our features are "too discrete". Still, I think it's a good chance to mention it here.

I didn't do much of the fancy demos, except for one [fluid simulation in XR](https://www.youtube.com/watch?v=yXIGDAwlKMk) here (please ignore the poor quality if you want to check it out, it was just for the purpose of demonstrating this to my lab member at that time). Instead, I am responsible for one of the core concept of this system - the colocation synchronization. Due to the nature of Quest 3, we weren't doing quite well initially when we try to synchronizing ourselves into the same coordinate system, each time when we opened up the content browser, we would have to pair our controllers together for synchronization. To eliminate this step, we had proposed several methods, including an external camera that identify each user. Finally, when we were able to expose the boundary point information from the Quest device, I have proposed an idea for synchronization. The idea is basically setting up a common reference point in the physical environment, record the offsets from each offset to this reference point either to the browser cache or on the server, and after exiting and re-entering the system, it will automatically find the reference point by comparing the offset to the transforms of the existing boundary points, then we can render the world using the new offset from the reference point. Then, as long as we don't clear our browser cache or resest the boundary, we don't have to pair our controllers each time for synchronization. I have also implemented a room system, using the similar techniques of finding the geometrical characteristics of different boundary points, and hashing the corresponding rooms.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/frlxr/sync.png" title="sync" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A visualization of how we synchronize each other.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/frlxr/roomsystem.png" title="ar-vr-1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A visualization of the room system.
</div>

Besides all the works mentioned before, I have also managed to integrate OpenAI's API into our server, so users can generate images based on their speech. This is where I have learnt the basis of node JS.