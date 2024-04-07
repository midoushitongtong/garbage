import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Mesh,
  AxesHelper,
  BoxGeometry,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  MeshBasicMaterial,
  SphereGeometry,
  PlaneGeometry,
  BackSide,
  DoubleSide,
  FrontSide,
  Vector2,
  Object3DEventMap,
  SpotLight,
  PointLight,
  Clock,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库

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
    renderer.shadowMap.enabled = true; // 开启影音
    document.body.appendChild(renderer.domElement);

    // 初始化相机
    camera = new PerspectiveCamera(
      100, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000 // 远平面
    );
    camera.position.set(3, 2, 2); // 设置相机位置
    camera.lookAt(0, 0, 0);

    // 初始化轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼

    // 初始化场景
    scene = new Scene();
    scene.background = new Color('#191919'); // 设置场景背景色

    // 坐标辅助器
    const axesHelper = new AxesHelper(5);
    scene?.add(axesHelper);
  };

  const directionalLight = new DirectionalLight('#ffffff', 2.5); // 平行光
  const spotLight = new SpotLight('#ffffff', 100); // 聚光灯
  const pointLight = new PointLight('red', 100);

  // 小球
  const smallBall = new Mesh(
    new SphereGeometry(0.2, 32, 16),
    new MeshBasicMaterial({
      color: '#06f',
    })
  );

  const initModel = async () => {
    if (!scene) {
      console.error('检测到变量未初始化');
      return;
    }

    // 灯光
    const ambientLight = new AmbientLight('#ffffff', 1); // 环境光
    scene.add(ambientLight);

    // directionalLight.castShadow = true; // 投射阴影
    // directionalLight.position.set(0, 5, 10);
    // directionalLight.shadow.radius = 10;
    // directionalLight.shadow.mapSize = new Vector2(2048, 2048);
    // directionalLight.shadow.camera.near = 0.5;
    // directionalLight.shadow.camera.far = 500;
    // directionalLight.shadow.camera.top = 5;
    // directionalLight.shadow.camera.right = 5;
    // directionalLight.shadow.camera.bottom = -5;
    // directionalLight.shadow.camera.left = -5;
    // scene.add(directionalLight);

    // spotLight.position.set(0, 5, 5);
    // spotLight.castShadow = true;
    // spotLight.shadow.radius = 10;
    // spotLight.shadow.mapSize = new Vector2(2048, 2048);
    // spotLight.angle = Math.PI / 10;
    // scene.add(spotLight);

    // pointLight.castShadow = true;
    // pointLight.position.set(2, 2, 2);
    // pointLight.shadow.radius = 20;
    // pointLight.shadow.mapSize.set(1024, 1024);
    // scene.add(pointLight);

    // 球体
    const geometry = new SphereGeometry(1, 32, 16);
    const material = new MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.05,
      color: '#ffffff',
    });
    const mesh = new Mesh(geometry, material);
    mainModel = mesh;
    mesh.castShadow = true; // 投射阴影
    scene.add(mesh);

    const geometry2 = new SphereGeometry(1, 32, 16);
    const mesh2 = new Mesh(geometry2, material);
    mesh2.castShadow = true; // 投射阴影
    mesh2.position.x = 10;
    scene.add(mesh2);

    spotLight.target = mesh2;

    smallBall.position.set(-2, -0.8, 0);
    const pointLight2 = new PointLight('yellow', 5);
    pointLight2.castShadow = true;
    smallBall.castShadow = true;
    smallBall.add(pointLight2);
    scene.add(smallBall);

    // 创建平面
    const planeGeometry = new PlaneGeometry(50, 50);
    const planeMaterial = new MeshStandardMaterial({
      side: DoubleSide,
      color: '#fff',
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true; // 接收阴影
    scene.add(plane);

    /**
     * 设置阴影的条件
     * 1. 设置渲染器开启阴影 renderer.shadowMap.enabled = true;
     * 2. 设置光照投射阴影 directionalLight.castShadow = true;
     * 3. 设置物体投射阴影 sphere.castShadow = true;
     * 4. 设置物体接收阴影 plane.receiveShadow = true;
     */
  };

  const clock = new Clock();
  const animate = () => {
    const time = clock.getElapsedTime();
    if (!renderer || !camera || !controls || !scene) {
      console.error('检测到变量未初始化');
      return;
    }

    smallBall.position.x = Math.cos(time * 2) * 2;
    smallBall.position.z = Math.sin(time * 2) * 2;
    smallBall.position.y = 1 + Math.sin(time * 5);

    directionalLight.shadow.camera.updateProjectionMatrix();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  const initGUI = () => {
    // GUI
    const gui = new GUI();
    if (mainModel) {
      const lightFolder = gui.addFolder('light');
      lightFolder.add(pointLight.position, 'x').step(0.01).name('点光源 x');
      lightFolder.add(pointLight.position, 'y').step(0.01).name('点光源 y');
      lightFolder.add(pointLight.position, 'z').step(0.01).name('点光源 z');
      lightFolder.add(pointLight, 'decay').step(0.01).name('点光源 沿着光照距离的衰退量');
      lightFolder.add(pointLight, 'distance').step(0.01).name('点光源 光源照射的最大距离');
      lightFolder.add(spotLight.position, 'x').step(0.01).name('聚光灯 x');
      lightFolder.add(spotLight.position, 'y').step(0.01).name('聚光灯 y');
      lightFolder.add(spotLight.position, 'z').step(0.01).name('聚光灯 z');
      lightFolder.add(spotLight, 'angle').step(0.01).name('聚光灯 照射角度');
      lightFolder.add(spotLight, 'distance').step(0.01).name('聚光灯 照射距离');
      lightFolder.add(spotLight, 'decay').step(0.01).name('聚光灯 沿着光照距离的衰减量');
      lightFolder.add(spotLight, 'penumbra').step(0.01).name('聚光灯 聚光锥的半影衰减百分比');
      lightFolder.add(directionalLight.shadow.camera, 'near').step(0.5).name('平行光相机 near x');
      lightFolder.add(directionalLight.shadow.camera, 'far').step(0.5).name('平行光相机 near x');
      lightFolder.add(directionalLight.shadow.camera, 'top').step(0.5).name('平行光相机 top');
      lightFolder.add(directionalLight.shadow.camera, 'right').step(0.5).name('平行光相机 right');
      lightFolder.add(directionalLight.shadow.camera, 'bottom').step(0.5).name('平行光相机 bottom');
      lightFolder.add(directionalLight.shadow.camera, 'left').step(0.5).name('平行光相机 left');

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
      mainModelFolder
        .add(
          {
            custom: () => {
              anime({
                targets: mainModel?.position,
                x: 5,
                duration: 500,
                easing: 'linear',
                loop: -1,
                direction: 'alternate',
              });
            },
          },
          'custom'
        )
        .name('自定义事件');
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
  await initModel();
  initGUI();
  requestAnimationFrame(animate);
  window.addEventListener('resize', handleWindowResize);

  // window.addEventListener('dblclick', () => {
  //   if (!document.fullscreenElement) {
  //     renderer?.domElement.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  // });
};

initData();
