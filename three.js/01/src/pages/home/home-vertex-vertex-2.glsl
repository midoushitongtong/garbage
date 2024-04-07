precision lowp float;

varying vec2 vUv;

void main() {
  vUv = uv;

  // 将顶点变换到裁剪空间
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
} 