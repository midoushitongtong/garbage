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
  ShaderMaterial,
  RawShaderMaterial,
  Clock,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库
import basicVertexShader from '/public/shader/basic/vertex.glsl';
import basicFragmentShader from '/public/shader/basic/fragment.glsl';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<PlaneGeometry, ShaderMaterial, Object3DEventMap> | undefined;

  const init = () => {
    renderer = new WebGLRenderer();

    // 初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高
    renderer.setPixelRatio(window.devicePixelRatio * 1); // 设备像素和页面像素比例
    renderer.shadowMap.enabled = true; // 开启投影
    document.body.appendChild(renderer.domElement);

    // 初始化相机
    camera = new PerspectiveCamera(
      50, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000 // 远平面
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(1, 2, 5); // 设置相机位置

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

    // 地面
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

    // 加载纹理
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('/public/texture/colors.png');

    // 平面
    const planGeometry = new PlaneGeometry(1, 1, 64, 64);
    // 原始着色器材质
    const rawShaderMaterial = new RawShaderMaterial({
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader,
      side: DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uTexture: {
          value: texture,
        },
      },
    });
    // 着色器材质
    const shaderMaterial = new ShaderMaterial({
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader,
      side: DoubleSide,
    });
    const mesh = new Mesh(planGeometry, rawShaderMaterial);
    mesh.position.y = 1;
    mesh.castShadow = true;
    mainModel = mesh;
    scene.add(mesh);

    const clock = new Clock();
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const elpasedTime = clock.getElapsedTime();
      rawShaderMaterial.uniforms.uTime.value = elpasedTime;

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
