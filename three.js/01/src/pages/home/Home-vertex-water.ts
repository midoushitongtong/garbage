import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Mesh,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  DoubleSide,
  ShaderMaterial,
  Clock,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;

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
    camera.position.set(0, 1, 1); // 设置相机位置

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
    const floorParams = {
      uWaresFrequency: 25.0,
      uScale: 0.065,
      uXZScale: 1.0,
      uNoiseFrequency: 15.0,
      uNoiseScale: 1.0,
      uLowColor: '#ff0000',
      uHighColor: '#ffff00',
      uXSpeed: 1.0,
      uZSpeed: 1.0,
      uNoiseSpeed: 1.0,
      uOpacity: 1.0,
    };
    const floorGeometry = new PlaneGeometry(1, 1, 1024, 1024);
    const floorMaterial = new ShaderMaterial({
      vertexShader: `
        precision lowp float;

        uniform float uWaresFrequency;
        uniform float uScale;
        uniform float uXZScale;
        uniform float uNoiseFrequency;
        uniform float uNoiseScale;
        uniform float uTime;
        varying float vElevation;
        uniform float uXSpeed;
        uniform float uZSpeed;
        uniform float uNoiseSpeed;

        vec2 fade(vec2 t) {
          return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        vec4 permute(vec4 x) {
          return mod((34.0 * x + 1.0) * x, 289.0);
        }

        float cnoise(vec2 P){
          vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
          vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
          Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
          vec4 ix = Pi.xzxz;
          vec4 iy = Pi.yyww;
          vec4 fx = Pf.xzxz;
          vec4 fy = Pf.yyww;
          vec4 i = permute(permute(ix) + iy);
          vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
          vec4 gy = abs(gx) - 0.5;
          vec4 tx = floor(gx + 0.5);
          gx = gx - tx;
          vec2 g00 = vec2(gx.x,gy.x);
          vec2 g10 = vec2(gx.y,gy.y);
          vec2 g01 = vec2(gx.z,gy.z);
          vec2 g11 = vec2(gx.w,gy.w);
          vec4 norm = 1.79284291400159 - 0.85373472095314 * 
            vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
          g00 *= norm.x;
          g01 *= norm.y;
          g10 *= norm.z;
          g11 *= norm.w;
          float n00 = dot(g00, vec2(fx.x, fy.x));
          float n10 = dot(g10, vec2(fx.y, fy.y));
          float n01 = dot(g01, vec2(fx.z, fy.z));
          float n11 = dot(g11, vec2(fx.w, fy.w));
          vec2 fade_xy = fade(Pf.xy);
          vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
          float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
          return 2.3 * n_xy;
        }

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          // 设置波浪频率
          float elevation = sin(modelPosition.x * uWaresFrequency * uXZScale * uXSpeed) * sin(modelPosition.z * uWaresFrequency * uXZScale * uZSpeed);
          elevation += -abs(cnoise(vec2(modelPosition.x * uNoiseFrequency, modelPosition.y * uNoiseFrequency) + uTime * uNoiseSpeed)) * uNoiseScale;
          elevation += -abs(cnoise(vec2(modelPosition.z * uNoiseFrequency, modelPosition.y * uNoiseFrequency) + uTime * uNoiseSpeed)) * uNoiseScale;
          // 设置波浪大小
          elevation *= uScale;
          // 设置y轴以展示波浪效果
          modelPosition.y += elevation;

          // 分享数据到 fragment shader
          vElevation = elevation;
 
          // 将顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,
      fragmentShader: `
        varying float vElevation;
        uniform vec3 uLowColor;
        uniform vec3 uHighColor;
        uniform float uOpacity;
        
        void main() {
          // 设置透明度
          float opacity = (vElevation + 1.0) / 1.3;
          
          vec3 color = mix(uLowColor, uHighColor, opacity);

          gl_FragColor = vec4(color, uOpacity);
        }
      `,
      side: DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uWaresFrequency: {
          value: floorParams.uWaresFrequency,
        },
        uScale: {
          value: floorParams.uScale,
        },
        uXZScale: {
          value: floorParams.uXZScale,
        },
        uNoiseFrequency: {
          value: floorParams.uNoiseFrequency,
        },
        uNoiseScale: {
          value: floorParams.uNoiseScale,
        },
        uLowColor: {
          value: new Color(floorParams.uLowColor),
        },
        uHighColor: {
          value: new Color(floorParams.uHighColor),
        },
        uXSpeed: {
          value: floorParams.uXSpeed,
        },
        uZSpeed: {
          value: floorParams.uZSpeed,
        },
        uNoiseSpeed: {
          value: floorParams.uNoiseSpeed,
        },
        uOpacity: {
          value: floorParams.uOpacity,
        },
      },
      transparent: true,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    const clock = new Clock();

    // animate
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      floorMaterial.uniforms.uTime.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // GUI
    const gui = new GUI();
    const floorParamsFolder = gui.addFolder('floorParams');
    floorParamsFolder
      .add(floorParams, 'uWaresFrequency')
      .min(1.0)
      .max(100.0)
      .step(0.1)
      .onChange((value) => {
        floorMaterial.uniforms.uWaresFrequency.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uScale')
      .min(0.0)
      .max(1.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uScale.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uXZScale')
      .min(0.0)
      .max(5.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uXZScale.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uNoiseFrequency')
      .min(0)
      .max(20.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uNoiseFrequency.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uNoiseScale')
      .min(0.0)
      .max(5.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uNoiseScale.value = value;
      });
    floorParamsFolder.addColor(floorParams, 'uLowColor').onChange((value) => {
      floorMaterial.uniforms.uLowColor.value = new Color(value);
    });
    floorParamsFolder.addColor(floorParams, 'uHighColor').onChange((value) => {
      floorMaterial.uniforms.uHighColor.value = new Color(value);
    });
    floorParamsFolder
      .add(floorParams, 'uXSpeed')
      .min(0.0)
      .max(5.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uXSpeed.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uZSpeed')
      .min(0.0)
      .max(5.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uZSpeed.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uNoiseSpeed')
      .min(0.0)
      .max(5.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uNoiseSpeed.value = value;
      });
    floorParamsFolder
      .add(floorParams, 'uOpacity')
      .min(0.0)
      .max(1.0)
      .step(0.01)
      .onChange((value) => {
        floorMaterial.uniforms.uOpacity.value = value;
      });
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
