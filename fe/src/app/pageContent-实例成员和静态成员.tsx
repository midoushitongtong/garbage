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
 * 实例成员和静态成员
 *
 * 在定义 class 的时候，怎么定义一个成员是实例成员还是静态成员？
 * 如果这个成员每个实例都可能不同，那么就需要定义为实例成员，例如人的年龄
 * 如果这个成员每个实例都相同，那么就需要定义为静态成员，例如人的性别类型，只有男和女两种
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
