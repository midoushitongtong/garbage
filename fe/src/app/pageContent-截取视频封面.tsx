'use client';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect } from 'react';

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

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  const captureFrame = (
    file: File,
    time = 0
  ): Promise<{
    file: File;
    url: string;
  }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.currentTime = time;
      video.autoplay = true; // 自动播放
      video.muted = true; // 由于浏览器限制, 需要设置为静音, 视频才能自动播放
      video.oncanplay = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toDataURL('image/png');
        canvas.toBlob((blob) => {
          if (blob) {
            const imageFile = new File([blob], `video-${time}.png`, { type: 'image/png' });
            const imageURL = URL.createObjectURL(blob);
            resolve({
              file: imageFile,
              url: imageURL,
            });
          } else {
            reject('创建 blob 失败');
          }
        });
      };
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const videoFrame = await captureFrame(file, 0);
    const img = document.createElement('img');
    img.setAttribute('style', 'display: flex; width: 100px; height: 100px;');
    img.src = videoFrame.url;
    document.querySelector('.content')?.appendChild(img);
  };

  return (
    <Container>
      <div className="content">
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
    </Container>
  );
};

export default PageContent;
