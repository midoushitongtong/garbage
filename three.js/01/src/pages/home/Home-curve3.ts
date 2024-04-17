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
  CatmullRomCurve3,
  Vector3,
  Line,
  BufferGeometry,
  LineBasicMaterial,
  Clock,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let controls: OrbitControls | undefined;
  let scene: Scene | undefined;
  let mainModel: Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap> | undefined;

  const init = async () => {
    // 初始化渲染器
    renderer = new WebGLRenderer();
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
    camera.position.set(0, 10, 10); // 设置相机位置

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

    // 地面
    const floorGeometry = new PlaneGeometry(50, 50);
    const floorMaterial = new MeshStandardMaterial({
      color: '#ffffff',
      side: DoubleSide,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // 创建曲线
    const curve = new CatmullRomCurve3(
      [new Vector3(-10, 6, 0), new Vector3(0, 10, 0), new Vector3(10, 6, 0)],
      true,
      'catmullrom',
      1
    );

    // 曲线
    const points = curve.getPoints(50);
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color: 0xff0000 });
    const line = new Line(geometry, material);
    scene.add(line);

    // 小球
    const boxGeometry = new SphereGeometry(0.2, 64, 32);
    const boxMaterial = new MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.05,
      color: '#06f',
    });
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = 1;
    boxMesh.castShadow = true;
    mainModel = boxMesh;
    scene.add(boxMesh);

    // animate
    const clock = new Clock();
    const animate = () => {
      if (!renderer || !camera || !controls || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const elaspedTime = clock.getElapsedTime();
      // 格式化为 0 ~ 1 的数据
      const formatElaspedTime = (elaspedTime * 0.5) % 1;
      boxMesh.position.copy(curve.getPoint(formatElaspedTime));

      controls.update();
      camera.lookAt(boxMesh.position.clone());
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
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
