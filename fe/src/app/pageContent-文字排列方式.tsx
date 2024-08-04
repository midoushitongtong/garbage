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
  // 设置文字排列方式
  writing-mode: vertical-rl;
  .author {
    /* margin-right: 10px; */ // 不能使用绝对方向, 因为文字的排列方式可能不一样
    margin-block-start: 10px; // 需要使用逻辑方向来设置边距, 逻辑方向是根据块盒的起始和结束方向来设置
  }
  .date {
    text-combine-upright: all; // 设置文字的组合方式, 达到一行显示的效果
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div>《静夜思》</div>
      <div className="author">李白</div>
      <div className="date">公元726年</div>
      <div>床前明月光</div>
      <div>疑是地上霜</div>
      <div>举头望明月</div>
      <div>低头思故乡</div>
    </Container>
  );
};

export default PageContent;
