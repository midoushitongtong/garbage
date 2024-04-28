<script setup lang="ts">
import {
  AmbientLight,
  AxesHelper,
  Color,
  CubeTextureLoader,
  DirectionalLight,
  Group,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { type GLTF, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import {
  FlyLineShader,
  LightRaderShader,
  LightWallShader,
  createEdgeLine,
  setCityColorShader,
  setLightLine2Shader,
  setSpreadShader,
  Event,
} from './shader';
import type { SmartCityInfo } from '@/apis/smart-city/types';
import anime from 'animejs';

type Props = {
  smartCityInfo: SmartCityInfo;
  activeEventListItemId: string;
};

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'onEventIconClick', item: SmartCityInfo['eventList'][0]): void;
}>();

const containerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;
let eventList: Event[] = [];

// 初始化渲染器
const initRenderer = () => {
  if (!containerRef.value) {
    console.log('检测到 dom 元素未初始化, 请检查');
    return;
  }

  // 渲染器
  renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1);
  renderer.shadowMap.enabled = true;
  containerRef.value.innerHTML = '';
  containerRef.value.appendChild(renderer.domElement);
  // 相机
  camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 5, 8);
  // 控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // 场景
  scene = new Scene();
  scene.background = new Color('#666666');
  // 设置场景背景
  const cubeTextureLoader = new CubeTextureLoader();
  const cube = cubeTextureLoader.load([
    '/public/px.jpg',
    '/public/nx.jpg',
    '/public/py.jpg',
    '/public/ny.jpg',
    '/public/pz.jpg',
    '/public/nz.jpg',
  ]);
  scene.background = cube;
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

  const group = new Group();
  const gltfLoader = new GLTFLoader();
  const cityGLTF = await new Promise<GLTF>((resolve) => {
    gltfLoader.load('/public/city.glb', resolve);
  });
  const city = cityGLTF.scene.clone();

  city.traverse((item: any) => {
    // 修改模型的颜色
    item.material = new MeshBasicMaterial({
      color:
        item.name === 'ROADS'
          ? // (道路)模型的颜色
            new Color('#8f66fc')
          : // (其他)模型的颜色
            new Color('#aaaeff'),
    });

    // 修改(城市)模型的着色器
    if (item.name == 'CITY_UNTRIANGULATED') {
      item.material.onBeforeCompile = (shader: ShaderMaterial) => {
        if (!scene) {
          console.log('检测到变量未初始化，请检查');
          return;
        }

        // 设置(城市)颜色
        setCityColorShader(item, shader);
        // 设置(城市)扩散效果
        setSpreadShader(item, shader);
        // 设置(城市)线条效果
        // setLightLineShader(item, shader);
        setLightLine2Shader(item, shader);
      };

      // 添加(城市)边缘线条效果
      const edgeLine = createEdgeLine(item);
      group.add(edgeLine);
      // 添加(城市)光墙效果
    }
  });

  group.add(city);

  // 根据 props 渲染事件列表
  props.smartCityInfo.eventList.forEach((item) => {
    if (!scene || !camera) {
      console.log('检测到变量未初始化，请检查');
      return;
    }
    const event = new Event();
    const mesh = event.init(scene, camera, item, () => {
      emits('onEventIconClick', item);
    });
    eventList.push(event);
    group.add(mesh);
    if (item.type === 'f') {
      group.add(new LightWallShader().init(item));
    }
    if (item.type === 'z') {
      // group.add(new FlyLine().init());
      group.add(new FlyLineShader().init(item));
    }
    if (item.type === 'd') {
      group.add(new LightRaderShader().init(item));
    }
  });

  group.position.set(0, 0, 1);
  group.scale.set(0.5, 0.5, 0.5);

  scene.add(group);
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

watch(
  () => props.activeEventListItemId,
  (newValue) => {
    if (!controls || !camera) {
      console.log('检测到变量未初始化，请检查');
      return;
    }
    const item = props.smartCityInfo.eventList.find((item) => item.id === newValue);
    if (item) {
      anime({
        targets: camera?.position,
        x: item.position.x,
        y: 5,
        z: item.position.z,
        easing: 'linear',
        duration: 1000,
      });
      eventList.forEach((item) => {
        if (item.sprite?.userData.id === newValue) {
          item.startScaleAnimate();
        } else {
          item.stopScaleAnimate();
        }
      });
    }
  }
);

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
</style>
