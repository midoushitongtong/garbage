'use client';

import { css, Global } from '@emotion/react';
import { useEffect, useRef } from 'react';

const PageContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  const createPoint = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const r = 6;
    let x = getRandom(0, canvas.width - r / 2);
    let y = getRandom(0, canvas.height - r / 2);
    let xSpeed = getRandom(-50, 50);
    let ySpeed = getRandom(-50, 50);
    let lastDrawTime: number | null = null;

    const draw = () => {
      if (lastDrawTime) {
        // 根据运动时间，计算当前位置
        const now = Date.now();
        const step = (now - lastDrawTime) / 1000;
        x = x + xSpeed * step;
        y = y + ySpeed * step;
        if (x < r || x > canvas.width - r) {
          xSpeed *= -1;
        }
        if (y < r || y > canvas.height - r) {
          ySpeed *= -1;
        }
      }

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(233, 233, 233)';
      ctx.fill();
      lastDrawTime = Date.now();
    };

    const getPosition = () => ({ x, y });

    return {
      getPosition,
      draw,
    };
  };

  const createGraph = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    pointNumber = 30,
    maxDis = 500
  ) => {
    const points = new Array(pointNumber).fill(1).map(() => createPoint(canvas, ctx));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p1X = p1.getPosition().x;
        const p1Y = p1.getPosition().y;
        p1?.draw();
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const p2X = p2.getPosition().x;
          const p2Y = p2.getPosition().y;
          const d = Math.sqrt((p1X - p2X) ** 2 + (p1Y - p2Y) ** 2);
          if (d > maxDis) {
            continue;
          }
          ctx.beginPath();
          ctx.moveTo(p1X, p1Y);
          ctx.lineTo(p2X, p2Y);
          ctx.closePath();
          ctx.strokeStyle = `rgba(233, 233, 233, ${1 - d / maxDis})`;
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    };

    return {
      draw,
    };
  };

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth - 10 + 'px';
    canvas.style.height = window.innerHeight - 10 + 'px';

    createGraph(canvas, ctx)?.draw();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      />
    </>
  );
};

export default PageContent;
