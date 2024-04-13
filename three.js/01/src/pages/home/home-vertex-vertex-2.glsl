precision lowp float;

varying vec2 vUV;

void main() {
  vUV = uv;

  // 将各个顶点变换到裁剪空间
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
} 