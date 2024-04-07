import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Mesh,
  AxesHelper,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  Object3DEventMap,
  PlaneGeometry,
  DoubleSide,
  BoxGeometry,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import * as CANNON from 'cannon-es';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<BoxGeometry, MeshStandardMaterial, Object3DEventMap> | undefined;

  const init = () => {
    renderer = new WebGLRenderer();

    // 初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高
    renderer.setPixelRatio(window.devicePixelRatio * 1); // 设备像素和页面像素比例
    renderer.shadowMap.enabled = true; // 开启投影
    document.body.appendChild(renderer.domElement);

    // 初始化相机
    camera = new PerspectiveCamera(
      100, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000 // 远平面
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(2, 2, 5); // 设置相机位置

    // 初始化轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼

    // 初始化场景
    scene = new Scene();
    scene.background = new Color('#167CAC'); // 设置场景背景色

    // 坐标辅助器
    const axesHelper = new AxesHelper(5);
    scene?.add(axesHelper);

    // 灯光
    const ambientLight = new AmbientLight('#ffffff', 2); // 环境光
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight('#ffffff', 2); // 平行光
    directionalLight.castShadow = true;
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);

    // 平面
    const floorGeometry = new PlaneGeometry(50, 50);
    const floorMaterial = new MeshStandardMaterial({
      color: '#ffffff',
      side: DoubleSide,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.position.set(0, -5, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // 创建物理世界
    const _world = new CANNON.World();
    _world.gravity.set(0, -10, 0);

    // 创建盒子材质
    const _boxMaterial = new CANNON.Material('box');

    // 创建地面形状
    const _floorShap = new CANNON.Plane();
    const _floorMaterial = new CANNON.Material('floor');
    // 创建地面
    const _floorBody = new CANNON.Body({
      shape: _floorShap,
      material: _floorMaterial,
      mass: 0, // 地面质量, 当质量为0的时候, 可以使得物理保持不动
      position: new CANNON.Vec3(0, -5, 0),
      quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2), // 旋转地面
    });
    // 旋转地面的位置
    // 将地面添加到物理世界中
    _world.addBody(_floorBody);

    // 设置物理世界的材质关联
    const _contactMaterial = new CANNON.ContactMaterial(_boxMaterial, _floorMaterial, {
      friction: 0.6,
      restitution: 0.6,
    });
    _world.addContactMaterial(_contactMaterial);
    // 物理世界默认的关联材质
    _world.defaultContactMaterial = _contactMaterial;

    // 盒子列表, 将数组中的盒子渲染到世界中, 数组有几个就会渲染几个
    const boxList: {
      box: Mesh<BoxGeometry, MeshStandardMaterial, Object3DEventMap>;
      physicalBoxBody: CANNON.Body;
    }[] = [];
    const generateBox = () => {
      if (!scene) {
        console.error('检测到变量未初始化');
        return;
      }

      // 盒子
      const boxGeometry = new BoxGeometry(1, 1);
      const boxMaterial = new MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.05,
        color: '#06f',
      });
      const box = new Mesh(boxGeometry, boxMaterial);
      box.castShadow = true;
      mainModel = box;
      scene.add(box);

      // 创建击打声音
      const hitSound = new Audio('/public/hit.mp3');
      hitSound.volume = 0.1;

      // 创建盒子形状
      const _boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
      // 创建盒子
      const _boxBody = new CANNON.Body({
        shape: _boxShape,
        material: _boxMaterial,
        position: new CANNON.Vec3(0, 0, 0), // 盒子位置
        mass: 1, // 盒子质量
      });
      // 监听盒子碰撞
      _boxBody.addEventListener('collide', (e: any) => {
        const getImpactVelocityAlongNormal = e.contact.getImpactVelocityAlongNormal();
        // 判断冲击速度，如果 > 5播放一段碰撞的声音
        if (getImpactVelocityAlongNormal > 2) {
          hitSound.currentTime = 0;
          hitSound.volume = getImpactVelocityAlongNormal / 50;
          hitSound.play();
        }
      });
      // 将盒子添加到物理世界中
      _world.addBody(_boxBody);
      _boxBody.applyLocalForce(new CANNON.Vec3(0, 200, 0), new CANNON.Vec3(0, 0, 0));

      boxList.push({
        box,
        physicalBoxBody: _boxBody,
      });
    };
    generateBox();

    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      // 更新物理世界中的物体的运动轨迹
      _world.step(1 / 60);
      boxList.forEach((item) => {
        // 将物理世界的物体的运动轨迹同步到主世界中
        item.box.position.copy(item.physicalBoxBody.position);
        item.box.quaternion.copy(item.physicalBoxBody.quaternion);
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    window.addEventListener('click', () => {
      generateBox();
    });
  };

  const initGUI = () => {
    // GUI
    const gui = new GUI();
    if (mainModel) {
      const mainModelFolder = gui.addFolder('Main Model');
      mainModelFolder.add(mainModel.position, 'x').step(0.01).name('主模型 position x');
      mainModelFolder.add(mainModel.position, 'y').step(0.01).name('主模型 position y');
      mainModelFolder.add(mainModel.position, 'z').step(0.01).name('主模型 position z');
      mainModelFolder.add(mainModel.rotation, 'x').step(0.01).name('主模型 rotation x');
      mainModelFolder.add(mainModel.rotation, 'y').step(0.01).name('主模型 rotation y');
      mainModelFolder.add(mainModel.rotation, 'z').step(0.01).name('主模型 rotation z');
      mainModelFolder
        .addColor(
          {
            color: '#06f',
          },
          'color'
        )
        .onChange((value) => {
          mainModel?.material.color.set(value);
        });
      mainModelFolder.add(mainModel, 'visible').name('是否显示');
      mainModelFolder.add(mainModel.material, 'wireframe').name('显示网格线');
    }
  };

  const handleWindowResize = () => {
    if (!renderer || !camera) {
      console.error('检测到变量未初始化');
      return;
    }

    // 更新渲染器宽高
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
  };

  init();
  initGUI();
  window.addEventListener('resize', handleWindowResize);
};

initData();
