'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

/**
vue 中静态资源的动态访问

目录中有三张图片
assets/images/1.png
assets/images/2.png
assets/images/3.png

需求是根据某个数据加载某一张图片
const index = ref(0);
<img :src="`@/assets/images/${index}.png`" />
这样会出现问题，因为 webpack/vite 打包的时候会对资源添加指纹最终的文件名就不在是 1.png 了而是这种
assets/1-447c06c7.png
assets/2-557c06c7.png
assets/3-667c06c7.png
那么就会出现问题，资源无法正确加载，怎么解决呢：
1. 第一种最笨的办法，一次性 import 所有图片, 用 if else 返回即可
2. 放到 static 目录下，static 目录不会经过 webpack/vite 处理，资源名字不会发生变化
3. 使用 import 动态载入特性
  const module = import(`@/assets/images/${index}.png`);
  这种做法确实可以，但是 webpack 会暴力的生成所有.png 的对应的 js 资源，如果图片过多会生成很多 js
4. 使用 URL 载入的特性
  const obj = new URL(`@/assets/images/${index}.png`, import.meta.url);
  const path = obj.pathname;
  这种做法跟 import 一样, 但是不会生成很多的 js 是比较好的一种解决方案


*/

const PageContent = () => {
  useEffect(() => {
    const idel = requestIdleCallback(() => {
      console.log('Hello World');
    });

    return () => {
      cancelIdleCallback(idel);
    };
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
