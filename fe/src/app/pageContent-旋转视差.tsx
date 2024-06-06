'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 300px;
    height: 300px;
    display: grid;
    overflow: hidden;
    grid-template:
      'A A B'
      'C D B'
      'C E E';
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    animation: rotation 10s linear infinite;
    @keyframes rotation {
      100% {
        transform: rotate(360deg);
      }
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 2px solid #f60;
      margin: 2px;
      img {
        width: 300%;
        height: 300%;
        object-fit: cover;
        animation: rotation2 10s linear infinite;
        @keyframes rotation2 {
          100% {
            transform: rotate(-360deg);
          }
        }
      }
    }
    .item:nth-child(1) {
      grid-area: A;
    }
    .item:nth-child(2) {
      grid-area: B;
    }
    .item:nth-child(3) {
      grid-area: C;
    }
    .item:nth-child(4) {
      grid-area: D;
    }
    .item:nth-child(5) {
      grid-area: E;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">
        <div className="item">
          <img src="/1.jpeg" alt="" />
        </div>
        <div className="item">
          <img src="/2.webp" alt="" />
        </div>
        <div className="item">
          <img src="/3.jpeg" alt="" />
        </div>
        <div className="item">
          <img src="/4.webp" alt="" />
        </div>
        <div className="item">
          <img src="/5.jpeg" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
