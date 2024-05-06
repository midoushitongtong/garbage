<script setup lang="ts">
import anime from 'animejs';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  CatmullRomCurve3,
  Clock,
  DirectionalLight,
  EquirectangularReflectionMapping,
  Group,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  type Object3DEventMap,
} from 'three';
import {
  type GLTF,
  GLTFLoader,
  OrbitControls,
  DRACOLoader,
  EXRLoader,
} from 'three/examples/jsm/Addons.js';
import { inject, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

const reQiQiuAnimateType = inject('reQiQiuAnimateType') as Ref<string>;
const cameraType = inject('cameraType') as Ref<string>;
const cameraLookType = inject('cameraLookType') as Ref<string>;

const containerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;
const models: (
  | {
      type: 'reQiQiu';
      animationMixer: AnimationMixer;
      animationClips: AnimationClip[];
      currentAction: AnimationAction;
      updateWithDeltaTime?: (deltaTime: number) => void;
    }
  | {
      type: 'qiChe';
      model: Object3D<Object3DEventMap>;
      updateWithDeltaTime?: (deltaTime: number) => void;
    }
)[] = [];

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
  camera.position.set(0, 8, 8);
  // 控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = 0;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  // 场景
  scene = new Scene();
  const exrLoader = new EXRLoader();
  const grassland = exrLoader.load('/public/imgs/HdrOutdoorFieldDayOvercast004_HDR_2K.exr');
  grassland.mapping = EquirectangularReflectionMapping;
  scene.background = grassland;
  scene.environment = grassland;
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
  // 加载用于解压缩的 loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/gltf/');
  gltfLoader.setDRACOLoader(dracoLoader);
  const city2GLTF = await new Promise<GLTF>((resolve) => {
    gltfLoader.load('/public/city2.glb', resolve);
  });
  const city2 = city2GLTF.scene.clone();

  city2.traverse((item) => {
    if (!city2GLTF) return;
    if (item.name === '热气球') {
      const animationMixer = new AnimationMixer(item);
      models.push({
        type: 'reQiQiu',
        animationMixer,
        animationClips: [city2GLTF.animations[0], city2GLTF.animations[1]],
        currentAction: animationMixer.clipAction(city2GLTF.animations[0]).play(),
        updateWithDeltaTime: (deltaTime) => {
          animationMixer.update(deltaTime * 5);
        },
      });
    }
    if (item.name === '汽车') {
      models.push({
        type: 'qiChe',
        model: item,
      });
    }
  });

  city2.traverse((item) => {
    if (item.name === '汽车运动轨道') {
      const points: Vector3[] = [];
      // @ts-ignore
      for (let i = 0; i < item.geometry.attributes.position.count; i++) {
        points.push(
          new Vector3(
            // @ts-ignore
            item.geometry.attributes.position.array[i * 3],
            // @ts-ignore
            item.geometry.attributes.position.array[i * 3 + 1],
            // @ts-ignore
            item.geometry.attributes.position.array[i * 3 + 2]
          )
        );
      }
      const curve = new CatmullRomCurve3(points);
      const targets = {
        value: 0,
      };
      anime({
        targets,
        value: 1,
        easing: 'linear',
        duration: 5000,
        loop: true,
        change: () => {
          const point = curve.getPoint(targets.value);
          const point2 = curve.getPoint(Math.min(targets.value + 0.001, 1.0));
          models.forEach((item) => {
            if (!renderer || !camera || !controls || !scene) {
              console.log('检测到变量未初始化，请检查');
              return;
            }
            if (item.type === 'qiChe') {
              item.model.position.copy(point);
              item.model.lookAt(point2);
              if (cameraLookType.value === '2') {
                const cameraPoint2 = curve.getPoint(Math.max(targets.value - 0.03, 0));
                // 更新摄像头位置和注视点
                camera.position.copy(new Vector3(cameraPoint2.x, cameraPoint2.y + 5, cameraPoint2.z));
                camera.lookAt(point2);
                controls.target.copy(point2);
              }
            }
          });
        },
      });
    }
  });

  group.add(city2);
  scene.add(group);
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

watch(reQiQiuAnimateType, (newValue) => {
  if (newValue === '1') {
    models.forEach((item) => {
      if (item.type === 'reQiQiu') {
        item.currentAction.stop();
        item.currentAction = item.animationMixer.clipAction(item.animationClips[0]).play();
      }
    });
  } else if (newValue === '2') {
    models.forEach((item) => {
      if (item.type === 'reQiQiu') {
        item.currentAction.stop();
        item.currentAction = item.animationMixer.clipAction(item.animationClips[1]).play();
      }
    });
  } else {
    console.log('未知 reQiQiuAnimateType 请检查');
  }
});

watch(cameraLookType, (newValue) => {
  if (!renderer || !controls || !camera) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  if (newValue === '1') {
    camera.position.copy(new Vector3(0, 8, 8));
    camera.lookAt(new Vector3(0, 0, 0));
    controls.target.copy(new Vector3(0, 0, 0));
  }
});

watch(cameraType, (newValue) => {
  if (!controls) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  if (newValue === '1') {
    controls.autoRotate = true;
  } else {
    controls.autoRotate = false;
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
