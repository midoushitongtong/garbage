<script setup lang="ts">
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AxesHelper,
  BufferGeometry,
  Clock,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  FileLoader,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Shape,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { LineGeometry, OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, onUnmounted, ref } from 'vue';
import * as d3 from 'd3';

const webGLRenderContainerRef = ref<HTMLDivElement>();
let requestAnimationFrameId: number | undefined = undefined;
let renderer: WebGLRenderer | undefined = undefined;
let camera: PerspectiveCamera | undefined = undefined;
let controls: OrbitControls | undefined = undefined;
let scene: Scene | undefined = undefined;

// 初始化渲染器
const initRenderer = () => {
  if (!webGLRenderContainerRef.value) {
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
  // 相机
  camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 7.5, 0);
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

// 初始化模型
const map = new Object3D();
const initModel = async () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }

  // 载入 geo json 文件
  const fileLoader = new FileLoader();
  const geoJSONString = await fileLoader.loadAsync('/public/100000_full.json');
  const geoJSON = JSON.parse(geoJSONString.toString());

  geoJSON.features.forEach((item: any) => {
    // 创建省份物体
    const province = new Object3D();
    province.name = item.properties.name;
    // 获取经纬度坐标
    const coordinates = item.geometry.coordinates;
    if (item.geometry.type === 'Polygon') {
      // 根据经纬度坐标绘制多边形
      coordinates.forEach((coordinates2: any) => {
        const mesh = createMesh(coordinates2);
        const line = createLine(coordinates2);
        mesh.name = item.properties.name;
        province.add(mesh);
        province.add(line);
      });
    }
    if (item.geometry.type === 'MultiPolygon') {
      coordinates.forEach((coordinates2: any) => {
        coordinates2.forEach((coordinates3: any) => {
          const mesh = createMesh(coordinates3);
          const line = createLine(coordinates3);
          mesh.name = item.properties.name;
          province.add(mesh);
          province.add(line);
        });
      });
    }
    map.add(province);
  });
  map.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(map);
};

const projection = d3.geoMercator().center([116.5, 38.5]).translate([0, 0, 0]);
const createMesh = (coordinate: any) => {
  const shape = new Shape();
  coordinate.forEach((row: any, index: number) => {
    const [longitude, latitude] = projection(row);
    if (index === 0) {
      shape.moveTo(longitude, -latitude);
    }
    shape.lineTo(longitude, -latitude);
  });
  const geometry = new ExtrudeGeometry(shape, { depth: 5 });
  const material = new MeshBasicMaterial({
    color: new Color(Math.random() * 0xffffff),
    opacity: 0.5,
    transparent: true,
  });
  const mesh = new Mesh(geometry, material);
  mesh.userData.originColor = material.color;
  return mesh;
};

const createLine = (coordinate: any) => {
  const lineGeometry = new BufferGeometry();
  const pointsArray: Vector3[] = [];
  coordinate.forEach((row: any) => {
    const [longitude, latitude] = projection(row);
    pointsArray.push(new Vector3(longitude, -latitude, 10));
  });
  lineGeometry.setFromPoints(pointsArray);
  const lineMaterial = new LineBasicMaterial({
    color: new Color(Math.random() * 0xffffff),
    opacity: 0.5,
    transparent: true,
  });
  const line = new Line(lineGeometry, lineMaterial);
  return line;
};

// 渲染
const clock = new Clock();
const render = () => {
  if (!renderer || !camera || !controls || !scene) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  const time = clock.getDelta();
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

// 处理窗口点击
let currentMesh: any = null;
const handleWindowClick = (e: MouseEvent) => {
  if (!renderer || !controls || !camera) {
    console.log('检测到变量未初始化，请检查');
    return;
  }
  // 获取鼠标点击的位置
  const mouse = new Vector2(0, 0);
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // 创建射线
  const raycaster = new Raycaster();
  // 设置鼠标点击的位置
  raycaster.setFromCamera(mouse, camera);
  // 获取点击的数据
  const intersects = raycaster.intersectObjects(map.children);
  if (intersects.length > 0) {
    if (currentMesh) {
      currentMesh.object.material.color = currentMesh.object.userData.originColor;
      currentMesh.object.userData.active = false;
    }

    const mesh = intersects[0];
    if (!mesh.object.userData.active && mesh.object.name !== currentMesh?.object?.name) {
      // @ts-ignore
      mesh.object.material.color = new Color('#ffffff');
      mesh.object.userData.active = true;
      currentMesh = mesh;
    } else {
      // @ts-ignore
      mesh.object.material.color = mesh.object.userData.originColor;
      mesh.object.userData.active = false;
      currentMesh = null;
    }
  }
};

onMounted(async () => {
  initRenderer();
  await initModel();
  window.addEventListener('resize', handleWindowResize);
  window.addEventListener('click', handleWindowClick);
  requestAnimationFrameId = requestAnimationFrame(render);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize);
  window.removeEventListener('click', handleWindowClick);
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
</style>
