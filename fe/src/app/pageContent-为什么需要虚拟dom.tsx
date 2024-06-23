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
 * 为什么需要虚拟DOM?
 *
 * - 减少更新dom的次数，每次更新的时候先对虚拟dom进行对比，找到有差异的地方，在去更新有差异的真实dom，提高性能
 * - 跨平台，虚拟dom不单单可以应用到web，也可以应用到 app、小程序、桌面应用，有了虚拟dom，只需要调用对应的平台的更新UI的方法即可
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
