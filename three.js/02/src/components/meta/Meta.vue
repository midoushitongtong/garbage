<script setup lang="ts">
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Vector3,
  VSMShadowMap,
  WebGLRenderer,
  CapsuleGeometry,
  MeshBasicMaterial,
  Clock,
} from 'three';
import { Capsule, Octree, OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;
let stats: Stats | undefined = undefined;
let updateCallback: ((delta: number) => void)[] = [];

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
  renderer.shadowMap.type = VSMShadowMap;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
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
  scene.background = new Color('#88ccee');
  scene.fog = new Fog('#88ccee', 0, 50);
  // 坐标辅助器
  const axesHelper = new AxesHelper(3);
  axesHelper.position.set(0, 0.1, 0);
  scene.add(axesHelper);
  // 帧数显示器
  stats = new Stats();
  stats.dom.style.position = 'absolute';
  stats.dom.style.top = '0';
  containerRef.value.appendChild(stats.dom);
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
  const floorGeometry = new PlaneGeometry(20, 20);
  const floorMaterial = new MeshStandardMaterial({
    color: '#ffffff',
    side: DoubleSide,
  });
  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(floor);

  // 创建一个 octree
  const worldOctree = new Octree();
  // 创建一个人的碰撞体
  const playerCollider = new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1.35, 0), 0.35);

  const capsuleGeometry = new CapsuleGeometry(0.35, 1, 32);
  const capsuleMaterial = new MeshBasicMaterial({
    color: '#ff0000',
    side: DoubleSide,
  });
  const capsule = new Mesh(capsuleGeometry, capsuleMaterial);
  capsule.position.set(0, 0.85, 0);
  scene.add(capsule);

  // 设置重力
  const gravity = -9.8;
  // 玩家的速度
  const playerVelocity = new Vector3(0, 0, 0);
  // 方向向量
  const platerDirection = new Vector3(0, 0, 0);

  updateCallback.push(() => {
    if (capsule.position.y < -20) {
      playerCollider.start.set(0, 2.35, 0);
      playerCollider.end.set(0, 3.35, 0);
      playerCollider.radius = 0.35;
      playerVelocity.set(0, 0, 0);
      platerDirection.set(0, 0, 0);
    }
  });

  updateCallback.push((delta: number) => {
    playerVelocity.y += gravity * delta;
    // 计算玩家移动距离
    const playerMoveDistance = playerVelocity.clone().multiplyScalar(delta);
    playerCollider.translate(playerMoveDistance);
    playerCollider.getCenter(capsule.position);

    // 碰撞检测
  });
};

// 渲染
const clock = new Clock();
const render = () => {
  if (!renderer || !camera || !controls || !scene || !stats) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  const delta = clock.getDelta();
  updateCallback.forEach((item) => item(delta));
  stats.update();
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
