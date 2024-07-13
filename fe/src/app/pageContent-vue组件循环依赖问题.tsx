'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
 * 什么是循环依赖：
 *  - A import 了 B 组件，B import A 组件
 *    A.vue
 *    import B from './B.vue';
 *
 *    B.vue
 *    import A from './A.vue';
 *
 *    App.vue
 *    import A from './A.vue';
 *
 *    这种导入方式会导致 B 组件无法使用 A 组件
 *    因为 webpack 在解析 A 组件过程中会优先解析 B 组件，解析 B 组件的过程中由于 A 组件还未解析完成，会导致引入 A 组件失败
 *
 * - 如何解决
 *    - 使用 defineAsyncComponent 定义动态组件
 *    - 直接全局注册 A 和 B 组件
 *    - 让 A B 两个组件断开耦合
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
