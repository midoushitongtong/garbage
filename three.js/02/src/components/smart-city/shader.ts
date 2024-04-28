import type { SmartCityInfo } from '@/apis/smart-city/types';
import anime, { type AnimeInstance } from 'animejs';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Camera,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DoubleSide,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MirroredRepeatWrapping,
  PlaneGeometry,
  Points,
  Raycaster,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  TubeGeometry,
  Vector2,
  Vector3,
} from 'three';

// 设置(城市)颜色
export const setCityColorShader = (item: any, shader: ShaderMaterial) => {
  item.geometry.computeBoundingBox();
  const { min, max } = item.geometry.boundingBox;
  const uCityHeight = max.y - min.y; // 物体的高度差

  shader.uniforms.uCityHeight = { value: uCityHeight };
  shader.uniforms.uCityTopColor = { value: new Color('#0c0e6f') };
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
      #include <common>
      varying vec3 vPosition;
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      #include <begin_vertex>
      vPosition = position;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform vec3 uCityTopColor;
      uniform float uCityHeight;
      varying vec3 vPosition;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `
      #include <dithering_fragment>
      vec4 distGradColor = gl_FragColor;
      // 设置混合的百分比
      float gradMix = (vPosition.y + uCityHeight / 5.0) / uCityHeight;
      // 计算混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz, uCityTopColor, gradMix);
      gl_FragColor = vec4(gradMixColor, 1.0);
      // #end#
    `
  );
};

// 设置(城市)扩散效果
export const setSpreadShader = (item: any, shader: ShaderMaterial) => {
  // 扩散中心点
  shader.uniforms.uSpreadCenter = { value: new Vector2(0, 0) };
  // 扩散时间
  shader.uniforms.uSpreadTime = { value: 0 };
  // 宽度
  shader.uniforms.uSpreadWidth = { value: 50 };
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '// #end#',
    `
      float spreadRadius = distance(vPosition.xz, uSpreadCenter);
      float spreadMix = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth;
      if (spreadMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1, 1, 1, 1), spreadMix / uSpreadWidth);
      }
      // #end#
    `
  );

  anime({
    targets: shader.uniforms.uSpreadTime,
    value: 2500,
    easing: 'linear',
    duration: 3000,
    loop: true,
  });
};

// 设置(城市)线条效果
export const setLightLineShader = (item: any, shader: ShaderMaterial) => {
  // 线条时间
  shader.uniforms.uLightLineTime = { value: -3000 };
  // 设置条带的速度
  shader.uniforms.uLightLineWidth = { value: 100 };
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform float uLightLineTime;
      uniform float uLightLineWidth;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '// #end#',
    `
      float lightLineMix = -(vPosition.x + vPosition.z - uLightLineTime) * (vPosition.x + vPosition.z - uLightLineTime) + uLightLineWidth;
      if (lightLineMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1, 1, 1, 1), lightLineMix / uLightLineWidth);
      }
      // #end#
    `
  );

  anime({
    targets: shader.uniforms.uLightLineTime,
    value: 3000,
    easing: 'linear',
    duration: 3500,
    loop: true,
  });
};

// 设置(城市)线条效果
export const setLightLine2Shader = (item: any, shader: ShaderMaterial) => {
  // 线条时间
  shader.uniforms.uLightLineToTopTime = { value: 0 };
  // 设置条带的速度
  shader.uniforms.uLightLineToTopWidth = { value: 100 };
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform float uLightLineToTopTime;
      uniform float uLightLineToTopWidth;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '// #end#',
    `
      float lightLineToTopMix = -(vPosition.y - uLightLineToTopTime) * (vPosition.y - uLightLineToTopTime) + uLightLineToTopWidth;
      if (lightLineToTopMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1, 1, 1, 1), lightLineToTopMix / uLightLineToTopWidth);
      }
      // #end#
    `
  );

  anime({
    targets: shader.uniforms.uLightLineToTopTime,
    value: 500,
    easing: 'linear',
    duration: 3500,
    loop: true,
  });
};

// 添加(城市)边缘线条效果
export const createEdgeLine = (item: any) => {
  const geometry = new EdgesGeometry(item.geometry);
  const material = new LineBasicMaterial({
    color: '#aaaeff',
  });
  const lineSegments = new LineSegments(geometry, material);
  lineSegments.scale.set(item.scale.x, item.scale.y, item.scale.z);
  lineSegments.position.set(item.position.x, item.position.y, item.position.z);
  lineSegments.rotation.set(item.rotation.x, item.rotation.y, item.rotation.z);
  return lineSegments;
};

export class FlyLine {
  init() {
    // 创建曲线
    const linePoints = [new Vector3(0, 0, 0), new Vector3(5, 5, 0), new Vector3(10, 0, 0)];
    const lineCuve = new CatmullRomCurve3(linePoints);
    // 创建飞线几何体
    const geometry = new TubeGeometry(lineCuve, 100, 0.6, 2, false);
    // 创建飞线材质
    const textureLoader = new TextureLoader();
    const colorTexture = textureLoader.load('/public/colors.png');
    colorTexture.repeat.set(12, 6);
    colorTexture.wrapS = RepeatWrapping;
    colorTexture.wrapT = MirroredRepeatWrapping;
    const material = new MeshBasicMaterial({
      map: colorTexture,
      transparent: true,
    });
    // 创建飞线
    const flyLine = new Mesh(geometry, material);
    // 创建飞线动画
    anime({
      targets: colorTexture.offset,
      x: -1,
      easing: 'linear',
      duration: 1000,
      loop: true,
    });
    return flyLine;
  }
}

export class FlyLineShader {
  init(item: SmartCityInfo['eventList'][0]) {
    // 创建曲线
    const linePoints = [
      new Vector3(0, 0, 0),
      new Vector3(item.position.x / 2, 5, item.position.z / 2),
      new Vector3(item.position.x, 0, item.position.z),
    ];
    const lineCuve = new CatmullRomCurve3(linePoints);
    const points = lineCuve.getPoints(10000);
    // 创建飞线几何体
    const geometry = new BufferGeometry().setFromPoints(points);
    // 创建飞线材质
    const aSize = new Float32Array(points.length);
    for (let i = 0; i < aSize.length; i++) {
      aSize[i] = i;
    }
    geometry.setAttribute('aSize', new BufferAttribute(aSize, 1));
    const material = new ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new Color('#f60'),
        },
        uLength: {
          value: points.length,
        },
      },
      vertexShader: `
        attribute float aSize;
        varying float vSize;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uLength;

        void main() {
          // 模型矩阵
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // 视图矩阵
          vec4 viewPosition = viewMatrix * modelPosition;

          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewPosition;

          vSize = (aSize - 500.0 - uTime);

          if (vSize < 0.0) {
            vSize = vSize + uLength;
          }
          vSize = vSize * 0.01;

          gl_PointSize = -vSize / viewPosition.z;
        }
      `,
      fragmentShader: `
        varying float vSize;
        uniform vec3 uColor;

        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
          float strength = 1.0 - (distanceToCenter * 2.0);
          if (vSize < 0.0) {
            gl_FragColor = vec4(1, 0, 0, 0);
          } else {
            gl_FragColor = vec4(uColor, strength);
          }
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    const mesh = new Points(geometry, material);

    anime({
      targets: material.uniforms.uTime,
      value: 10000,
      duration: 1000,
      easing: 'linear',
      loop: true,
    });

    return mesh;
  }
}

export class LightWallShader {
  init(item: SmartCityInfo['eventList'][0]) {
    const geometry = new CylinderGeometry(1, 1, 2, 32, 1, true);
    const material = new ShaderMaterial({
      uniforms: {
        uColor: {
          value: new Color('#e7a0ad'),
        },
      },
      vertexShader: `
        varying vec4 vModelPosition;

        void main() {
          // 模型矩阵
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // 视图矩阵
          vec4 viewPosition = viewMatrix * modelPosition;

          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewPosition;

          vModelPosition = modelPosition;
        }
      `,
      fragmentShader: `
        varying vec4 vModelPosition;
        uniform float uHeight;
        uniform vec3 uColor;
        
        void main() {
          float gradMix = (vModelPosition.y + uHeight / 3.0) / uHeight;
          gl_FragColor = vec4(uColor, 1.0 - gradMix);
        }
      `,
      transparent: true,
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(item.position.x, 1.5, item.position.z);
    mesh.geometry.computeBoundingBox();
    if (mesh.geometry.boundingBox) {
      const { min, max } = mesh.geometry.boundingBox;
      const uHeight = max.y - min.y;
      material.uniforms.uHeight = {
        value: uHeight,
      };
    }
    anime({
      targets: mesh.scale,
      x: 1.5,
      z: 1.5,
      easing: 'linear',
      duration: 1000,
      direction: 'alternate',
      loop: true,
    });
    return mesh;
  }
}

export class LightRaderShader {
  init(item: SmartCityInfo['eventList'][0]) {
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new Color('#c5dcfd'),
        },
      },
      vertexShader: `
        varying vec4 vModelPosition;
        varying vec2 vUv;

        void main() {
          // 模型矩阵
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // 视图矩阵
          vec4 viewPosition = viewMatrix * modelPosition;

          // 将各个顶点变换到裁剪空间
          gl_Position = projectionMatrix * viewPosition;

          vModelPosition = modelPosition;
          vUv = uv;
        }
      `,
      fragmentShader: `
        varying vec4 vModelPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;

        mat2 rotate2d(float _angle) {
          return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
        }
        
        void main() {
          vec2 newUv = rotate2d(uTime * 6.28) * (vUv - 0.5);
          newUv += 0.5;
          float alpha = 1.0 - step(0.5, distance(newUv, vec2(0.5)));
          float angle = atan(newUv.x - 0.5, newUv.y - 0.5);
          float strength = (angle + 3.14) / 6.24;
          gl_FragColor = vec4(uColor, alpha * strength);
        }
      `,
      transparent: true,
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(item.position.x, 1.5, item.position.z);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    anime({
      targets: material.uniforms.uTime,
      value: 1,
      duration: 1000,
      easing: 'linear',
      loop: true,
    });
    return mesh;
  }
}

export class Event {
  public sprite: Sprite | null = null;
  private scaleAnimate: AnimeInstance | null = null;

  init(scene: Scene, camera: Camera, item: SmartCityInfo['eventList'][0], onClick: () => void) {
    const iconMap: any = {
      f: '/public/火警.png',
      z: '/public/治安.png',
      d: '/public/电力.png',
    };

    const textureLoader = new TextureLoader();
    const eventIcon = textureLoader.load(iconMap[item.type]);
    const material = new SpriteMaterial({
      map: eventIcon,
    });
    const sprite = new Sprite(material);
    sprite.position.set(item.position.x, 3.75, item.position.z);
    sprite.scale.set(1.5, 1.5, 1.5);
    sprite.name = 'eventIcon';
    sprite.userData.id = item.id;
    this.sprite = sprite;
    this.initEvent(scene, camera, item, onClick);

    return sprite;
  }

  initEvent(scene: Scene, camera: Camera, item: SmartCityInfo['eventList'][0], onClick: () => void) {
    // 处理窗口点击事件
    const handleWindowClick = (e: MouseEvent) => {
      e.preventDefault();
      const raycaster = new Raycaster();
      const mouse = new Vector2(0, 0);
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        intersects.some((intersect) => {
          if (intersect.object.name === 'eventIcon' && intersect.object.userData.id === item.id) {
            onClick();
            return true;
          }
        });
      }
    };

    window.addEventListener('click', handleWindowClick);
  }

  startScaleAnimate() {
    const targets = {
      y: 3.75,
    };
    this.scaleAnimate = anime({
      targets,
      y: 5,
      duration: 500,
      easing: 'linear',
      direction: 'alternate',
      loop: true,
      change: () => {
        if (!this.sprite) {
          return;
        }
        this.sprite.position.y = targets.y;
      },
    });
  }

  stopScaleAnimate() {
    if (!this.scaleAnimate || !this.sprite) {
      return;
    }
    this.scaleAnimate.pause();
    const targets = {
      y: this.sprite.position.y || 0,
    };
    anime({
      targets,
      y: 3.75,
      duration: 500,
      easing: 'linear',
      change: () => {
        if (!this.sprite) {
          return;
        }
        this.sprite.position.y = targets.y;
      },
    });
  }
}
