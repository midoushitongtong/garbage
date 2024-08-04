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
 * 什么是单向数据流
 * - 单向数据流是一种数据管理的方式，核心思想就是数据的流动是单向的
 * - 在单项数据流的模式下，只有数据拥有者才能修改数据，数据使用者是不能直接修改数据的，如果需要修改必须通知数据拥有者进行修改
 * 好处
 *  - 易于调试：想要查看数据的变化，只需要找到数据拥有者进行调试
 *  - 可预测性：数据总是以相同的方式进行流动，从而使程序变得更加可预测
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
