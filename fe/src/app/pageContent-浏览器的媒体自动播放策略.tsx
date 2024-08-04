'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

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
 * 浏览器媒体自动播放策略
 * - 始终允许静音自动播放
 * - 在以下情况下，带声音的媒体允许自动播放
 *    - 在桌面设备上，用户的"媒体参与度"已经达到了某个阈值，说明用户经常播放过很多次带声音的媒体，代表用户已经信任此网站
 *    - 用户已经将此网站添加到了移动设备的主屏幕或者安装了pwa
 *
 * 媒体参与度
 *  - 衡量用户在某个网站上使用多媒体的倾向，值越大，说明用户对此网站的多媒体越感兴趣
 *  - 媒体参与度可以通过 chrome://media-engagement 查看
 */

const PageContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideoWithMuted = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      await video.play();
    } catch (error) {
      console.log(error);
    }
  };

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch (error) {
      await playVideoWithMuted();
    }
  };

  useEffect(() => {
    playVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
      <video ref={videoRef} src="/oceans.mp4" controls autoPlay />
    </Container>
  );
};

export default PageContent;
