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
  SphereGeometry,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import * as CANNON from 'cannon-es';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap> | undefined;

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

    // 小球
    const sphereGeometry = new SphereGeometry(1, 64, 32);
    const sphereMaterial = new MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.05,
      color: '#06f',
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    mainModel = sphere;
    scene.add(sphere);

    // 创建击打声音
    const hitSound = new Audio('/public/hit.mp3');
    hitSound.volume = 0.1;

    // 创建物理世界
    const _world = new CANNON.World();
    _world.gravity.set(0, -10, 0);

    // 创建小球形状
    const _sphereShape = new CANNON.Sphere(1);
    // 创建小球材质
    const _sphereMaterial = new CANNON.Material('sphere');
    // 创建小球
    const _sphereBody = new CANNON.Body({
      shape: _sphereShape,
      material: _sphereMaterial,
      position: new CANNON.Vec3(0, 0, 0), // 小球位置
      mass: 1, // 小球质量
    });
    // 监听小球碰撞
    _sphereBody.addEventListener('collide', (e: any) => {
      const getImpactVelocityAlongNormal = e.contact.getImpactVelocityAlongNormal();
      // 判断冲击速度，如果 > 5播放一段碰撞的声音
      if (getImpactVelocityAlongNormal > 5) {
        hitSound.play();
      }
    });
    // 将小球添加到物理世界中
    _world.addBody(_sphereBody);

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
    const _contactMaterial = new CANNON.ContactMaterial(_sphereMaterial, _floorMaterial, {
      friction: 0.6,
      restitution: 0.6,
    });
    _world.addContactMaterial(_contactMaterial);
    // 物理世界默认的关联材质
    _world.defaultContactMaterial = _contactMaterial;

    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      // 更新物理世界中的物体的运动轨迹
      _world.step(1 / 60);
      // 将物理世界的物体的运动轨迹同步到主世界中
      sphere.position.copy(_sphereBody.position);

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
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
