<script setup lang="ts">
import {
  AdditiveBlending,
  AxesHelper,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, ref } from 'vue';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库

const containerRef = ref<HTMLDivElement>();

const generateRoom = (
  position: Vector3,
  imageList: {
    path: string;
    setTextureConfig?: (texture: Texture) => void;
  }[]
) => {
  // 创建 box
  const boxGeometry = new BoxGeometry(500, 500, 500);
  const boxMaterials: MeshBasicMaterial[] = [];
  // load texture
  const textureLoader = new TextureLoader();
  imageList.forEach((image) => {
    const texture = textureLoader.load(`/public/imgs/${image.path}`);
    if (image.setTextureConfig) {
      image.setTextureConfig(texture);
    }
    boxMaterials.push(
      new MeshBasicMaterial({
        map: texture,
      })
    );
  });
  const box = new Mesh(boxGeometry, boxMaterials);
  box.position.copy(position);
  box.geometry.scale(1, 1, -1);
  return box;
};

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
  // scene.add(axesHelper);

  // 客厅
  const livingRoom = generateRoom(new Vector3(0, 0, 0), [
    { path: 'living/4_l.jpg' },
    { path: 'living/4_r.jpg' },
    {
      path: 'living/4_u.jpg',
      setTextureConfig: (texture) => {
        texture.rotation = Math.PI;
        texture.center = new Vector2(0.5, 0.5);
      },
    },
    {
      path: 'living/4_d.jpg',
      setTextureConfig: (texture) => {
        texture.rotation = Math.PI;
        texture.center = new Vector2(0.5, 0.5);
      },
    },
    { path: 'living/4_b.jpg' },
    { path: 'living/4_f.jpg' },
  ]);
  livingRoom.name = 'livingRoom';
  scene.add(livingRoom);

  // 厨房
  const kitchen = generateRoom(new Vector3(500, 0, 0), [
    { path: 'kitchen/0_l.jpg' },
    { path: 'kitchen/0_r.jpg' },
    {
      path: 'kitchen/0_u.jpg',
      setTextureConfig: (texture) => {
        texture.rotation = Math.PI;
        texture.center = new Vector2(0.5, 0.5);
      },
    },
    {
      path: 'kitchen/0_d.jpg',
      setTextureConfig: (texture) => {
        texture.rotation = Math.PI;
        texture.center = new Vector2(0.5, 0.5);
      },
    },
    { path: 'kitchen/0_b.jpg' },
    { path: 'kitchen/0_f.jpg' },
  ]);
  kitchen.name = 'kitchen';
  scene.add(kitchen);

  const home = {
    livingRoom,
    kitchen,
  };

  // 创建向导图
  const textureLoader = new TextureLoader();
  const navigationTexture = textureLoader.load('/public/imgs/彩色-向上.png');
  const navigationMaterial = new SpriteMaterial({
    map: navigationTexture,
    color: '#ffffff',
    transparent: true,
    blending: AdditiveBlending,
  });
  const navigation = new Sprite(navigationMaterial);
  navigation.position.set(150, -12, -100);
  navigation.scale.set(15, 15, 15);
  navigation.name = 'navigation-kitchen';
  scene.add(navigation);

  // 渲染
  const render = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  };
  render();

  // 创建射线
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const mouseDown = (e: MouseEvent) => {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects[0]);
    if (intersects.length > 0 && intersects[0].object?.name) {
      if (intersects[0].object.name.includes('navigation')) {
        // @ts-ignore
        const box = home[intersects[0].object.name.split('-')[1]];
        anime({
          targets: controls?.target,
          x: box.position.x - 10,
          y: box.position.y - 1,
          z: box.position.z - 1,
          easing: 'linear',
          duration: 1000,
        });
        anime({
          targets: camera?.position,
          x: box.position.x,
          y: box.position.y,
          z: box.position.z,
          easing: 'linear',
          duration: 1000,
        });
      }
    }
  };
  window.addEventListener('click', mouseDown);
};

onMounted(() => {
  init();
});
</script>

<template>
  <main class="container" ref="containerRef"></main>
</template>
