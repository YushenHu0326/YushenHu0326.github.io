---
layout: page
title: Fluid Surface Shader
description: a simple UE4 shader that simulates the fluid surface
img: assets/img/fluidthumbnail.png
importance: 2
category: Miscellaneous
---

This is a nice little shader I had written for UE4 (because unfortunately UE5 does not support displacement). The CPU passes the current wave causing points to the GPU, and let GPU calculate the surface displacement. I am using a simple sine wave as the curve for the displacement, and the final result is surprisingly convincing and cool! Besides clicking the surface to cause waves, a boat is also there for the interaction.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fluid-1.gif" title="fluid-1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Clicking the surface to cause waves.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fluid-2.gif" title="fluid-2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The simulation of the waves causing by the boat is convincing and realistic.
</div>