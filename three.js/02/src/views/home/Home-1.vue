<script setup lang="ts">
import {
  AxesHelper,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();

const init = async () => {
  if (!containerRef.value) {
    return;
  }

  // rendener
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1);
  containerRef.value.innerHTML = '';
  containerRef.value.appendChild(renderer.domElement);
  // camera
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 5); // 设置相机位置
  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // scene
  const scene = new Scene();
  scene.background = new Color('#666666');
  // axes helper
  const axesHelper = new AxesHelper(3);
  scene.add(axesHelper);

  // box
  const boxGeometry = new BoxGeometry(500, 500, 500);
  const boxMaterials: MeshBasicMaterial[] = [];
  // load texture
  // 顺序：左右上下前后
  const imageList = ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f'];
  const textureLoader = new TextureLoader();
  imageList.forEach((image) => {
    const texture = textureLoader.load(`/public/imgs/living/${image}.jpg`);
    if (image === '4_u' || image === '4_d') {
      texture.rotation = Math.PI;
      texture.center = new Vector2(0.5, 0.5);
    }
    boxMaterials.push(
      new MeshBasicMaterial({
        map: texture,
      })
    );
  });
  const box = new Mesh(boxGeometry, boxMaterials);
  box.geometry.scale(1, 1, -1);
  scene.add(box);

  // sphere
  // const sphereGeometry = new SphereGeometry(10, 32, 32);
  // const rgbeLoader = new RGBELoader();
  // const texture = rgbeLoader.load('/public/imgs/hdr/Living.hdr');
  // const sphereMaterial = new MeshBasicMaterial({
  //   map: texture,
  // });
  // const sphere = new Mesh(sphereGeometry, sphereMaterial);
  // sphere.geometry.scale(1, 1, -1);
  // scene.add(sphere);

  const render = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  };
  render();
};

onMounted(() => {
  init();
});
</script>

<template>
  <main class="container" ref="containerRef"></main>
</template>
