'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section``;

const PageContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    // 列宽
    const columnWidth = 20;
    // 列数
    const columnCount = Math.floor(width / columnWidth);
    // 记录每列写到第几个文字
    const columnNextIndexed = new Array(columnCount).fill(1);

    function getRandomColor() {
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
    }

    function getRandomText() {
      // eslint-disable-next-line quotes
      const str = "console.log('hello world')";
      return str[Math.floor(Math.random() * str.length)];
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(233, 233, 233, 0.2)';
      ctx.fillRect(0, 0, width, height);
      const fontSize = 20;
      ctx.fillStyle = getRandomColor();
      ctx.font = `${fontSize}px "Robot Mono"`;
      for (let i = 0; i < columnCount; i++) {
        const text = getRandomText();
        const x = i * columnWidth;
        const y = fontSize * columnNextIndexed[i];
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.99) {
          columnNextIndexed[i] = 0;
        }
        columnNextIndexed[i]++;
      }
    }

    timeout.current = setInterval(draw, 40);

    return () => {
      clearInterval(timeout.current);
    };
  }, []);

  return (
    <>
      <Container className="container">
        <canvas ref={canvasRef}></canvas>
      </Container>
    </>
  );
};

export default PageContent;
