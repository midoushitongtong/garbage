import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  ACESFilmicToneMapping,
  TextureLoader,
  Clock,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { EffectComposer, GLTF, GLTFLoader, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;

  const init = async () => {
    // 初始化渲染器
    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高
    renderer.setPixelRatio(window.devicePixelRatio * 1); // 设备像素和页面像素比例
    renderer.shadowMap.enabled = true; // 开启投影
    renderer.toneMapping = ACESFilmicToneMapping;
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
    const directionalLight = new DirectionalLight('#ffffff', 50); // 平行光
    directionalLight.castShadow = true;
    directionalLight.position.set(0, 5, 0);
    scene.add(directionalLight);

    // 汽车模型
    const gltfLoader = new GLTFLoader();
    const carGLTF = await new Promise<GLTF>((resolve) => {
      gltfLoader.load('/public/model/cyberpunk_car.glb', (gltf) => {
        resolve(gltf);
      });
    });
    const car = carGLTF.scene.clone();
    car.scale.set(0.01, 0.01, 0.01);
    car.rotation.set(0, Math.PI / 2, 0);
    scene.add(car);

    // 创建效果合成器，用于处理后期效果
    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(window.innerWidth, window.innerHeight);
    // 添加渲染通道
    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    // // 添加点效果
    // const dotScreenPass = new DotScreenPass();
    // effectComposer.addPass(dotScreenPass);

    // // 添加抗锯齿效果
    // const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
    // effectComposer.addPass(smaaPass);

    // 添加光晕效果
    // const unrealBloomPass = new UnrealBloomPass(
    //   new Vector2(window.innerWidth, window.innerHeight),
    //   0.1,
    //   0.25,
    //   1
    // );
    // effectComposer.addPass(unrealBloomPass);

    // 自定义着色器通道
    // const color = {
    //   r: 0.0,
    //   g: 0.0,
    //   b: 0.0,
    // };
    // const shaderPass = new ShaderPass({
    //   uniforms: {
    //     tDiffuse: {
    //       value: null,
    //     },
    //     uColor: {
    //       value: {
    //         x: color.r,
    //         y: color.g,
    //         z: color.b,
    //       },
    //     },
    //   },
    //   vertexShader: `
    //     varying vec2 vUV;

    //     void main() {
    //       vUV = uv;

    //       gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    //     }
    //   `,
    //   fragmentShader: `
    //     varying vec2 vUV;
    //     uniform sampler2D tDiffuse;
    //     uniform vec3 uColor;

    //     void main() {
    //       vec4 color = texture2D(tDiffuse, vUV);

    //       color.xyz += uColor;

    //       gl_FragColor = color;
    //     }
    //   `,
    // });
    // effectComposer.addPass(shaderPass);

    // 自定义着色器通道
    const textureLoader = new TextureLoader();
    const chainTexture = textureLoader.load(
      '/public/texture/chain/ChainmailCopperRoundedThin001_NRM_2K_METALNESS.jpg'
    );
    const shaderPass = new ShaderPass({
      uniforms: {
        tDiffuse: {
          value: 0,
        },
        uChainTextureMap: {
          value: chainTexture,
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: `
        varying vec2 vUV;

        void main() {
          vUV = uv;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUV;
        uniform sampler2D uChainTextureMap;
        uniform sampler2D tDiffuse;
        uniform float uTime;

        void main() {
          vec2 newUV = vUV;
          newUV += sin(newUV.x * 10.0 * uTime) * 0.05 ;
          vec4 color = texture2D(tDiffuse, newUV);  
          vec4 mapColor = texture2D(uChainTextureMap, newUV);
          vec3 lightDirection = normalize(vec3(-5, 5, 0));
          float lightness = clamp(dot(mapColor.xyz, lightDirection), 0.0, 1.0);
          color.xyz += lightness;
          gl_FragColor = color;
        }
      `,
    });
    effectComposer.addPass(shaderPass);

    // animate
    const clock = new Clock();
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const elapsedTime = clock.getElapsedTime();
      shaderPass.uniforms.uTime.value = elapsedTime;

      controls.update();
      renderer.render(scene, camera);
      // 使用效果合成器渲染场景
      effectComposer.render();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // GUI
    const gui = new GUI();
    // gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.01);
    // gui.add(unrealBloomPass, 'radius').min(0).max(1).step(0.01);
    // gui.add(unrealBloomPass, 'strength').min(0).max(1).step(0.01);
    // gui.add(renderer, 'toneMappingExposure').min(0).max(1).step(0.01);
    // gui
    //   .add(color, 'r')
    //   .min(0)
    //   .max(1)
    //   .step(0.01)
    //   .onChange((value) => {
    //     shaderPass.uniforms.uColor.value.x = value;
    //   });
    // gui
    //   .add(color, 'g')
    //   .min(0)
    //   .max(1)
    //   .step(0.01)
    //   .onChange((value) => {
    //     shaderPass.uniforms.uColor.value.y = value;
    //   });
    // gui
    //   .add(color, 'b')
    //   .min(0)
    //   .max(1)
    //   .step(0.01)
    //   .onChange((value) => {
    //     shaderPass.uniforms.uColor.value.z = value;
    //   });
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
