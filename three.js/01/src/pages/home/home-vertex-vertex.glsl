precision lowp float;
/**
lowp 低精度 2^8 ~ -2^8
midiump 中精度 2^10 ~ -2^10
highp 高精度 2^16 ~ -2^16
*/

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uTime; // 获取时间
attribute vec3 position;
attribute vec2 uv;

varying vec3 vPosition;
varying float vElevation;
varying vec2 vUV;

void main() {
  vPosition = position;
  vUV = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin((modelPosition.x + uTime * 0.5) * 10.0 ) * 0.05;
  modelPosition.z += sin((modelPosition.y + uTime * 0.5)* 10.0 ) * 0.05;
  vElevation = modelPosition.z;

  // 将各个顶点变换到裁剪空间
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}