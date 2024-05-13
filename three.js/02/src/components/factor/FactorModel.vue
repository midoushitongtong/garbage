<script setup lang="ts">
import anime from 'animejs';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AxesHelper,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  type Object3DEventMap,
} from 'three';
import {
  type GLTF,
  GLTFLoader,
  OrbitControls,
  DRACOLoader,
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/Addons.js';
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

const showFloor = inject('showFloor') as Ref<'1' | '2'>;
const showFighter = inject('showFighter') as Ref<'1' | '2'>;

const webGLRenderContainerRef = ref<HTMLDivElement>();
const css3DRenderContainerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let css3DRenderer: CSS3DRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;
const models: {
  model: Group<Object3DEventMap> | CSS3DObject;
}[] = [];

// 初始化渲染器
const initRenderer = () => {
  if (!webGLRenderContainerRef.value || !css3DRenderContainerRef.value) {
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
  webGLRenderContainerRef.value.innerHTML = '';
  webGLRenderContainerRef.value.appendChild(renderer.domElement);
  // css 3d 渲染器
  css3DRenderer = new CSS3DRenderer();
  css3DRenderer.setSize(window.innerWidth, window.innerHeight);
  css3DRenderContainerRef.value.innerHTML = '';
  css3DRenderContainerRef.value.appendChild(css3DRenderer.domElement);
  // 相机
  camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 7.5, 3.5);
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
  directionalLight.position.set(0, 5, 0);
  scene.add(directionalLight);
};

// 创建 tag
const createTag = (object3D: Object3D<Object3DEventMap>, title: string) => {
  const div = document.createElement('div');
  div.className = 'mesh-info-container';
  div.innerHTML = `
    <div class="mesh-info-content">
      <div class="title">${title}</div>
      <div class="value">温度：26°</h3>
      <div class="value">湿度：50%</h3>
    </div>
  `;
  const objectCSS3D = new CSS3DObject(div);
  objectCSS3D.scale.set(0.015, 0.015, 0.015);
  objectCSS3D.position.set(object3D.position.z, object3D.position.y + 2.3, object3D.position.z);
  return objectCSS3D;
};

// 初始化模型
const initModel = async () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }

  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/gltf/');
  gltfLoader.setDRACOLoader(dracoLoader); // 设置解压缩插件
  const homeGLTF = await new Promise<GLTF>((resolve) => {
    gltfLoader.load('/public/home.glb', resolve);
  });
  const home = homeGLTF.scene;
  const fighterGLTF = await new Promise<GLTF>((resolve) => {
    gltfLoader.load('/public/fighter.gltf', resolve);
  });
  const fighter = fighterGLTF.scene;
  // 第一层楼
  const floor1Group = new Group();
  floor1Group.name = 'floor1Group';
  const floor1 = home.clone();
  floor1.traverse((item) => {
    if (item.name === '平面001_1') {
      // @ts-ignore
      item.material.emissiveIntensity = 1; // 设置发光强度
    }
  });
  floor1Group.add(floor1);
  // 创建 tag
  const floor1Tag = createTag(floor1, '智慧工厂1楼');
  floor1Tag.position.z -= 2;
  floor1Group.add(floor1Tag);
  models.push({
    model: floor1Group,
  });
  models.push({
    model: floor1Tag,
  });
  scene.add(floor1Group);

  // 第二层楼
  const floor2Group = new Group();
  floor2Group.name = 'floor2Group';
  floor2Group.position.set(0, 3.75, 0);
  const floor2 = home.clone();
  floor2.traverse((item) => {
    if (item.name === '平面001_1') {
      // @ts-ignore
      item.material.emissiveIntensity = 1; // 设置发光强度
    }
  });
  floor2Group.add(floor2);
  // 创建 tag
  const floor2Tag = createTag(floor2, '智慧工厂2楼');
  floor2Tag.position.z -= 2;
  floor2Group.add(floor2Tag);
  // 加载战机
  const floor2Fighter = fighter.clone();
  floor2Fighter.name = 'fighter';
  floor2Fighter.scale.set(0.2, 0.2, 0.2);
  floor2Fighter.position.set(0, 0.1, 0);
  floor2Fighter.traverse((item) => {
    if (item.name === '战机16') {
      item.children.forEach((item2) => {
        if (item2.name === 'Obj3d66-1692937-85-364_13') {
          item2.visible = false;
        }
      });
    }
  });
  floor2Group.add(floor2Fighter);
  scene.add(floor2Group);
  models.push({
    model: floor2Group,
  });
  models.push({
    model: floor2Tag,
  });
};

// 渲染
const clock = new Clock();
const render = () => {
  if (!renderer || !css3DRenderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  const time = clock.getDelta();
  controls.update(time);
  css3DRenderer.render(scene, camera);
  renderer.render(scene, camera);

  requestAnimationFrameId = requestAnimationFrame(render);
};

// 处理窗口大小发生改变，更新渲染器参数
const handleWindowResize = () => {
  if (!renderer || !css3DRenderer || !controls || !camera) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
  css3DRenderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const toggleFighterVisibleType = (type: '1' | '2') => {
  models.forEach((item) => {
    if (item.model.name === 'floor2Group') {
      item.model.children.forEach((item2) => {
        if (item2.name === 'fighter') {
          item2.children.forEach((item3) => {
            const count = item3.children.length;
            item3.children.forEach((item4, index4) => {
              if (type === '1') {
                const oneLineDisplayCount = 6; // 一行显示6个网格
                anime({
                  targets: item4.position,
                  x: ((index4 % oneLineDisplayCount) - oneLineDisplayCount / 2) * 2,
                  y: 1.5,
                  z:
                    (Math.max(Math.floor(index4 / oneLineDisplayCount), 0) -
                      Math.floor(count / oneLineDisplayCount / 2)) *
                    2,
                  duration: 1000,
                  easing: 'linear',
                });
              } else {
                anime({
                  targets: item4.position,
                  x: 0,
                  y: 0,
                  z: 0,
                  duration: 1000,
                  easing: 'linear',
                });
              }
            });
          });
        }
      });
    }
  });
};

watch(showFloor, (newValue) => {
  if (newValue === '1') {
    anime({
      targets: camera?.position,
      x: 0,
      y: 3.35,
      z: 5.5,
      duration: 1000,
      easing: 'linear',
    });
    anime({
      targets: controls?.target,
      x: 0,
      y: 0,
      z: 0,
      duration: 1000,
      easing: 'linear',
    });
  } else if (newValue === '2') {
    anime({
      targets: camera?.position,
      x: 0,
      y: 7.5,
      z: 3.5,
      duration: 1000,
      easing: 'linear',
    });
    anime({
      targets: controls?.target,
      x: 0,
      y: 0,
      z: 0,
      duration: 1000,
      easing: 'linear',
    });
  }
});

watch(showFighter, (newValue) => {
  if (!renderer || !css3DRenderer || !controls || !camera) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  if (newValue === '1') {
    toggleFighterVisibleType('1');
  } else if (newValue === '2') {
    toggleFighterVisibleType('2');
  }
});

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
  <div class="webGLRenderContainer" ref="webGLRenderContainerRef"></div>
  <div class="css3DRenderContainer" ref="css3DRenderContainerRef"></div>
</template>

<style lang="scss" scoped>
.webGLRenderContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.css3DRenderContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
}
:deep(.mesh-info-container) {
  position: relative;
  pointer-events: none !important;
  &::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 1px;
    bottom: 0;
    background-color: #1573ffb5;
    right: -50px;
    transform: rotate(30deg);
    transform-origin: 0 0;
  }
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    bottom: -27px;
    right: -50px;
    background-color: rgba(21, 115, 255);
    transform: rotate(30deg);
    transform-origin: 0 0;
  }
  .mesh-info-content {
    background-color: #1573ffb5;
    border-radius: 6px;
    box-shadow: 0 0 12px #1573ffb5;
    border: 1px solid #1573ffb5;
    color: #fff;
    font-size: 14px;
    .title {
      font-size: 23px;
      text-align: center;
    }
    .value {
      font-size: 14px;
    }
    padding: 10px;
  }
}
</style>
