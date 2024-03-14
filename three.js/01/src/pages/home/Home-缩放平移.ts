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
  90, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);
// 设置相机位置
camera.position.set(-2, 2, 5);
camera.lookAt(0, 0, 0);

// 创建世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建轨道控制器
const orbitControls = new OrbitControls(camera, renderer.domElement);
// 开启带阻尼的惯性
orbitControls.enableDamping = true;

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: '#06f' });
const childMaterial = new THREE.MeshBasicMaterial({ color: '#f60' });
// 创建网格
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
cube.scale.set(2, 2, 2);
// cube.rotation.x = Math.PI / 4;
const childCube = new THREE.Mesh(geometry, childMaterial);
childCube.position.set(3, 0, 0);
// childCube.rotation.x = Math.PI / 4;
cube.add(childCube);
// 将网格添加到场景中
scene.add(cube);

const animate = () => {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  orbitControls.update();
};

// 渲染
renderer.render(scene, camera);
orbitControls.update();
animate();

window.addEventListener('resize', () => {
  // 重置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
  // 渲染
  renderer.render(scene, camera);
});

const btn = document.createElement('button');
btn.innerHTML = '点击全屏';
btn.style.position = 'absolute';
btn.style.top = '0';
btn.style.left = '0';
btn.addEventListener('click', () => {
  document.documentElement.requestFullscreen();
});
document.body.appendChild(btn);

const btn2 = document.createElement('button');
btn2.innerHTML = '退出全屏';
btn2.style.position = 'absolute';
btn2.style.top = '0';
btn2.style.left = '100px';
btn2.addEventListener('click', () => {
  document.exitFullscreen();
});
document.body.appendChild(btn2);
