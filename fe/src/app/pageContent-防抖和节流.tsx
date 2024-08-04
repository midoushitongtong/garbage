'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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
 * 什么情况下建议使用防抖:
 *  - 高频调用
 *  - 耗时的操作
 *  - 某些场景下, 在特定的时间内多次调用以最后一次的为准
 */
function debounce(fn: Function, duration: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(
        // @ts-ignore
        this,
        ...args
      );
    }, duration);
  };
}

/**
 * 什么情况下建议使用节流:
 *  - 高频调用
 *  - 耗时的操作
 *  - 某些场景下，在特定的时间内至少会执行一次
 */
function throttle(fn: Function, duration: number) {
  let lastCallTime: number = 0;
  return function (...args: any) {
    if (new Date().getTime() - lastCallTime < duration) {
      return;
    }
    lastCallTime = new Date().getTime();
    fn.call(
      // @ts-ignore
      this,
      ...args
    );
  };
}

const a = debounce(() => {
  console.log('hello world debounce');
}, 1000);

const b = throttle(() => {
  console.log('hello world throttle');
}, 1000);

const PageContent = () => {
  return (
    <Container>
      <div className="content">
        <Button variant="contained" onClick={a}>
          防抖测试
        </Button>
        <Button variant="contained" onClick={b}>
          节流测试
        </Button>
      </div>
    </Container>
  );
};

export default PageContent;
