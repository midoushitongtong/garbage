<script setup lang="ts">
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;

const init = () => {
  if (!containerRef.value) {
    console.log('检测到 dom 元素未初始化, 请检查');
    return;
  }

  // 渲染器
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1);
  renderer.shadowMap.enabled = true;
  containerRef.value.innerHTML = '';
  containerRef.value.appendChild(renderer.domElement);
  // 相机
  camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  // 控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // 场景
  scene = new Scene();
  scene.background = new Color('#666666');
  // 坐标辅助器
  const axesHelper = new AxesHelper(3);
  scene.add(axesHelper);
  // 灯光
  const ambitLight = new AmbientLight('#ffffff', 2);
  scene.add(ambitLight);
  const directionalLight = new DirectionalLight('#ffffff', 2);
  directionalLight.castShadow = true;
  directionalLight.position.set(0, 5, 10);
  scene.add(directionalLight);
};

// 初始化模型
const initModel = () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }

  // 地面
  const floorGeometry = new PlaneGeometry(50, 50);
  const floorMaterial = new MeshStandardMaterial({
    color: '#ffffff',
    side: DoubleSide,
  });
  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(floor);

  // 小球
  const boxGeometry = new SphereGeometry(1, 64, 32);
  const boxMaterial = new MeshStandardMaterial({
    metalness: 0.5,
    roughness: 0.05,
    color: '#06f',
  });
  const box = new Mesh(boxGeometry, boxMaterial);
  box.position.y = 1;
  box.castShadow = true;
  scene.add(box);
};

// 渲染
const render = () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrameId = requestAnimationFrame(render);
};

// 处理窗口大小发生改变，更新渲染器参数
const handleWindowResize = () => {
  if (!renderer || !controls || !camera) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  init();
  initModel();
  window.addEventListener('resize', handleWindowResize);
  requestAnimationFrameId = requestAnimationFrame(render);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize);
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
  }
});
</script>

<template>
  <main class="container" ref="containerRef">test</main>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
