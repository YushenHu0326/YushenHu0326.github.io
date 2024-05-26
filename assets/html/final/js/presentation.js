
rooms.presentation = function() {

description = `<b>presentation</b>
               <p>
	       Ray marching volumetric clouds`;

code = {

'Overview':`
S.html(\`
<b>Topics:</b>
<blockquote>
&bull; Sphere cloud volume
<p>
&bull; Ray marching method
<p>
&bull; Post process
<p>
</blockquote>
\`);
setDescription(description);
`,

'Sphere cloud volume':`
S.html(\`
<p>

My first attempt was simply using noise data. 
The returned value from noise function represent the "amount" of
cloud at the input position.
<p>

This noise-based idea didn't work out well, because it is 
hard to reconstruct the noisy shape of clouds simply by adding and multiplying 
the noise function.

<p>
Then I decided to use Signed Distance Function to simulate the cloud. 
In mathematics and its applications, the signed distance function 
(or oriented distance function) is the orthogonal distance of 
a given point x to the boundary of a set omega in a metric space, 
with the sign determined by whether or not x is in the interior of omega.
<p>
In my case, the clouds can be defined as a set of spheres, and 
the sign can be noise function on the surface point.
<p>
\`);
setDescription(description + '<p><img src=imgs/sdf.svg.png>');
`,

'Ray marching method':`
S.html(\`
<p>
The best way to render SDF is via ray-marching.
<p>
Ray marching is a class of rendering methods for 3D computer graphics 
where rays are traversed iteratively, effectively dividing each ray into 
smaller ray segments, sampling some function at each step. 
This function can encode volumetric data for volume ray casting, 
distance fields for accelerated intersection finding of surfaces, among other information. 
The 1989 paper Hypertexture by Ken Perlin (hey!) contains an early example of a ray marching method.
\`);
setDescription(description + '<p></font><img src=imgs/raymarching.png width=550>');
`,

'Post process':`
S.html(\`
<p>
Floor the noise function to get a stylized feeling.
<p>
Compute the normal by the spheres position and radius.
<p>
Color the clouds using the light color and the distance of clouds scattering lights.
<p>
Volumetric light using ray marching as well.
\`);
setDescription(description + '<p><img src=imgs/AlgorithmVisual.jpeg width=550>');
`,

};

}

