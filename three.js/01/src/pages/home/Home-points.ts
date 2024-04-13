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
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  ShaderMaterial,
  TextureLoader,
  AdditiveBlending,
  Clock,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs/lib/anime.es.js'; // 导入动画库
import { PointToPointConstraint } from 'cannon-es';

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

    const params = {
      count: 1000,
      radius: 5,
      rotateScale: 0.3,
      branch: 5,
      centerColor: '#0066ff',
      endColor: '#f60',
    };

    // 贴图
    const textureLoader = new TextureLoader();
    const starTexture1 = textureLoader.load('/public/texture/star_01.png');
    const starTexture2 = textureLoader.load('/public/texture/magic_01.png');
    const starTexture3 = textureLoader.load('/public/texture/star_03.png');
    // 点的材质
    const pointsMaterial = new ShaderMaterial({
      uniforms: {
        uStarTexture1: {
          value: starTexture1,
        },
        uStarTexture2: {
          value: starTexture2,
        },
        uStarTexture3: {
          value: starTexture3,
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: `
        attribute float imageIndex;
        attribute float scale;
        attribute vec3 myColor;
        varying vec2 vUV;
        varying float vImageIndex;
        varying vec3 vMyColor;
        uniform float uTime;

        void main() {
          vMyColor = myColor;
          vUV = uv;
          vImageIndex = imageIndex;

          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // 点的角度
          float angle = atan(modelPosition.x, modelPosition.z);
          float distanceToCenter = length(modelPosition.xz);
          float angleOffset = 1.0 / distanceToCenter * uTime;
          angle += angleOffset;
          modelPosition.x = cos(angle) * distanceToCenter;
          modelPosition.z = sin(angle) * distanceToCenter;

          // 将各个顶点变换到裁剪空间
          vec4 viewPosition = viewMatrix * modelPosition;
          gl_Position = projectionMatrix * viewPosition;

          // 设置点大小
          gl_PointSize = 100.0 / -viewPosition.z * scale;
        }
       `,
      fragmentShader: `
         varying vec2 vUV;
         uniform sampler2D uStarTexture1;
         uniform sampler2D uStarTexture2;
         uniform sampler2D uStarTexture3;
         varying float vImageIndex;
         varying vec3 vMyColor;

         void main() {
           vec4 startTextureColor;
           if (vImageIndex == 0.0) {
             startTextureColor = texture2D(uStarTexture1, gl_PointCoord);
           } else if (vImageIndex == 1.0) {
             startTextureColor = texture2D(uStarTexture2, gl_PointCoord);
           } else {
             startTextureColor = texture2D(uStarTexture3, gl_PointCoord);
           }
           gl_FragColor = vec4(vMyColor, startTextureColor.r);
         }
       `,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    });

    const generateGalaxy = () => {
      // 几何体
      const bufferGeometry = new BufferGeometry();
      // 生成随机位置
      const positions = new Float32Array(params.count * 3);
      const colors = new Float32Array(params.count * 3);
      const imageIndex = new Float32Array(params.count);
      const scales = new Float32Array(params.count);
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

        imageIndex[i] = i % 3;
        scales[i] = Math.random();
      }
      // 设置位置
      bufferGeometry.setAttribute('position', new BufferAttribute(positions, 3));
      bufferGeometry.setAttribute('myColor', new BufferAttribute(colors, 3));
      bufferGeometry.setAttribute('imageIndex', new BufferAttribute(imageIndex, 1));
      bufferGeometry.setAttribute('scale', new BufferAttribute(scales, 1));

      // 点
      const points = new Points(bufferGeometry, pointsMaterial);
      scene?.add(points);
    };

    generateGalaxy();

    const clock = new Clock();
    // animate
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      pointsMaterial.uniforms.uTime.value = clock.getElapsedTime();

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
};

initData();
