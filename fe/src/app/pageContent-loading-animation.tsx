'use client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const dotStyles = () => {
  let styles = [];
  const n = 36;
  const deg = 360 / n;
  for (let i = 1; i <= n; i++) {
    styles.push(css`
      &:nth-child(${i}) {
        transform: rotate(${deg * i}deg) translateY(-75px);
        &::before,
        &::after {
          animation-delay: -${(2000 / n) * 6 * i}ms;
        }
      }
    `);
  }

  return css(styles);
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
  background-color: #ccc;

  .loading {
    width: 150px;
    height: 150px;
    margin: 50px auto;
    position: relative;
    border-radius: 50%;
    .dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      margin-left: -5px;
      margin-top: -5px;
      transform-style: preserve-3d;
      ${dotStyles()}
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      &::before {
        background-color: #000;
        top: -100%;
        animation: before-ball-move 2s infinite;
        @keyframes before-ball-move {
          0% {
            animation-timing-function: ease-in;
          }
          25% {
            animation-timing-function: ease-out;
            transform: translate3d(0, 100%, 10px);
          }
          50% {
            animation-timing-function: ease-in;
            transform: translate3d(0, 200%, 10px);
          }
          75% {
            animation-timing-function: ease-out;
            transform: translate3d(0, 100%, -10px);
          }
        }
      }
      &::after {
        background: #fff;
        top: 100%;
        animation: after-ball-move 2s infinite;
        @keyframes after-ball-move {
          0% {
            animation-timing-function: ease-in;
          }
          25% {
            animation-timing-function: ease-out;
            transform: translate3d(0, -100%, -10px);
          }
          50% {
            animation-timing-function: ease-in;
            transform: translate3d(0, -200%, 0);
          }
          75% {
            animation-timing-function: ease-out;
            transform: translate3d(0, -100%, 10px);
          }
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
    <Container>
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  );
};

export default PageContent;
