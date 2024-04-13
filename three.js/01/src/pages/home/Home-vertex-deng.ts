import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Mesh,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  Object3DEventMap,
  PlaneGeometry,
  DoubleSide,
  ShaderMaterial,
  Clock,
  EquirectangularReflectionMapping,
  DataTexture,
  ACESFilmicToneMapping,
  Group,
  Vector3,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库
import { GLTF, GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<PlaneGeometry, ShaderMaterial, Object3DEventMap> | undefined;

  const init = async () => {
    renderer = new WebGLRenderer();

    // 初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高
    renderer.setPixelRatio(window.devicePixelRatio * 1); // 设备像素和页面像素比例
    renderer.shadowMap.enabled = true; // 开启投影
    renderer.toneMapping = ACESFilmicToneMapping; // 电影色调
    document.body.appendChild(renderer.domElement);

    // 初始化相机
    camera = new PerspectiveCamera(
      100, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      2000 // 远平面
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(0, 0, 5); // 设置相机位置

    // 初始化轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼
    controls.autoRotateSpeed = 0.1;
    controls.autoRotate = true;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = Math.PI / 1.5;

    // 初始化场景
    scene = new Scene();
    scene.background = new Color('#191919'); // 设置场景背景色

    // 坐标辅助器
    // const axesHelper = new AxesHelper(5);
    // scene?.add(axesHelper);

    // 灯光
    const ambientLight = new AmbientLight('#ffffff', 2); // 环境光
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight('#ffffff', 2); // 平行光
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 5, 10);
    scene.add(directionalLight);

    // 加载背景
    const rgbeLoader = new RGBELoader();
    const farmTexture = await new Promise<DataTexture>((resolve) => {
      rgbeLoader.load('/public/texture/farm_sunset_2k.hdr', resolve);
    });
    farmTexture.mapping = EquirectangularReflectionMapping;
    scene.background = farmTexture;
    scene.environment = farmTexture;

    renderer.toneMapping = ACESFilmicToneMapping;

    // 着色器材质
    const shaderMaterial = new ShaderMaterial({
      vertexShader: `
        precision lowp float;
        uniform float uTime;
        varying vec2 vUV;
        varying vec3 vPosition;

        void main() {
          vUV = uv;
          vPosition = position;
          
          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision lowp float;
        varying vec2 vUV;
        varying vec4 vModelPosition;
        varying vec3 vPosition;
        
        void main() {
          vec4 redColor = vec4(1.0, 0.5, 0.0, 1.0);
          vec4 yellowColor = vec4(1.0, 1.0, 0.0, 1.0);
          vec4 mixColor = mix(yellowColor, redColor, vPosition.y + 0.9);
         
          if (gl_FrontFacing) {
            gl_FragColor = vec4(mixColor.x - 0.05, mixColor.y - 0.05, mixColor.z - 0.05, 1.0);
          } else {
            gl_FragColor = vec4(mixColor.x + 0.05, mixColor.y + 0.05, mixColor.z + 0.05, 1.0);
          }
        }
      `,
      side: DoubleSide,
      toneMapped: false,
      uniforms: {
        uTime: {
          value: 0,
        },
      },
    });

    // 加载模型
    const gltfLoader = new GLTFLoader();
    const dengGltf = await new Promise<GLTF>((resolve) => {
      gltfLoader.load('/public/model/deng.glb', (gltf) => {
        gltf.scene.traverse((item) => {
          // 设置模型材质
          // @ts-ignore
          item.material = shaderMaterial;
        });
        resolve(gltf);
      });
    });

    // 模型列表
    const list: Group<Object3DEventMap>[] = [];

    for (let i = 0; i < 150; i++) {
      const model = dengGltf.scene.clone();
      const position = new Vector3(
        Math.random() * 300 - 150,
        Math.random() * 60,
        Math.random() * 300 - 150
      );
      model.position.copy(position);
      model.scale.set(1.65, 1.65, 1.65);
      list.push(model);
      anime({
        targets: model.rotation,
        y: 2 * Math.PI,
        duration: (15 + Math.random() * 5) * 1000,
        easing: 'linear',
        loop: true,
      });
      const updatePosition = () => {
        anime({
          targets: model.position,
          x: model.position.x + 1,
          y: Math.random() > 0.3 ? model.position.y + 1 : model.position.y - 0.5,
          duration: 1000,
          easing: 'linear',
          complete: updatePosition,
        });
      };
      updatePosition();
      scene.add(model);
    }

    const clock = new Clock();
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const elpasedTime = clock.getElapsedTime();
      shaderMaterial.uniforms.uTime.value = elpasedTime;

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
