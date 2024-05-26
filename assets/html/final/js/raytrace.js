
rooms.raytrace = function() {

lib3D();

description = `
<small>
    <p>
    <b>Atmospheric parameters</b>
    <br> <input type="range" id="tod" value="20",min="1",max="100"> Time of Day
    <br> <input type="range" id="fi"  value="10",min="1",max="100"> Fog Intensity
    <br> <input type="range" id="ci"  value="10",min="1",max="100"> Cloud Intensity
    <br> <input type="checkbox" id="cbx_0" onclick="onVolumetricClicked()"> Volumetric Light
    <br> <input type="checkbox" id="cbx_1"   onclick="onVisualizeClicked()"> Visualize Sphere
</small>
`;

code = {
'init':`
































   // DEFINE INTERACTIVE

   S.visualizeSphere = false;
   S.vl = false;
   S.pitch = 0.;
   S.yaw = 0.;
   S.mouseX = 0.;
   S.mouseY = 0.;
   S.cPos = [0., 2.5, 10.];
   S.cDir = [0., 0. ,  0.];

   // DEFINE NUMBER OF LIGHTS

   S.nL = 1;

   // DEFINE MATERIALS TO BE RENDERED VIA PHONG REFLECTANCE MODEL

   let materials = [
      [.15,.05,.025,0, .3,.1,.05,0, .6,.2,.1,3, 0,0,0,0], // COPPER
      [.25,.15,.025,0, .5,.3,.05,0, 1,.6,.1,6,  0,0,0,0], // GOLD
      [.25,0,0,0,      .5,0,0,0,    2,2,2,20,   0,0,0,0], // PLASTIC
      [.05,.05,.05,0,  .1,.1,.1,0,  1,1,1,5,    0,0,0,0], // LEAD
      [.1,.1,.1,0,     .1,.1,.1,0,  1,1,1,5,    0,0,0,0], // SILVER
   ];

   S.nS = 100;
   S.sPos = [];
   S.sRadius = [];
   for (let n = 0 ; n < S.nS ; n++) {
      S.sPos.push([ .03 * S.nS * (Math.random() - .5),
                    2.,
                    .03 * S.nS * (Math.random() - .5) ]);
      S.sRadius.push([.5 + .5 * Math.random(), Math.random(), 1.]);
   }
`,
fragment: `
S.setFragmentShader(\`

   // DECLARE CONSTANTS, UNIFORMS, VARYING VARIABLES
   
   const int nS = \` + S.nS + \`;
   const int nL = \` + S.nL + \`;

   uniform vec3 uCamPos;
   uniform vec3 uCamDir;
   uniform float uTime;
   uniform float uTOD;
   uniform vec3 uBgColor;
   uniform vec3 uLd[nL];
   uniform vec3 uLc[nL];

   uniform float uLi;
   uniform float uFi;

   varying vec3 vPos;

   uniform vec4 uS[nS];
   uniform float uV;
   uniform float uVL;

   // DEFINE CAMERA FOCAL LENGTH

   float fl = 3.;

   // COMPUTE REFRACTION RAY

   vec3 computeRefraction(vec3 W1, vec3 N, float rFactor) {
      vec3 C1 = N * dot(W1, N);
      vec3 S1 = W1 - C1;
      float theta1 = length(S1);
      float theta2 = asin(theta1 * rFactor);
      vec3 C2 = C1 * cos(theta2) / cos(theta1);
      vec3 S2 = S1 * sin(theta2) / sin(theta1);
      return C2 + S2;
   }

   // COMPUTE EXPONENTIAL FOG

   vec3 expFog(vec3 inColor, vec3 fogColor, float t, float fogIntensity) {
      t = max(1., t);
      float a = pow(1. - fogIntensity, log(t));
      return mix(fogColor * uLi, inColor, a);
   }

   // FOLLOWING RENDER ATMOSPHERIC PHENOMENAL

   // PSEUDO SUN RAY TRACING

   float raySun(vec3 V, vec3 W) {
      vec3 sunPos = uLd[0] * 990.;
      V -= sunPos.xyz;
      V += .01 * W;
      float b = dot(V, W);
      float d = b * b - dot(V, V) + 100.;
      return d < 0. ? -1. : -b - sqrt(d);
   }

   // RETURN THE COLOR OF THE LIGHT

   vec3 shadeSun(vec3 V, vec3 W, float t) {
      return uLc[0] * 1.5;
   }

   // RAY MARCHING VOLUMETRIC LIGHT

   float rayRoughSphere(vec3 V, vec3 W, vec4 S) {
      V -= S.xyz;
      V += .01 * W;
      float b = dot(V, W);
      float r = S.w / 2.;
      float d = b * b - dot(V, V) + r * r;
      return d < 0. ? -1. : -b - sqrt(d);
   }

   vec3 marchVolumetricLight(vec3 V, vec3 W, float t, vec3 inColor) {
      float d = t / 50.;
      if (d > .5) d = .5;
      float step = 0.;
      vec3 P = V;
      bool detect = false;

      for (int i = 0; i < 50; i++) {
         if (!detect && step < t) {
            step += d;
            P += W * d;
            float r = 10.;

            for (int j = 0; j < nS; j++) {
               if (!detect) {
                  float rt = rayRoughSphere(P, uLd[0], uS[j]);
                  if (rt > 0. && rt < r) {
                     r = rt;
                     detect = true;
                  }
               }
            }
         }
      }

      if (detect) return inColor / 1.1;
      return inColor;
   }

   // COMPUTE AND SHADE THE NOISE-BASED CLOUDS USING RAY-MARCHING

   float getNoiseRadius(vec3 P, float r) {
      float n = .5 + .5 * abs(noise(P * 1. - uTime * .02));
      n *= (.5 + .5 * abs(noise(P * 10. + uTime * .04)));

      n *= 8.;
      n = floor(n);
      n /= 8.;

      return r * n;
   }

   float rayNoiseSphere(vec3 V, vec3 W, vec4 S) {
      vec3 oV = V;
      V -= S.xyz;
      V += .01 * W;
      float b = dot(V, W);
      float r = S.w;
      float d = b * b - dot(V, V) + r * r;

      if (d < 0.) return -1.;

      float t = -b - sqrt(d);

      if (uV > 0.) return t;
      float step = 0.;
      float cnt = 0.;

      for (int i = 0; i < 4; i++) {
         step = distance(oV + t * W, S.xyz) - getNoiseRadius(oV + t * W, S.w);
         t += step;

         if (step > 0.) cnt += 1.;
      }

      if (distance(oV + t * W, S.xyz) > S.w / 1.2 && cnt > 3.) return -1.;
      return t;
   }

   vec4 shadeCloud(vec3 V, vec3 W, vec3 inColor) {
      float t = 1000.;

      vec3 P;
      vec3 N = vec3(0.);
      float s = 0.;
      float radius = 0.;
      for (int i = 0; i < nS; i++) {
         float tS = rayNoiseSphere(V, W, uS[i]);
         if (tS > 0. && tS < t) {
            P = V + tS * W;
            t = tS;
            radius = uS[i].w;
         }
      }

      for (int i = 0; i < nS; i++) {
         N += (P - uS[i].xyz) * (1. / distance(P, uS[i].xyz)) * uS[i].w;
         float ms = rayRoughSphere(P, uLd[0], uS[i]);
         if (ms > 0.) s += ms;
      }

      N = normalize(N);

      vec3 c = vec3(min(.5, 1. / s));
      c += max(0.,dot(N, uLd[0])) * uLc[0];

      if (t < 1000.)
         return vec4(c, t);

      return vec4(-1.);
   }

   // COMPUTE SURFACE HEIGHT USING NOISE

   float computeSurfaceHeight(vec3 surfacePoint) {
      float n = noise(surfacePoint * 8. + vec3(uTime, uTime, 0.));
      n += noise(surfacePoint * 16. + vec3(uTime, -uTime, 0.));

      return n / 100.;
   }

   // COMPUTE NORMAL USING HEIGHTMAP DATA

   vec3 computeSurfaceNormal(vec3 surfacePoint) {
      vec3 s1 = vec3(surfacePoint.x - .001, surfacePoint.y, surfacePoint.z);
      vec3 s2 = vec3(surfacePoint.x + .001, surfacePoint.y, surfacePoint.z);
      vec3 s3 = vec3(surfacePoint.x, surfacePoint.y, surfacePoint.z - .001);
      vec3 s4 = vec3(surfacePoint.x, surfacePoint.y, surfacePoint.z + .001);

      vec3 h1 = vec3(surfacePoint.x - .001,
                     computeSurfaceHeight(s1),
                     surfacePoint.z);
      vec3 h2 = vec3(surfacePoint.x + .001,
                     computeSurfaceHeight(s2),
                     surfacePoint.z);
      vec3 h3 = vec3(surfacePoint.x,
                     computeSurfaceHeight(s3),
                     surfacePoint.z - .001);
      vec3 h4 = vec3(surfacePoint.x,
                     computeSurfaceHeight(s4),
                     surfacePoint.z + .001);

      vec3 l1 = h1 - h2;
      vec3 l2 = h3 - h4;

      // FIND THE CROSS PRODUCT OF L1 AND L2

      vec3 n = vec3(l1.y * l2.z - l1.z * l2.y, 
                    l1.z * l2.x - l1.x * l2.z,
                    l1.x * l2.y - l1.y * l2.x);

      if (n.y < 0.) n = -n;

      return normalize(n);
   }

   // TRACE AND SHADE THE SEA FLOOR

   float rayFloor(vec3 V, vec3 W, float t) {
      if (V.y + t * W.y < -1.) return (-1. - V.y) / W.y;
      else return -1.;
   }

   // COMPUTE CAUSTICS USING SEA SURFACE NOISE

   vec3 shadeFloor(vec3 P) {
      float caustics = abs(noise((P + uLd[0]) * 3. - vec3(uTime * .5)));
      caustics += abs(noise((P + uLd[0]) * 5. + vec3(uTime * .5)));
      caustics = 1. - caustics;
      caustics = pow(caustics, 4.);
      caustics *= uLi;
      return vec3(.5 + caustics);
   }

   // TRACE A PLANE SURFACE BY HEIGHT

   float raySurface(vec3 V, vec3 W, float t) {
      if (V.y + t * W.y < computeSurfaceHeight(V + t * W)) return -V.y / W.y;
      else return -1.;
   }

   // TRACE A PLANE SURFACE BY HEIGHT UNDERWATER

   float raySurfaceUnder(vec3 V, vec3 W, float t) {
      if (V.y + t * W.y > computeSurfaceHeight(V + t * W)) return -V.y / W.y;
      else return -1.;
   }

   // SHADE AN OCEAN SURFACE

   vec3 shadeSurface(vec3 W, vec3 P, float t) {
      vec3 c = expFog(uBgColor * .5, uLc[0] * .2, 100., uFi);
      vec3 N = computeSurfaceNormal(P);

      vec3 diffuse = vec3(.1);
      vec3 specular = vec3(1.);

      for (int l = 0 ; l < nL ; l++) {
         vec3 R = 2. * dot(N, uLd[l]) * N - uLd[l];
         c += uLc[l] * (diffuse * max(0.,dot(N, uLd[l])) * uLi
                      + specular * pow(max(0., dot(R, W)), 20.)) * uLi;
      }

      // WATER REFRACTION

      vec3 rfc = vec3(0.);
      float rftMin = 10.;

      if (t < 10.) {
         vec3 rDir = computeRefraction(W, N, .5);
      }

      if (rftMin < 10.) c = mix(rfc, c, 1. - rftMin / 10.);

      // WATER REFLECTION

      vec3 R = 2. * dot(N, -W) * N + W;
      float rtMin = 10000.;
      vec3 rc = vec3(0.);

      float rS = raySun(P, R);
      if (rS > 0. && rS < rtMin) {
         rtMin = rS;
         rc = shadeSun(P, R, rtMin) * uLc[0];
      }

      vec4 rCl = shadeCloud(P, R, c);
      if (rCl.a > 0. && rCl.a < rtMin) {
         rtMin = rCl.w;
         rc = rCl.rgb;
      }
      
      if (rtMin < 10000.) c = mix(c, rc, .5);

      c *= uLi;

      return c;
   }

   // SHADE AN OCEAN SURFACE UNDERWATER

   vec3 shadeSurfaceUnder(vec3 W, vec3 P, float t) {
      vec3 c = expFog(uBgColor * .5, uLc[0] * .2, 100., uFi);
      vec3 N = -computeSurfaceNormal(P);

      vec3 diffuse = vec3(.1);
      vec3 specular = vec3(.2);

      for (int l = 0 ; l < nL ; l++) {
         vec3 R = 2. * dot(N, uLd[l]) * N - uLd[l];
         c += uLc[l] * (diffuse * max(0.,dot(N, uLd[l])) * uLi
                      + specular * pow(max(0., dot(R, W)), 20.)) * uLi;
      }

      // WATER REFRACTION

      vec3 rfc = vec3(0.);
      float rftMin = 10.;

      if (t < 10.) {
         vec3 rDir = computeRefraction(W, N, .5);
      }

      if (rftMin < 10.) c = mix(rfc, c, 1. - rftMin / 10.);

      c *= uLi;

      return c;
   }

   // GENERATE TERRAIN HEIGHT USING NOISE

   float getTerrainHeight(float x, float z) {
      vec3 P = vec3(x, 0., z);

      float h = noise(P * .02);
      h += noise(P * .01);

      return h;
   }

   // TRACE A NOISE-GENERATED TERRAIN USING RAY-MARCHING

   float rayTerrain(vec3 V, vec3 W) {
      float t = -V.z / W.z;

      if (t > 1000. || t < 0.) return -1.;

      vec3 s = V + t * W;

      float x1 = mod(s.x, 1.);
      float z1 = mod(s.z, 1.);

      float x2 = x1 + 1.;
      float z2 = z1 + 1.;

      for (int i = 0; i < 1000; i++) {
         if (t > 0.) {
            s = V + t * W;

            x1 = mod(s.x, 1.);
            z1 = mod(s.z, 1.);

            x2 = x1 + 1.;
            z2 = z1 + 1.;

            t -= 1.;

            float minHeight = min(min(getTerrainHeight(x1, z1),
                                      getTerrainHeight(x1, z2)),
                                  min(getTerrainHeight(x2, z1),
                                      getTerrainHeight(x2, z2)));
            if (minHeight < getTerrainHeight(s.x, s.z)) {
               return t;
            }
         }
      }

      return -1.;
   }

   void main() {

      vec3 color;
      vec3 V = uCamPos + vec3(0., 0., fl);
      vec3 W = normalize(vec3(vPos.xy, -fl));

      // BACKGROUND COLOR IS THE DEFAULT COLOR

      color = uBgColor * uLi;

      // DEFINE RAY INTO SCENE FOR THIS PIXEL

      float tMin = 1000.;

      float tSun = raySun(V, W);
      if (tSun > 0. && tSun < tMin) {
         color += shadeSun(V, W, tSun);
         tMin = tSun;
      }

      // RAY TRACE SEA SURFACE

      float tS = raySurface(V, W, tMin);

      if (tS > 0. && tS < tMin) {
         tMin = tS;
         color = shadeSurface(W, V + tS * W, tMin);
      }

      // RAY MARCH AND SHADE THE CLOUDS

      vec4 tC = shadeCloud(V, W, color);
      if (tC.a > 0. && tC.a < tMin) {
         color = tC.rgb;
         tMin = tC.a;
      }
      else if (uVL > 0.) {
         color = marchVolumetricLight(V, W, tMin, color);
      }
         
      // ADD FOG LAYER

      color = expFog(color, uLc[0], tMin, uFi);

      // SET PIXEL COLOR

      gl_FragColor = vec4(sqrt(color), 1.);
   }
\`);
`,
vertex: `
S.setVertexShader(\`

   attribute vec3 aPos;
   varying   vec3 vPos;

   void main() {
      vPos = aPos;
      gl_Position = vec4(aPos, 1.);
   }

\`)
`,
render: `

   // HANDY DANDY VECTOR LIBRARY

   let add = (a,b) => [ a[0]+b[0], a[1]+b[1], a[2]+b[2] ];
   let dot = (a,b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
   let norm = v => Math.sqrt(dot(v,v));
   let normalize = v => {
      let s = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return [ v[0]/s, v[1]/s, v[2]/s ];
   }
   let scale = (v,s) => [ s * v[0], s * v[1], s * v[2] ];
   let subtract = (a,b) => [ a[0]-b[0], a[1]-b[1], a[2]-b[2] ];

   // MATRIX LIBRARY

   let matrixIdentity = () => [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

   let matrixInverse = function(src) {
   let dst = [], det = 0, cofactor = (c, r) => {
      let s = (i, j) => src[c+i & 3 | (r+j & 3) << 2];
      return (c+r & 1 ? -1 : 1) * ( (s(1,1) * (s(2,2) * s(3,3) - s(3,2) * s(2,3)))
                                 - (s(2,1) * (s(1,2) * s(3,3) - s(3,2) * s(1,3)))
                                 + (s(3,1) * (s(1,2) * s(2,3) - s(2,2) * s(1,3))) );
      }
      for (let n = 0 ; n < 16 ; n++) dst.push(cofactor(n >> 2, n & 3));
      for (let n = 0 ; n <  4 ; n++) det += src[n] * dst[n << 2];
      for (let n = 0 ; n < 16 ; n++) dst[n] /= det;
      return dst;
   }

   let matrixMultiply = function(a, b) {
      let dst = [];
      for (let n = 0 ; n < 16 ; n++)
         dst.push( a[n&3     ] * b[n&12    ] +
                  a[n&3 |  4] * b[n&12 | 1] +
                  a[n&3 |  8] * b[n&12 | 2] +
                  a[n&3 | 12] * b[n&12 | 3] );
      return dst;
   }

   let matrixRotx = t => {
      let c = Math.cos(t), s = Math.sin(t);
      return [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1];
   }

   let matrixRoty = t => {
      let c = Math.cos(t), s = Math.sin(t);
      return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1];
   }

   let matrixRotz = t => {
      let c = Math.cos(t), s = Math.sin(t);
      return [c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1];
   }

   let matrixScale = (x,y,z) => [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1];

   let matrixTranslate = (x,y,z) => [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1];

   let matrixTranspose = function(m) {
      return [ m[0],m[4],m[ 8],m[12],
               m[1],m[5],m[ 9],m[13],
               m[2],m[6],m[10],m[14],
               m[3],m[7],m[11],m[15] ];
   }

   let mTranslate = (x,y,z, M) => matrixMultiply(M, matrixTranslate(x,y,z));
   let mRotx      = (theta, M) => matrixMultiply(M, matrixRotx(theta));
   let mRoty      = (theta, M) => matrixMultiply(M, matrixRoty(theta));
   let mRotz      = (theta, M) => matrixMultiply(M, matrixRotz(theta));
   let mScale     = (x,y,z, M) => matrixMultiply(M, matrixScale(x,y,z));

   // SEND CAMERA INFO TO GPU

   S.setUniform('3fv', 'uCamPos', S.cPos);

   S.cDir = [Math.sin(S.yaw), Math.sin(S.pitch), Math.cos(S.yaw)];

   S.setUniform('3fv', 'uCamDir', S.cDir);

   // GET ATMOSPHERIC DATA

   let timeOfDay = tod.value;
   let ldZ = 1. - timeOfDay / 50.;
   let ldY = Math.sin((timeOfDay / 100.) * Math.PI);

   let lcG = .5 + .5 * Math.sin((timeOfDay / 100.) * Math.PI);
   let lcB = Math.sin((timeOfDay / 100.) * Math.PI);

   // SEND LIGHT SOURCE DATA TO GPU

   let ldData = [ normalize([.2,ldY,ldZ]) ];
   let lIntensity = 1. + .5 * Math.sin((timeOfDay / 100.) * Math.PI);

   let lcData = [1,lcG,lcB];

   S.setUniform('3fv', 'uLd', ldData.flat());
   S.setUniform('3fv', 'uLc', lcData);
   S.setUniform('1f', 'uLi', lIntensity);

   // CHANGE SPHERE POSITION RADIUS

   S.nS = Math.floor(ci.value);
   if (S.nS == 0) S.nS = 1;

   for (let n = 0; n < S.nS; n++) {
      S.sRadius[n][2] = (1. + .1 * Math.sin(time * S.sRadius[n][1]) * S.sRadius[n][0])
                         * Math.min(1., ci.value / 10.);
   }

   // SEND SPHERES DATA TO GPU

   let sData = [];
   for (let n = 0; n < S.nS; n++)
      sData.push(S.sPos[n], S.sRadius[n][2]);
   S.setUniform('4fv', 'uS', sData.flat());

   // SEND FOG DATA TO GPU

   let fogIntensity = fi.value / 100.;

   S.setUniform('1f', 'uFi', fogIntensity);

   // SET VISUALIZE DATA TO GPU

   let visualize = 0.;
   if (S.visualizeSphere) visualize = 1.;

   S.setUniform('1f', 'uV', visualize);

   // SET VISUALIZE DATA TO GPU

   let voll = 0.;
   if (S.vl) voll = 1.;

   S.setUniform('1f', 'uVL', voll);

   // SEND ANIMATION TIME TO GPU

   S.setUniform('1f', 'uTime', time);

   //S.setUniform('Matrix4fv', 'uSm', false, S.material.flat());

   // SEND BACKGROUND COLOR TO GPU

   S.setUniform('3fv', 'uBgColor', [ .15,.2,.85 ]);

   // RENDER THIS ANIMATION FRAME

   S.gl.drawArrays(S.gl.TRIANGLE_STRIP, 0, 4);
`,
events: `

  onDrag = (x,y) => {
      if (x > S.mouseX) S.yaw += .01;
      else S.yaw -= .01;

      if (y > S.mouseY) S.pitch += .01;
      else S.pitch -= .01;

      S.mouseX = x;
      S.mouseY = y;
  }

  onKeyPress = key => {

      // FORWARD
      if (key == 87) {
         S.cPos[2] -= .1;
      }
      // BACKWARD
      else if (key == 83) {
         S.cPos[2] += .1;
      }
      // LEFT
      else if (key == 65) {
         S.cPos[0] -= .1;
      }
      // RIGHT
      else if (key == 68) {
         S.cPos[0] += .1;
      }
      // UP
      else if (key == 81) {
         S.cPos[1] += .1;
      }
      // DOWN
      else if (key == 69) {
         S.cPos[1] = Math.max(S.cPos[1] - .1, .1);
      }

      console.log(key);
  }

  onVisualizeClicked = () => {
      S.visualizeSphere = !S.visualizeSphere;
  }

  onVolumetricClicked = () => {
      S.vl = !S.vl;
  }
`
};

}


