'use client';
import { css, Global } from '@emotion/react';
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
    min-height: 100vh;
    font-size: 5rem;
  }
  .back-top {
    position: fixed;
    right: 10rem;
    bottom: 10rem;
    font-size: 2rem;
    background-color: #f60;
    color: #fff;
    cursor: pointer;
  }
`;

const PageContent = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <div className="content">1</div>
      <div className="content">2</div>
      <div className="content">3</div>
      <div
        className="back-top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            // behavior: 'smooth',
          });
        }}
      >
        回到顶部
      </div>

      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
        `}
      />
    </Container>
  );
};

export default PageContent;
