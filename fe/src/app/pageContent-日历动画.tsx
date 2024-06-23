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
  background-color: #333;

  .content {
    position: relative;
    width: 200px;
    height: 200px;
    text-align: center;
    background-color: #fff;
    perspective: 500px;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #333;
      transform: translateY(-50%);
    }
    &:hover {
      .card-item {
        &.card-2 {
          transform: rotateX(0);
        }
        &.card-3 {
          transform: rotateX(-180deg);
        }
      }
    }
    .card-item {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      font-size: 10rem;
      line-height: 200px;
      transition: all 0.3s ease;
      &.card-1 {
        background-color: #06f;
      }
      &.card-2 {
        z-index: 1;
        top: 50%;
        line-height: 0;
        background-color: #06f;
        transform-origin: top center;
        transform: rotateX(180deg);
        backface-visibility: hidden;
      }
      &.card-3 {
        z-index: 1;
        background-color: #f60;
        transform-origin: bottom center;
        backface-visibility: hidden;
      }
      &.card-4 {
        top: 50%;
        line-height: 0;
        background-color: #f60;
      }
    }
  }
`;

const PageContent = () => {
  return (
    <Container>
      <div className="content">
        <div className="card-item card-1">4</div>
        <div className="card-item card-2">4</div>
        <div className="card-item card-3">3</div>
        <div className="card-item card-4">3</div>
      </div>
    </Container>
  );
};

export default PageContent;
