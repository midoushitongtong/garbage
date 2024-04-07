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
  PointsMaterial,
  Points,
  TextureLoader,
  BufferGeometry,
  BufferAttribute,
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
  let mainModel: Points<SphereGeometry, PointsMaterial, Object3DEventMap> | undefined;

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
    camera.position.set(0, 3, 6); // 设置相机位置

    // 初始化轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼

    // 初始化场景
    scene = new Scene();
    scene.background = new Color('#191919'); // 设置场景背景色

    // 坐标辅助器
    const axesHelper = new AxesHelper(5);
    scene?.add(axesHelper);

    // 灯光
    const ambientLight = new AmbientLight('#ffffff', 2); // 环境光
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight('#ffffff', 2); // 平行光
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 5, 10);
    scene.add(directionalLight);

    // 平面
    // const planeGeometry = new PlaneGeometry(10, 10);
    // const planeMaterial = new MeshStandardMaterial({
    //   color: '#ffffff',
    //   side: DoubleSide,
    // });
    // const planeMesh = new Mesh(planeGeometry, planeMaterial);
    // planeMesh.rotation.x = -Math.PI / 2;
    // planeMesh.receiveShadow = true;
    // scene.add(planeMesh);

    const params = {
      count: 10000,
      size: 0.1,
      radius: 5,
      rotateScale: 0.3,
      branch: 6,
      centerColor: '#0066ff',
      endColor: '#ffffff',
    };

    const generateGalaxy = () => {
      // 几何体
      const bufferGeometry = new BufferGeometry();
      // 生成随机位置
      const positions = new Float32Array(params.count * 3);
      const colors = new Float32Array(params.count * 3);
      for (let i = 0; i < params.count; i++) {
        const distance = Math.random() * params.radius * Math.pow(Math.random(), 3); // 点距离圆心的距离

        const randomX = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
        const randomY = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
        const randomZ = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;

        const angle = (i % params.branch) * ((2 * Math.PI) / params.branch);
        positions[i * 3] = Math.cos(angle + distance * params.rotateScale) * distance + randomX; // x
        positions[i * 3 + 1] = randomY; // y
        positions[i * 3 + 2] = Math.sin(angle + distance * params.rotateScale) * distance + randomZ; // x

        const centerColor = new Color(params.centerColor);
        const endColor = new Color(params.endColor);
        const mixColor = centerColor.clone().lerp(endColor, distance / params.radius);
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }
      // 设置位置
      bufferGeometry.setAttribute('position', new BufferAttribute(positions, 3));
      bufferGeometry.setAttribute('color', new BufferAttribute(colors, 3));
      // 贴图
      const textureLoader = new TextureLoader();
      const startTexture = textureLoader.load('/public/texture/star_01.png');
      // 材质
      const pointsMaterial = new PointsMaterial({
        size: params.size, // 点大小
        sizeAttenuation: true, // 点大小是否因相机深度而衰减
        map: startTexture,
        alphaMap: startTexture,
        transparent: true,
        alphaTest: 0.5, // 透明度
        vertexColors: true, // 是否开启顶点着色
      });
      // 点
      const points = new Points(bufferGeometry, pointsMaterial);
      scene?.add(points);
    };

    generateGalaxy();

    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

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
      // mainModelFolder.add(mainModel.material, 'wireframe').name('显示网格线');
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
  initGUI();
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
