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
 * 定时器动画 (已经淘汰了)
 *  - 优势: 简单易用, 直接指定时间间隔来处理动画
 *  - 劣势: 不平滑, 定时器的时间不是精准的, 会受到多方面的影响, 例如主线程的繁忙程度就会影响定时器
 *          与当前帧率不同步, 定时器与当前刷新机制无关, 可能会导致画面掉帧现象
 *          不节能, 在页面不活动的状态下, 定时器也会一直在运行
 *
 * requestAnimationFrame (主流解决方案)
 *  - 优势: 平滑动画, 与显示器的刷新率保持一致
 *          节能, 页面在不活动的情况下, 例如最小化, requestAnimationFrame 的回调不会运行
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
