import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  Raycaster,
  Vector2,
  Group,
  Clock,
  SphereGeometry,
  CylinderGeometry,
  Object3DEventMap,
} from 'three';
import './Home.scss';
import anime from 'animejs';

const initData = async () => {
  let renderer: WebGLRenderer | undefined;
  let camera: PerspectiveCamera | undefined;
  let scene: Scene | undefined;

  const pages: Group<Object3DEventMap>[] = [];
  const pagesAnimationRunning: boolean[] = [];

  let mouse = {
    x: 0,
    y: 0,
  };

  const init = () => {
    renderer = new WebGLRenderer({
      alpha: true, // 渲染器透明背景
    });

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
    camera.position.set(0, 0, 12); // 设置相机位置

    // 初始化场景
    scene = new Scene();

    // 灯光
    const ambientLight = new AmbientLight('#ffffff', 2); // 环境光
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight('#ffffff', 2); // 平行光
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 5, 10);
    scene.add(directionalLight);

    // 模型

    const page1 = () => {
      if (!scene) {
        return;
      }

      const boxGroup = new Group();

      const boxGeometry = new SphereGeometry(0.2, 30, 16);
      const boxMaterial = new MeshStandardMaterial({
        color: 'yellow',
      });
      const boxMaterial2 = new MeshStandardMaterial({
        color: '#ff6600',
      });
      for (let i = 0; i < 1000; i++) {
        const box = new Mesh(boxGeometry, boxMaterial);
        box.position.set(Math.random() * 10 - 5, Math.random() * 5, Math.random() * 10 - 5);
        box.castShadow = true;
        boxGroup.add(box);
      }
      scene.add(boxGroup);

      // 创建光线投射
      const raycaster = new Raycaster();

      window.addEventListener('mousemove', (event) => {
        if (!camera || !scene) {
          return;
        }

        // 将鼠标位置换算为 x y (x y 值的范围是 0 ~ 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(new Vector2(x, y), camera);
        boxGroup.children.forEach((item) => {
          // @ts-ignore
          item.material = boxMaterial;
        });
        raycaster.intersectObjects(scene.children).forEach((item) => {
          // @ts-ignore
          item.object.material = boxMaterial2;
        });
      });

      return boxGroup;
    };
    const page1BoxGroup = page1();
    pages.push(page1BoxGroup as Group<Object3DEventMap>);

    const page2 = () => {
      if (!scene) {
        return;
      }

      const boxGroup = new Group();

      const boxGeometry = new SphereGeometry(0.2, 30, 16);
      const boxMaterial = new MeshStandardMaterial({
        color: 'blue',
      });
      const boxMaterial2 = new MeshStandardMaterial({
        color: '#ff6600',
      });
      for (let i = 0; i < 1000; i++) {
        const box = new Mesh(boxGeometry, boxMaterial);
        box.position.set(Math.random() * 10 - 5, Math.random() * 5, Math.random() * 10 - 5);
        box.castShadow = true;
        boxGroup.add(box);
      }
      boxGroup.position.set(0, -30, 0);
      scene.add(boxGroup);

      // 创建光线投射
      const raycaster = new Raycaster();

      window.addEventListener('mousemove', (event) => {
        if (!camera || !scene) {
          return;
        }

        // 将鼠标位置换算为 x y (x y 值的范围是 0 ~ 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(new Vector2(x, y), camera);
        boxGroup.children.forEach((item) => {
          // @ts-ignore
          item.material = boxMaterial;
        });
        raycaster.intersectObjects(scene.children).forEach((item) => {
          // @ts-ignore
          item.object.material = boxMaterial2;
        });
      });

      return boxGroup;
    };
    const page2BoxGroup = page2();
    pages.push(page2BoxGroup as Group<Object3DEventMap>);

    const page3 = () => {
      if (!scene) {
        return;
      }

      const boxGroup = new Group();

      const boxGeometry = new SphereGeometry(0.2, 32, 16);
      const boxMaterial = new MeshStandardMaterial({
        color: '#ffffff',
      });
      const boxMaterial2 = new MeshStandardMaterial({
        color: '#ff6600',
      });
      for (let i = 0; i < 1000; i++) {
        const box = new Mesh(boxGeometry, boxMaterial);
        box.position.set(Math.random() * 10 - 5, Math.random() * 5, Math.random() * 10 - 5);
        box.castShadow = true;
        boxGroup.add(box);
      }
      boxGroup.position.set(0, -60, 0);
      scene.add(boxGroup);

      // 创建光线投射
      const raycaster = new Raycaster();

      window.addEventListener('mousemove', (event) => {
        if (!camera || !scene) {
          return;
        }

        // 将鼠标位置换算为 x y (x y 值的范围是 0 ~ 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(new Vector2(x, y), camera);
        boxGroup.children.forEach((item) => {
          // @ts-ignore
          item.material = boxMaterial;
        });
        raycaster.intersectObjects(scene.children).forEach((item) => {
          // @ts-ignore
          item.object.material = boxMaterial2;
        });
      });

      return boxGroup;
    };
    const page3BoxGroup = page3();
    pages.push(page3BoxGroup as Group<Object3DEventMap>);

    const clock = new Clock();
    const clock2 = new Clock();

    const animate = () => {
      if (!renderer || !camera || !scene) {
        console.error('检测到变量未初始化');
        return;
      }

      const elaspedTime = clock.getElapsedTime();
      const deltaTime = clock2.getDelta();

      if (page1BoxGroup) {
        page1BoxGroup.rotation.x = elaspedTime * 0.5;
      }

      if (page2BoxGroup) {
        page2BoxGroup.rotation.y = elaspedTime * 0.5;
      }

      if (page3BoxGroup) {
        page3BoxGroup.rotation.z = elaspedTime * 0.5;
      }

      camera.position.x += (mouse.x - camera.position.x) * (deltaTime * 10);

      // 根据当前滚动的 scrollY 去设置相机移动的位置
      camera.position.y = -((window.scrollY / window.innerHeight) * 30);

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

  let currentPage = -1;
  const handleScroll = () => {
    const newPage = Math.round(window.scrollY / window.innerHeight);
    if (currentPage !== newPage) {
      currentPage = newPage;

      if (pagesAnimationRunning[newPage]) {
        return;
      }

      anime({
        targets: `.page${newPage + 1} h1`,
        rotate: [
          {
            value: 0,
            duration: 0,
          },
          {
            value: 360,
            duration: 1000,
          },
          {
            value: 0,
            duration: 1000,
          },
        ],
        easing: 'linear',
      });

      anime({
        targets: pages[newPage].rotation,
        x: pages[newPage].rotation.x + Math.PI * 3,
        y: pages[newPage].rotation.y + Math.PI * 3,
        z: pages[newPage].rotation.z + Math.PI * 3,
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        begin: () => {
          console.log('begin', newPage);

          pagesAnimationRunning[newPage] = true;
        },
        complete: () => {
          console.log('complete', newPage);
          pagesAnimationRunning[newPage] = false;
        },
      });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouse = {
      x: (event.clientX / window.innerWidth) * 3 - 1.5, // -1.5 ~ 1.5
      y: (event.clientY / window.innerHeight) * 3 - 1.5, // -1.5 ~ 1.5
    };
  };

  init();
  window.addEventListener('resize', handleWindowResize);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMove);
  handleScroll();
};

initData();
