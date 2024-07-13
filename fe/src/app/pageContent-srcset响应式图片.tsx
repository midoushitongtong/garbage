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

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      {/* <img
        style={{
          width: '150px',
        }}
        // srcset 可以根据屏幕大小或者像素密度来自动选择合适的图片进行展示
        srcSet="
          https://picsum.photos/150/150 1x,
          https://picsum.photos/300/300 2x,
          https://picsum.photos/600/600 4x,
          https://picsum.photos/900/900 6x
        "
      /> */}

      <img
        style={{
          width: '150px',
        }}
        // srcset 可以根据屏幕大小或者像素密度来自动选择合适的图片进行展示
        srcSet="
          https://picsum.photos/150/150 150w,
          https://picsum.photos/300/300 300w,
          https://picsum.photos/600/600 600w,
          https://picsum.photos/900/900 900w
        "
        // sizes 可以根据屏幕宽度来决定显示那个像素
        sizes="
          (max-width: 150px) 150px,
          (max-width: 300px) 300px,
          (max-width: 600px) 600px,
          (max-width: 900px) 900px
        "
      />
    </Container>
  );
};

export default PageContent;
