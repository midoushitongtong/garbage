<script setup lang="ts">
import anime from 'animejs';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
  type Object3DEventMap,
} from 'three';
import { type GLTF, GLTFLoader, OrbitControls, DRACOLoader } from 'three/examples/jsm/Addons.js';
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;
const models: {
  type: 'skeleton';
  model: Group<Object3DEventMap>;
  updateWithDeltaTime: (deltaTime: number) => void;
}[] = [];

// 初始化渲染器
const initRenderer = () => {
  if (!containerRef.value) {
    console.log('检测到 dom 元素未初始化, 请检查');
    return;
  }

  // 渲染器
  renderer = new WebGLRenderer({
    antialias: true, // 抗锯齿
    logarithmicDepthBuffer: true, // 预防闪烁
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  containerRef.value.innerHTML = '';
  containerRef.value.appendChild(renderer.domElement);
  // 相机
  camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(5, 15, 15);
  // 控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // 场景
  scene = new Scene();
  scene.background = new Color('#333333');
  // 坐标辅助器
  const axesHelper = new AxesHelper(5);
  axesHelper.position.set(0, 3, 0);
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
const initModel = async () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }

  const planeGeometry = new PlaneGeometry(50, 50);
  const planeMaterial = new MeshStandardMaterial({
    color: '#ffffff',
  });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.receiveShadow = true;
  scene.add(plane);

  const gltfLoader = new GLTFLoader();
  // 加载用于解压缩的 loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/gltf/');
  gltfLoader.setDRACOLoader(dracoLoader);
  const skeletonGLTF = await new Promise<GLTF>((resolve) => {
    gltfLoader.load('/public/skeleton.glb', resolve);
  });
  const skeleton = skeletonGLTF.scene;
  skeleton.traverse((item) => {
    item.castShadow = true;
  });
  const animationMixer = new AnimationMixer(skeleton);
  animationMixer.clipAction(skeletonGLTF.animations[0]).play();
  models.push({
    type: 'skeleton',
    model: skeleton,
    updateWithDeltaTime: (deltaTime) => {
      animationMixer.update(deltaTime);
    },
  });

  scene.add(skeleton);
};

// 渲染
const clock = new Clock();
const render = () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  const time = clock.getDelta();
  models.forEach((item) => item.updateWithDeltaTime && item.updateWithDeltaTime(time));
  controls.update(time);
  renderer.render(scene, camera);

  requestAnimationFrameId = requestAnimationFrame(render);
};

const handleClik = () => {
  anime({
    targets: camera?.position,
    x: models[0].model.position.x + 5,
    y: models[0].model.position.y + 10,
    z: models[0].model.position.z + 5,
    duration: 1000,
    easing: 'linear',
    complete: () => {
      console.log(1);
    },
  });
  anime({
    targets: controls?.target,
    x: models[0].model.position.x,
    y: models[0].model.position.y,
    z: models[0].model.position.z,
    duration: 1000,
    easing: 'linear',
    complete: () => {
      console.log(1);
    },
  });
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

onMounted(async () => {
  initRenderer();
  await initModel();
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
  <button @click="handleClik" class="button">将摄像机聚焦到模型上</button>
  <div>
    <main class="container" ref="containerRef"></main>
  </div>
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

.button {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  outline: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  background-color: #ffffff;
  &::after {
    content: '';
    height: 4px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right, #06f, #f60) no-repeat right bottom;
    background-size: 0 4px;
    transition: background-size 0.3s ease;
  }
  &:hover {
    &:after {
      background-position-x: left;
      background-size: 100% 4px;
    }
  }
  &:active {
    opacity: 0.5;
  }
}
</style>
Group, , type Object3DEventMap
