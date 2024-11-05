'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section``;

const PageContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interval = useRef<NodeJS.Timeout>();

  // 生成随机颜色
  const getRandomColor = () => {
    const fontColors = [
      '#33B5E5',
      '#0099CC',
      '#AA66CC',
      '#9933CC',
      '#669900',
      '#FFBB33',
      '#FF8800',
      '#FF4444',
      '#CC0000',
    ];
    return fontColors[Math.floor(Math.random() * fontColors.length)];
  };

  // 生成随机字符
  const getRandomString = () => {
    // eslint-disable-next-line quotes
    const string = "console.log('hello world')";
    return string[Math.floor(Math.random() * string.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    // 初始化 canvas 宽高
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    // ctx
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    // 字体大小
    const fontSize = 20 * window.devicePixelRatio;
    // 列款
    const columnWidth = fontSize;
    // 列数
    const columnCount = Math.floor(width / columnWidth);
    // 记录每列画到了第几个字符
    const columnNextIndex = new Array(columnCount).fill(0).map(() => {
      if (Math.random() > 0.99) {
        return 0;
      }
      // 初始情况将一部分列置为底部
      return height;
    });

    // 画一排字
    const draw = () => {
      ctx.fillStyle = 'rgba(233, 233, 233, 0.2)';
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < columnCount; i++) {
        const color = getRandomColor();
        const string = getRandomString();
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px "Roboto Mono"`;
        const x = i * columnWidth;
        const y = columnNextIndex[i] * fontSize;
        ctx.fillText(string, x, y);
        if (y > height && Math.random() > 0.99) {
          columnNextIndex[i] = 0;
        } else {
          columnNextIndex[i]++;
        }
      }
    };

    interval.current = setInterval(draw, 40);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef}></canvas>
    </Container>
  );
};

export default PageContent;
