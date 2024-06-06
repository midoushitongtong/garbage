'use client';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const globalStyles = css`
  body {
    background-color: #ccc;
  }
`;

const Container = styled.section`
  display: flex;
  .cup {
    margin: 3rem auto;
    width: 160px;
    height: 162px;
    position: relative;
    &::before {
      content: '';
      height: 20px;
      width: 100%;
      position: absolute;
      top: -10px;
      left: 0;
      background-color: rgba(245, 245, 245, 0.5);
      z-index: 1;
      border-radius: 50%;
    }
    .cup-body {
      height: 100%;
      background-color: rgba(245, 245, 245, 0.75);
      clip-path: path(
        'm 0 0 q 4.59 145.8 34.425 155.52 c 29.835 8.1 68.85 8.1 96.39 0 q 29.835 -9.72 29.835 -155.52 C 143 11 16 13 0 0 Z'
      );
      display: flex;
      flex-direction: column-reverse;
      .layer {
        text-align: center;
        height: 30px;
        border-radius: 80px / 10px;
        position: relative;
        &:nth-child(n + 2) {
          margin-bottom: -10px;
        }
        &.espresso {
          background-color: #06f;
        }
        &.whisky {
          background-color: #f60;
        }
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="cup">
        <div className="cup-body">
          <div className="layer espresso"></div>
          <div className="layer whisky"></div>
        </div>
      </div>
      <Global styles={globalStyles} />
    </Container>
  );
};

export default PageContent;
