'use client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const generateItemStyle = () => {
  let styles = [];
  const n = 6;
  const step = 360 / n;
  const radius = 125;
  for (let i = 0; i <= n; i++) {
    const angle = step * i * (Math.PI / 180);
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    styles.push(css`
      &:nth-child(${i + 1}) {
        transform: translate(${x}px, ${y}px);
      }
    `);
  }
  return css(styles);
};

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
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(to right, #b6cb13, #f60);
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: #fff;
      transform: translate(-50%, -50%);
    }
    animation: contentRotateAnimation 10s linear infinite;
    @keyframes contentRotateAnimation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .list {
      .list-item {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --width: 50px;
        width: var(--width);
        height: var(--width);
        margin-top: calc(-1 * var(--width) / 2);
        margin-left: calc(-1 * var(--width) / 2);
        background-color: #06f;
        border-radius: 50%;
        color: #fff;
        ${generateItemStyle()}
        .list-item-content {
          animation: listItemContentAnimation 10s linear infinite;
          @keyframes listItemContentAnimation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
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
      <div className="content">
        <div className="inner"></div>
        <div className="list">
          <div className="list-item">
            <div className="list-item-content">1</div>
          </div>
          <div className="list-item">
            <div className="list-item-content">2</div>
          </div>
          <div className="list-item">
            <div className="list-item-content">3</div>
          </div>
          <div className="list-item">
            <div className="list-item-content">4</div>
          </div>
          <div className="list-item">
            <div className="list-item-content">5</div>
          </div>
          <div className="list-item">
            <div className="list-item-content">6</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
