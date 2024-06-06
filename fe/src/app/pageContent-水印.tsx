'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Container = styled.section`
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-size: 5rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

// 生成水印
const useWatermakBg = (props: { fontSize: number; gap: number; text: string }) => {
  const [data, setData] = useState<{
    base64: string;
    size: number;
    styleSize: number;
  }>();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontSize = props.fontSize * devicePixelRatio;
    const font = fontSize + 'px serif';
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.font = font;
    const { width } = ctx.measureText(props.text);
    const canvasSize = Math.max(100, width) + props.gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.rotate((Math.PI / 180) * -45);
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(props.text, 0, 0);

    setData({
      base64: canvas.toDataURL(),
      size: canvasSize,
      styleSize: canvasSize / devicePixelRatio,
    });
  }, [props.fontSize, props.gap, props.text]);

  return data;
};

const Watermark = (props: {
  children: React.ReactNode;
  text?: string;
  fontSize?: number;
  gap?: number;
}) => {
  const { children, text = 'watermark', fontSize = 40, gap = 20 } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const bg = useWatermakBg({ text, fontSize, gap });
  const watermarkRef = useRef<HTMLDivElement>();
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const div = document.createElement('div');
    div.style.backgroundImage = `url(${bg?.base64})`;
    div.style.backgroundSize = `${bg?.styleSize}px ${bg?.styleSize}px`;
    div.style.backgroundRepeat = 'repeat';
    div.style.zIndex = '9999';
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    div.style.inset = '0';
    container.appendChild(div);

    watermarkRef.current = div;

    return () => {
      try {
        container.removeChild(div);
      } catch {}
    };
  }, [bg?.base64, bg?.styleSize, flag]);

  // 防篡改功能
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const ob = new MutationObserver((records) => {
      for (const record of records) {
        for (const dom of record.removedNodes) {
          // 防止删除元素
          if (dom === watermarkRef.current) {
            setFlag(flag + 1);
          }
        }
        // 防止修改样式
        if (record.target === watermarkRef.current) {
          setFlag(flag + 1);
          return;
        }
      }
    });
    ob.observe(container, {
      childList: true, // 监听元素内容
      attributes: true, // 监听属性
      subtree: true, // 监听子树
    });

    return () => {
      ob.disconnect();
    };
  }, [flag]);

  return <div ref={containerRef}>{children}</div>;
};

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <Watermark>
        <div className="content">Hello World</div>
      </Watermark>
    </Container>
  );
};

export default PageContent;
