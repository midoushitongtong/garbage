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
 * vue 组件命名方式
 *  - 大驼峰
 *    比较稳定稳的一种方法，不用担心和html元素冲突
 *    优点:
 *      - 可以配合 es6 速写属性
 *  - 短横线
 *    需要注意避免和html元素冲突，解决方法是可以带上前缀，比如 ant-button el-button
 *
 * 在开发的时候需要保持统一，不要某个地方用大驼峰，某个地方用短横线
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
