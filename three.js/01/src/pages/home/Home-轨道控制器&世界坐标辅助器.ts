import './Home.scss';
import * as THREE from 'three';
// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);
// 设置相机位置
camera.position.set(2, 2, 5);
// camera.position.x = 2; // 红色
// camera.position.y = 2; // 绿色
// camera.position.z = 5; // 蓝色
camera.lookAt(0, 0, 0);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 带阻尼的惯性
controls.enableDamping = true;
// 阻尼的系数
controls.dampingFactor = 0.05;
// 自动旋转
controls.autoRotate = true;

// 创建世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: '#06f' });
// 创建网格
const cube = new THREE.Mesh(geometry, material);
// 将网格添加到场景中
scene.add(cube);

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
};

// 渲染
renderer.render(scene, camera);
controls.update();
animate();
