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
 * 垃圾回收和内存泄漏
 *
 * 垃圾回收：代表一块内存空间已经不在使用，需要对这块内存空间进行回收，避免无效资源占用
 * 在某些情况下，机器是不知道某块内存空间是否属于无效资源，我们需要人为干预，把他标记为null即可(也称为标记清除)
 *
 * 内存泄漏：代表一块内存空间已经不在使用，但是没有正确的进行垃圾回收，避免无效资源占用，导致性能问题
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
