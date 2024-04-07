precision lowp float;

uniform sampler2D uTexture;

varying vec3 vPosition;
varying float vElevation;
varying vec2 vUv;


void main() {
  // float height = vElevation + 0.05 * 10.0; 
  // gl_FragColor = vec4(1.0 * height, 0.0, 0.0, 1);
  
  // 根据 uv 进行采样
  float height = vElevation + 0.05 * 20.0;
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= height;
  gl_FragColor = textureColor;
}