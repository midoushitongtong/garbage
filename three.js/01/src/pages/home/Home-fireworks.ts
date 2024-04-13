import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Mesh,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  PlaneGeometry,
  TextureLoader,
  Vector2,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  Points,
  Clock,
  AxesHelper,
  AudioLoader,
  Audio as Audio,
  AudioListener,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;

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
    camera.position.set(0, 3, 8); // 设置相机位置

    // 初始化轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼

    // 初始化场景
    scene = new Scene();
    scene.background = new Color('#6b6b6b'); // 设置场景背景色

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

    // 地面
    const floorGeometry = new PlaneGeometry(100, 100);
    const floorMaterial = new MeshStandardMaterial({
      color: '#999',
      side: DoubleSide,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.position.set(0, -0.01, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // 水面
    const textureLoader = new TextureLoader();
    const water = new Water(new PlaneGeometry(100, 100, 1024, 1024), {
      color: '#ffffff',
      scale: 5.0,
      flowDirection: new Vector2(1, 1),
      textureWidth: 1024,
      textureHeight: 1024,
      normalMap0: textureLoader.load('/public/texture/Water_1_M_Normal.jpg'),
      normalMap1: textureLoader.load('/public/texture/Water_2_M_Normal.jpg'),
    });
    water.rotation.set(-Math.PI / 2, 0, 0);
    scene.add(water);

    // 加载房子模型
    const gltfLoader = new GLTFLoader();
    const gltf = await new Promise<GLTF>((resolve) => {
      gltfLoader.load('/public/model/house_for_game_env.glb', (gltf) => {
        resolve(gltf);
      });
    });
    gltf.scene.position.set(0, 0.05, -10);
    scene.add(gltf.scene);

    // animate
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      fireworksList.forEach((item) => {
        item.update();
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // 创建烟花
    let fireworksList: FireWorks[] = [];
    const createFireworks = async () => {
      if (!camera || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
      const position = {
        x: (Math.random() - 0.5) * 20,
        y: Math.random() * 1 + 6,
        z: -Math.random() * 15,
      };

      const fireworks = new FireWorks();
      await fireworks.init(scene, camera, color, position);
      fireworks.onRemove(() => {
        fireworksList = fireworksList.filter((item) => item !== fireworks);
      });
      fireworksList.push(fireworks);
    };
    window.addEventListener('click', createFireworks);
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

class FireWorks {
  private fireworksGeometry?: BufferGeometry;
  private fireworksMaterial?: ShaderMaterial;
  private fireworksPoints?: Points;
  private clock?: Clock;
  private explodeFireworksGeometry?: BufferGeometry;
  private explodeFireworksMaterial?: ShaderMaterial;
  private explodeFireworksCount?: number;
  private explodeFireworksPoints?: Points;
  private scene?: Scene;
  private fireworksColor?: Color;
  private onRemoveCallbackFunctionList: (() => void)[] = [];
  private fireworksMusic1?: Audio;
  private fireworksMusic2?: Audio;
  private fireworksMusic1Played?: boolean;
  private fireworksMusic2Played?: boolean;

  init = async (
    scene: Scene,
    camera: PerspectiveCamera,
    color: string,
    to: {
      x: number;
      y: number;
      z: number;
    },
    from: { x: number; y: number; z: number } = {
      x: 0,
      y: 1.0,
      z: 0,
    }
  ) => {
    // 创建音频
    await new Promise<void>(async (resolve) => {
      const audioLoader = new AudioLoader();
      const audioListener = new AudioListener();
      await Promise.all([
        new Promise<void>((resolve) => {
          audioLoader.load('/public/fireworks-1.mp3', (audioBuffer) => {
            this.fireworksMusic1 = new Audio(audioListener);
            this.fireworksMusic1.setBuffer(audioBuffer);
            this.fireworksMusic1.setVolume(0.3);
            this.fireworksMusic1.setLoop(false);
            resolve();
          });
        }),
        new Promise<void>((resolve) => {
          audioLoader.load('/public/fireworks-2.mp3', (audioBuffer) => {
            this.fireworksMusic2 = new Audio(audioListener);
            this.fireworksMusic2.setBuffer(audioBuffer);
            this.fireworksMusic2.setVolume(0.3);
            this.fireworksMusic2.setLoop(false);
            resolve();
          });
        }),
      ]);
      resolve();
    });
    this.scene = scene;
    // 烟花颜色
    this.fireworksColor = new Color(color);
    // 创建计时器
    this.clock = new Clock();
    // 创建烟花
    this.fireworksPoints = this.createFireworks(to, from);
    scene.add(this.fireworksPoints);
    if (!this.fireworksMusic2Played && this.fireworksMusic2) {
      this.fireworksMusic2Played = true;
      this.fireworksMusic2.play();
    }
    // 创建爆炸烟花
    this.explodeFireworksPoints = this.createExplodeFireworks(to);
  };

  private createFireworks = (
    to: {
      x: number;
      y: number;
      z: number;
    },
    from: { x: number; y: number; z: number }
  ) => {
    // 烟花发射起点
    this.fireworksGeometry = new BufferGeometry();
    const startPosition = new Float32Array(3);
    startPosition[0] = from.x;
    startPosition[1] = from.y;
    startPosition[2] = from.z;
    this.fireworksGeometry.setAttribute('position', new BufferAttribute(startPosition, 3));

    // 烟花的发射路径
    const stepPosition = new Float32Array(3);
    stepPosition[0] = to.x - from.x;
    stepPosition[1] = to.y - from.y;
    stepPosition[2] = to.z - from.z;
    this.fireworksGeometry.setAttribute('aStepPosition', new BufferAttribute(stepPosition, 3));

    // 烟花材质
    this.fireworksMaterial = new ShaderMaterial({
      vertexShader: `
        attribute vec3 aStepPosition;
        uniform float uTime;
        uniform float uSize;

        void main() {
          // 模型矩阵
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // 更新烟花位置
          modelPosition.xyz += aStepPosition * uTime;

          // 视图矩阵
          vec4 viewPosition = viewMatrix * modelPosition;

          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewPosition;

          // 设置顶点大小
          gl_PointSize = uSize;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        
        void main() {
          // 绘制点
          float distance = distance(gl_PointCoord, vec2(0.5));
          float strength = distance * 2.0;
          strength = 1.0 - strength;
          strength = pow(strength, 1.5);

          // 设置边界阈值
          float threshold = 0.3;
          if (strength < threshold) {
            // 边界处透明度为 0
              strength = 0.0;
          }

          gl_FragColor = vec4(uColor, strength);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 0,
        },
        uColor: {
          value: this.fireworksColor,
        },
      },
    });

    // 创建烟花
    return new Points(this.fireworksGeometry, this.fireworksMaterial);
  };

  private createExplodeFireworks = (to: { x: number; y: number; z: number }) => {
    // 爆炸烟花发射点
    this.explodeFireworksGeometry = new BufferGeometry();
    this.explodeFireworksCount = 180 + Math.floor(Math.random() * 180);
    const explodeFireworksPosition = new Float32Array(this.explodeFireworksCount * 3);
    const explodeFireworksScale = new Float32Array(this.explodeFireworksCount * 3);
    const explodeFireworksDirection = new Float32Array(this.explodeFireworksCount * 3);
    for (let i = 0; i < this.explodeFireworksCount; i++) {
      // 爆炸烟花起始位置
      explodeFireworksPosition[i * 3 + 0] = to.x;
      explodeFireworksPosition[i * 3 + 1] = to.y;
      explodeFireworksPosition[i * 3 + 2] = to.z;
      // 爆炸烟花大小
      explodeFireworksScale[i] = Math.random();
      // 爆炸烟花四周发射的角度
      let theta = Math.random() * 2 * Math.PI;
      let beta = Math.random() * 2 * Math.PI;
      let r = Math.random();
      explodeFireworksDirection[i * 3 + 0] = r * Math.sin(theta) + r * Math.sin(beta);
      explodeFireworksDirection[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta);
      explodeFireworksDirection[i * 3 + 2] = r * Math.cos(theta) + r * Math.sin(beta);
    }
    this.explodeFireworksGeometry.setAttribute(
      'position',
      new BufferAttribute(explodeFireworksPosition, 3)
    );
    this.explodeFireworksGeometry.setAttribute(
      'aExplodeFireworksScale',
      new BufferAttribute(explodeFireworksScale, 1)
    );
    this.explodeFireworksGeometry.setAttribute(
      'aExplodeFireworksDirection',
      new BufferAttribute(explodeFireworksDirection, 3)
    );

    // 爆炸烟花材质
    this.explodeFireworksMaterial = new ShaderMaterial({
      vertexShader: `
        uniform float uSize;
        uniform float uTime;
        attribute float aExplodeFireworksScale;
        attribute vec3 aExplodeFireworksDirection;

        void main() {
          // 模型矩阵
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          modelPosition.xyz += aExplodeFireworksDirection * uTime * 3.5;

          // 视图矩阵
          vec4 viewPosition = viewMatrix * modelPosition;

          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewPosition;

          // 设置顶点大小
          gl_PointSize = uSize * aExplodeFireworksScale - (uTime * 10.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;

        void main() {
          // 绘制点
          float distance = distance(gl_PointCoord, vec2(0.5));
          float strength = distance * 2.0;
          strength = 1.0 - strength;
          strength = pow(strength, 1.5);

          // 设置边界阈值
          float threshold = 0.3;
          if (strength < threshold) {
            // 边界处透明度为 0
              strength = 0.0;
          }

          gl_FragColor = vec4(uColor, strength);
        }
      `,
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 0,
        },
        uColor: {
          value: this.fireworksColor,
        },
      },
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    // 爆炸烟花
    return new Points(this.explodeFireworksGeometry, this.explodeFireworksMaterial);
  };

  update = () => {
    if (
      !this.fireworksMaterial ||
      !this.clock ||
      !this.fireworksPoints ||
      !this.fireworksGeometry ||
      !this.explodeFireworksGeometry ||
      !this.explodeFireworksMaterial ||
      !this.explodeFireworksPoints ||
      !this.scene
    ) {
      console.error('检测到变量未初始化');
      return;
    }
    const elapsedTime = this.clock.getElapsedTime();

    if (elapsedTime <= 1) {
      this.fireworksMaterial.uniforms.uTime.value = elapsedTime;
      this.fireworksMaterial.uniforms.uSize.value = 25.0;
    } else {
      this.fireworksMaterial.uniforms.uSize.value = 0;
      // 释放内存, 防止内存泄漏
      this.fireworksPoints.clear();
      this.fireworksGeometry.dispose();
      this.fireworksMaterial.dispose();
      this.scene.remove(this.fireworksPoints);

      // 添加爆炸烟花效果
      this.scene.add(this.explodeFireworksPoints);
      if (!this.fireworksMusic1Played && this.fireworksMusic1) {
        this.fireworksMusic1Played = true;
        this.fireworksMusic1.play();
      }
      const time = elapsedTime - 1;
      this.explodeFireworksMaterial.uniforms.uTime.value = time;
      this.explodeFireworksMaterial.uniforms.uSize.value = 20.0;

      if (time > 3) {
        // 释放内存, 防止内存泄漏
        this.explodeFireworksMaterial.uniforms.uSize.value = 0;
        this.explodeFireworksPoints.clear();
        this.explodeFireworksGeometry.dispose();
        this.explodeFireworksMaterial.dispose();
        this.scene.remove(this.explodeFireworksPoints);

        this.onRemoveCallbackFunctionList.forEach((item) => {
          item();
        });
        this.onRemoveCallbackFunctionList = [];
      }
    }
  };

  onRemove = (callback: () => void) => {
    this.onRemoveCallbackFunctionList.push(callback);
  };
}
