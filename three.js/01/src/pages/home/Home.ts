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
  Vector2,
  TextureLoader,
  DataTexture,
  EquirectangularReflectionMapping,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库
// 导入 water
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { GLTF, GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap> | undefined;

  const init = async () => {
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
    camera.position.set(0, 2, 5); // 设置相机位置

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
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);

    // 背景
    const rgbeLoader = new RGBELoader();
    const floorTexture = await new Promise<DataTexture>((resolve) => {
      rgbeLoader.load('/public/texture/limpopo_golf_course_2k.hdr', resolve);
    });
    floorTexture.mapping = EquirectangularReflectionMapping;
    scene.background = floorTexture;
    scene.environment = floorTexture;

    // 鱼缸模型
    const gltfLoader = new GLTFLoader();
    const yuGangGLTF = await new Promise<GLTF>((resolve) => {
      gltfLoader.load('/public/model/yu-gang.glb', (gltf) => {
        // 设置双面材质
        // @ts-ignore
        gltf.scene.children[0].material.side = DoubleSide;
        resolve(gltf);
      });
    });
    scene.add(yuGangGLTF.scene);

    // 添加鱼缸的水面材质
    const textureLoader = new TextureLoader();
    const water = new Water(
      // @ts-ignore
      yuGangGLTF.scene.children[1].geometry,
      {
        color: '#e1e1e1',
        scale: 1.0,
        flowDirection: new Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024,
        normalMap0: textureLoader.load('/public/texture/Water_1_M_Normal.jpg'),
        normalMap1: textureLoader.load('/public/texture/Water_2_M_Normal.jpg'),
      }
    );
    water.position.set(0, -0.2, 0);
    scene.add(water);

    // animate
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
