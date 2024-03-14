import {
  AmbientLight,
  AnimationMixer,
  DirectionalLight,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  LinearToneMapping,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 渲染器
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = LinearToneMapping;
renderer.toneMappingExposure = Math.pow(2, 0.0);

// 相机
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
const initCameraPosition = { x: 0, y: 1100, z: -800 };
camera.position.set(initCameraPosition.x, initCameraPosition.y, initCameraPosition.z);
camera.lookAt(0, 0, 0);

// 场景
const scene = new Scene();
scene.rotation.set(0, 0.785, 0);

// 地图控制器
const controls = new MapControls(camera, renderer.domElement);
controls.panSpeed = 2;
controls.enablePan = true;
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;
controls.addEventListener('change', () => {
  controls.target.x = 0;
  camera.position.x = 0;
  const zDiff = camera.position.z + Math.abs(initCameraPosition.z);
  camera.position.y = initCameraPosition.y + zDiff * 0.1;
});

// 设置渲染环境
// AmbientLight
const ambientLight = new AmbientLight(0xffffff, 0.3);
camera.add(ambientLight);
// DirectionalLight
const directionalLight = new DirectionalLight(0xffffff, 0.8 * Math.PI);
directionalLight.position.set(10, 10, 10);
camera.add(directionalLight);
// PMREMGenerator
const pmremGenerator = new PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
// RoomEnvironment
const neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
scene.environment = neutralEnvironment;
scene.background = neutralEnvironment;

// 加载模型
let mixer: any = null; // 用于控制动画的mixer
const loader = new GLTFLoader()
  .setDRACOLoader(new DRACOLoader().setDecoderPath('/three/examples/jsm/libs/draco/gltf/'))
  .setKTX2Loader(
    new KTX2Loader().setTranscoderPath('/three/examples/jsm/libs/basis/').detectSupport(renderer)
  );
loader.load('/model.glb', (gltf) => {
  const model = gltf.scene;
  // 添加模型
  scene.add(model);
  // 获取模型动画
  mixer = new AnimationMixer(model);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
});
scene.position.set(0, 0, 0);

// 渲染场景
const animate = () => {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(0.01); // 更新动画，0.01是时间增量，可以根据需要调整
  }

  controls.update();
  renderer.render(scene, camera);
};
animate();

// GUI
const gui = new GUI();
const secneFolder = gui.addFolder('Scene');
secneFolder.add(scene.rotation, 'x').step(0.01).name('场景 Rotation X');
secneFolder.add(scene.rotation, 'y').step(0.01).name('场景 Rotation y');
secneFolder.add(scene.rotation, 'z').step(0.01).name('场景 Rotation z');

// 添加触摸事件
// let startY = -1;
// const onTouchStart = (event: TouchEvent) => {
//   startY = event.touches[0].clientY;
// };
// const onTouchMove = (event: TouchEvent) => {
//   if (startY == -1) return;
//   const lastY = event.touches[0].clientY;
//   const deltaY = lastY - startY;
//   startY = lastY;
//   scene.position.z -= deltaY * 5;
//   scene.position.x += deltaY * 5;
//   scene.position.y -= deltaY * 0.5;
// };
// const onTouchEnd = () => {
//   startY = -1;
// };
// const onMouseStart = (event: MouseEvent) => {
//   startY = event.clientY;
//   console.log(startY);
// };
// const onMouseMove = (event: MouseEvent) => {
//   if (startY == -1) return;
//   const lastY = event.clientY;
//   const deltaY = lastY - startY;
//   startY = lastY;
//   scene.position.z -= deltaY * 5;
//   scene.position.x += deltaY * 5;
//   scene.position.y -= deltaY * 0.5;
// };
// const onMouseUp = () => {
//   startY = -1;
// };
// window.addEventListener('touchstart', onTouchStart);
// window.addEventListener('touchmove', onTouchMove);
// window.addEventListener('touchend', onTouchEnd);
// window.addEventListener('mousedown', onMouseStart);
// window.addEventListener('mousemove', onMouseMove);
// window.addEventListener('mouseup', onMouseUp);
