precision lowp float;

uniform sampler2D uTexture;

varying vec3 vPosition;
varying float vElevation;
varying vec2 vUV;


void main() {
  // float height = vElevation + 0.05 * 10.0; 
  // gl_FragColor = vec4(1.0 * height, 0.0, 0.0, 1);
  
  // 根据 uv 进行采样
  float height = vElevation + 0.05 * 20.0;
  vec4 textureColor = texture2D(uTexture, vUV);
  textureColor.rgb *= height;
  gl_FragColor = textureColor;
}