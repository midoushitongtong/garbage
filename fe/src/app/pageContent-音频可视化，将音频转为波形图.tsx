'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
`;

const PageContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isInit = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;

    if (!canvas || !audio || isInit.current) {
      return;
    }

    // 初始化 canvas 宽高
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = (window.innerHeight / 2) * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight / 2 + 'px';
    const ctx = canvas.getContext('2d');

    const handlePlay = () => {
      if (isInit.current) {
        return;
      }
      isInit.current = true;

      // 创建音频上下文
      const audioCtx = new AudioContext();
      // 创建音频源节点
      const source = audioCtx.createMediaElementSource(audio);
      // 创建音频分析器节点
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      // 创建数组，用于接受分析器分析的数据
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      // 将分析出的波形数据填充到 canvas
      const draw = () => {
        if (!ctx) {
          return;
        }

        requestAnimationFrame(draw);

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        analyser.getByteFrequencyData(dataArray);

        const len = dataArray.length / 2.5;
        const barWidth = width / len / 2;
        for (let i = 0; i < len; i++) {
          const data = dataArray[i];
          const barHeight = (data / 255) * height;
          const x = i * barWidth + width / 2;
          const y = height - barHeight;
          const x2 = width / 2 - (i + 1) * barWidth;
          ctx.fillStyle = '#78c5f7';
          ctx.fillRect(x, y, barWidth - 2, barHeight);
          ctx.fillRect(x2, y, barWidth - 2, barHeight);
        }
      };

      draw();
    };

    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} src="/qlx.mp3" controls></audio>
    </Container>
  );
};

export default PageContent;
