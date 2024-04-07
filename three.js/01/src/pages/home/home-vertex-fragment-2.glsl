precision lowp float;

uniform float uTime;

varying vec2 vUv;

#define PI 3.1415926

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// 旋转函数
vec2 rotate (vec2 uv, float rotation, vec2 mid) {
  return vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
  );
}

// 噪声
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
  // 从左到右渐变
  // float strength = vUv.x;
  // gl_FragColor = vec4(vstrength, vstrength, vstrength, 1);

  // 从下到上渐变
  // float strength = vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1);
  
  // 从上到下渐变
  // float strength = 1.0 - vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.5, strength);
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = abs(vUv.x - 0.5);
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = max(abs(vUv.x - 0.5),  abs(vUv.y - 0.5));
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = vUv.x;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = floor(vUv.y * 10.0) / 10.0;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = floor(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // 随机效果
  // float strength = random(vUv);
  // gl_FragColor = vec4(strength, strength, strength, 1);


  // float strength = floor(vUv.y * 10.0) / 10.0 * floor(vUv.x * 10.0) / 10.0;
  // strength = random(vec2(strength, strength));
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // float strength = distance(vUv, vec2(0.5, 0.5));
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // vec2 rotateUv = rotate(vUv, uTime * 5.0, vec2(0.5, 0.5));
  // // float strength = rotateUv;
  // gl_FragColor = vec4(rotateUv.x, rotateUv.y, 1, 1);

  // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.35);
  // strength *= 1.0 - step(0.5, distance(vUv, vec2(0.5)) + 0.15);
  // gl_FragColor = vec4(strength, strength, strength, 1);

  // vec2 rotateUv = rotate(vUv, -uTime * 5.0, vec2(0.5));
  // float alpha = 1.0 - step(0.5, abs(distance(vUv, vec2(0.5))));
  // float angle = atan(rotateUv.x - 0.5, rotateUv.y - 0.5) ;
  // float strength = (angle + 3.14) / 6.28 ;
  // gl_FragColor = vec4(strength, strength, strength, alpha);

  
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // float strength = mod(angle * 10.0, PI);
  // gl_FragColor = vec4(strength, strength, strength, 1);


  vec3 strength = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), 0.5);
  gl_FragColor = vec4(strength, 1.0);
}