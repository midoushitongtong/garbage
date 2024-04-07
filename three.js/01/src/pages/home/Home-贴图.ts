import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  BoxGeometry,
  Mesh,
  AxesHelper,
  TextureLoader,
  SRGBColorSpace,
  Texture,
  PlaneGeometry,
  DoubleSide,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  LoadingManager,
  CubeTextureLoader,
  SphereGeometry,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  MeshBasicMaterial,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库
import { EXRLoader, RGBELoader, RGBMLoader } from 'three/examples/jsm/Addons.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh | undefined;

  const init = () => {
    renderer = new WebGLRenderer();

    // 初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高
    renderer.setPixelRatio(window.devicePixelRatio * 1); // 设备像素和页面像素比例
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
    scene.background = new Color('#191919'); // 设置场景背景色

    // 坐标辅助器
    const axesHelper = new AxesHelper(5);
    scene?.add(axesHelper);
  };

  const initModel = async () => {
    if (!scene) {
      console.error('检测到变量未初始化');
      return;
    }

    // // 创建几何体
    // for (let i = 0; i < 50; i++) {
    //   const geometry = new BufferGeometry();
    //   const vertices = new Float32Array(9);
    //   for (let j = 0; j < 9; j++) {
    //     vertices[j] = Math.random() * 5;

    //     geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    //     // 创建材质
    //     const color = new Color(Math.random(), Math.random(), Math.random());
    //     const material = new MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
    //     // 创建网格
    //     const model = new Mesh(geometry, material);

    //     mainModel = model;

    //     anime({
    //       targets: mainModel?.rotation,
    //       y: Math.PI * 2,
    //       easing: 'linear',
    //       duration: 2000,
    //       loop: true,
    //     });

    //     // 将网格添加到场景中
    //     scene.add(model);
    //   }
    // }

    // ==================================================

    // const geometry = new CircleGeometry(5, 32);
    // const material = new MeshBasicMaterial({ color: '#06f' });
    // material.wireframe = true;
    // const mesh = new Mesh(geometry, material);
    // scene.add(mesh);
    // mainModel = mesh;
    // 将几何体添加到场景中
    // scene.add(mesh);

    // const a1 = anime({
    //   targets: mainModel.position,
    //   x: 5, // 到达的位置
    //   easing: 'linear', // 动画效果
    //   direction: 'alternate', // 来回运动 (到达结束位置的时候返回到开始位置)
    //   duration: 1000, // 运动时长
    //   // delay: 1000, // 延迟
    //   loop: -1, // 是否重复
    //   // change: (e) => {
    //   //   console.log(mainModel?.position.x);
    //   // },
    //   begin: () => {
    //     console.log('动画开始');
    //   },
    //   complete: () => {
    //     console.log('动画结束');
    //   },
    // });

    // window.addEventListener('click', () => {
    //   if (a1.paused) {
    //     a1.play();
    //   } else {
    //     a1.pause();
    //   }
    // });

    // ==================================================

    // 导入纹理
    // const textureLoader = new TextureLoader();
    // const doorColorTexture = await new Promise<Texture>((resolve) => {
    //   textureLoader.load('/public/texture/door/color.jpg', resolve);
    // });
    // doorColorTexture.colorSpace = SRGBColorSpace;
    // doorColorTexture.offset = new Vector2(0.5, 0.5);
    // doorColorTexture.rotation = Math.PI / 2;
    // doorColorTexture.center = new Vector2(0.5, 0.5);
    // doorColorTexture.repeat.set(3, 3);
    // doorColorTexture.wrapS = RepeatWrapping;
    // doorColorTexture.wrapT = RepeatWrapping;

    // 创建几何体
    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshBasicMaterial({ map: doorColorTexture });
    // const mesh = new Mesh(geometry, material);
    // mainModel = mesh;

    // 将几何体添加到场景中
    // scene.add(mesh);

    // ==================================================

    // const textLoader = new TextureLoader();
    // const texture = await new Promise<Texture>((resolve) =>
    //   textLoader.load('/public/texture/minecraft.png', resolve)
    // );
    // texture.colorSpace = SRGBColorSpace;
    // // texture.minFilter = NearestFilter;
    // // texture.magFilter = NearestFilter;

    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshBasicMaterial({ map: texture });
    // const mesh = new Mesh(geometry, material);
    // scene.add(mesh);
    // mainModel = mesh;

    // ==================================================

    // const loadingManager = new LoadingManager();
    // loadingManager.itemEnd = (url) => {
    //   console.log(`资源加载完成: ${url}`);
    // };
    // const textureLoader = new TextureLoader(loadingManager);
    // const doorColorTexure = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/color.jpg', resolve)
    // );
    // doorColorTexure.colorSpace = SRGBColorSpace;
    // const doorAlphaTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/alpha.jpg', resolve)
    // );
    // const doorAOTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/ambientOcclusion.jpg', resolve)
    // );
    // const doorHeighTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/height.jpg', resolve)
    // );
    // const doorRoughnessTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/roughness.jpg', resolve)
    // );
    // const doorMatalnessTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/metalness.jpg', resolve)
    // );
    // const doorNormalTexture = await new Promise<Texture>((resolve) =>
    //   textureLoader.load('/public/texture/door/normal.jpg', resolve)
    // );

    // // 环境光
    // const ambientLight = new AmbientLight('#ffffff', 2.5);
    // scene.add(ambientLight);
    // const directionalLight = new DirectionalLight('#ffffff', 2.5);
    // // 平行光
    // directionalLight.position.set(0, 0, 10);
    // scene.add(directionalLight);

    // // ppr 标准材质
    // const material = new MeshStandardMaterial({
    //   map: doorColorTexure, // 贴图
    //   alphaMap: doorAlphaTexture, // 透明贴图
    //   transparent: true, // 启用透明 (让透明贴图生效)
    //   side: DoubleSide, // 前后两面都渲染 (默认只渲染前面, 不渲染后面)
    //   aoMap: doorAOTexture, // 环境遮挡贴图
    //   aoMapIntensity: 1, // 环境遮挡贴图影响程度
    //   displacementMap: doorHeighTexture, // 位移贴图
    //   displacementScale: 0.1, // 位移贴图影响程度
    //   roughness: 1,
    //   roughnessMap: doorRoughnessTexture, // 粗糙贴图
    //   metalness: 1,
    //   metalnessMap: doorMatalnessTexture, // 金属贴图
    //   normalMap: doorNormalTexture, // 法线贴图
    // });

    // const geometry = new BoxGeometry(1, 1, 1);
    // const mesh = new Mesh(geometry, material);
    // scene.add(mesh);
    // mainModel = mesh;

    // const planeGeometry = new PlaneGeometry(1, 1, 100, 100);
    // const planeMesh = new Mesh(planeGeometry, material);
    // planeMesh.position.set(1.5, 0, 0);
    // scene.add(planeMesh);

    // ==================================================

    const cubeTextureLoader = new CubeTextureLoader();
    const cubeTexture = cubeTextureLoader.load([
      '/public/texture/env/px.jpg',
      '/public/texture/env/nx.jpg',
      '/public/texture/env/py.jpg',
      '/public/texture/env/ny.jpg',
      '/public/texture/env/pz.jpg',
      '/public/texture/env/nz.jpg',
    ]);
    cubeTexture.colorSpace = SRGBColorSpace;
    const geometry = new SphereGeometry(1, 32, 16);
    const material = new MeshStandardMaterial({
      metalness: 1,
      roughness: 0.05,
      envMap: cubeTexture,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    mainModel = mesh;

    const ambientLight = new AmbientLight('#ffffff', 2.5);
    scene.add(ambientLight);
    // 平行光
    const directionalLight = new DirectionalLight('#fffff', 2.5);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    scene.background = cubeTexture; // 给场景添加背景
    scene.environment = cubeTexture; // 给场景内所有的物体添加默认的环境贴图

    // const rgbeLoader = new EXRLoader();
    // rgbeLoader.load('/public/texture/HdrOutdoorFieldDayOvercast004_HDR_2K.exr', (texture) => {
    //   texture.mapping = EquirectangularReflectionMapping;
    //   texture.colorSpace = SRGBColorSpace;
    //   scene.background = texture;
    // });
    // const loader = new TextureLoader();
    // loader.load('/public/texture/HdrOutdoorFieldDayOvercast004_JPG_2K.jpg', (t) => {
    //   t.mapping = EquirectangularReflectionMapping;
    //   t.colorSpace = SRGBColorSpace;
    //   scene.background = t;
    // });
    // const rgbeLoader = new RGBELoader();
    // const texture = rgbeLoader.load('/public/texture/farm_sunset_2k.hdr', (texture) => {
    //   texture.mapping = EquirectangularReflectionMapping;
    //   scene.background = texture;
    //   scene.environment = texture;

    //   const geometry = new SphereGeometry(1, 32, 16);
    //   const material = new MeshStandardMaterial({
    //     metalness: 1,
    //     roughness: 0.05,
    //   });
    //   const mesh = new Mesh(geometry, material);
    //   scene?.add(mesh);
    // });
  };

  // 时钟
  // const clock = new Clock();
  const animate = () => {
    if (!renderer || !camera || !controls || !scene) {
      console.error('检测到变量未初始化');
      return;
    }

    // 时钟运行的总时长
    // const time = clock.getElapsedTime();

    // 两次获取时间的间隔时长
    // const deltaTime = clock.getDelta();
    // console.log(deltaTime);
    // mainModel.position.x = clock.getElapsedTime() / 1;

    controls.update();
    renderer.render(scene, camera);
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
