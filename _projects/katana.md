---
layout: page
title: Sekiro-like Katana Combat System
description: an imitation of the popular action game Sekiro: Shadow Die Twice
img: assets/img/katana/thumbnail.png
importance: 2
category: Games
related_publications: false
---

I am not a big fan of Soul-like games, but one of my favorite action games is Sekiro: Shadow Die Twice. This 2019 game, in my opinion, revolutionizes the combat system, it differs itself from traditional action games, in which players usually have to spam attacks or dodges, that it forces players to actually recognize and learn the pattern of the attacks from the enemy AIs and deflect them. Some games coming after it are inspired by this unique combat system, such as Sifu in 2022. As a huge fan of Sekiro, I have been putting a lot of effort trying to replicate and maybe improve its unique combat system.

Similarly to the Shooter Game Template, I have also used the ALS plugin in Unreal Engine. Actually, this attempt was earlier than my shooter game attempt, and it is the first time I have learnt to use the ALS system. Unlike the shooter game in which ALS already has a template for weapon posture, in this template I have implemented a brand new katana holding animation state to the animation Blueprint. I have bought some online animation sources, adjusted the curves and IKs, and integrated them into the animation Blueprint. I have also added a Soul-like camera lock system that forces the player camera to focus on the existing enemy.

Upon the implementation, I have had several attempts of improving the original Sekiro combat system. For example, in the original game, a single parry can deflect the attack regardless of where it comes from, but it comes to my mind that what if the player has to choose a direction to block the attack? However, after some experiments, I feel like it will be too complicated for players to handle, especially in a high-speed combat situation. Still, it's a good practice, and you can see it works on enemy AI.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/katana/parry.gif" title="parry" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The AI blocks the attack coming from the top, but it fails to react to the attacks coming from the bottom. The reaction time can be a good distinction between normal enemies and bosses.
</div>

I have also added different boss AIs for fun. Some bosses, like the old samurais in Sekiro, will have the "居合" posture that attacks unexpectedly. I was also having fun adding some special abilities to different AIs, for example, an enemy AI that is based on the legendary swordsman 沖田総司 will spam three attacks in a single thrust, and players have to deflect three times in a row to block the attack.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/katana/glock.gif" title="glock" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This AI's movement is inspired by the famous samurai　坂本龍馬, who is known for his opening attitude to the western culture. In this set of movements, he will suddenly step back in a middle of the swords fight, pulling up his pistol and fire three shots, then followed by a thrust. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/katana/dual.gif" title="dual" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This AI and the environment is inspired by a famous Japanese lore of a man seeking to collect one thousand katanas in a bridge.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/katana/teleport.gif" title="dual" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    I am extremely satisfied by the overall performance of this ability, this AI will disappear with a lightning and thrust players in the back.
</div>