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
    position: relative;
    width: 128px;
    height: 128px;
    &:hover {
      .background {
        clip-path: circle(50% at 50% 50%);
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: 50%;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0);
      border-radius: 50%;
      clip-path: circle(0% at 50% 50%);
      transition: all 0.2s linear;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <img src="/avatar.jpg" />
        <img src="/avatar.jpg" className="background" />
      </div>
    </Container>
  );
};

export default PageContent;
