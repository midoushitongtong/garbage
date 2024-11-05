'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';

const generateListItemStyle = () => {
  const styles: SerializedStyles[] = [];

  const step = 360 / 6;
  for (let i = 0; i < 6; i++) {
    const deg = i * step;
    styles.push(css`
      &:nth-child(${i + 1}) {
        transform: rotate(${deg}deg);
        .list-item-content {
          transform: rotate(-${deg}deg);
          .list-item-content-inner {
            animation: listItemContentInnerAnimation 10s linear infinite;
            @keyframes listItemContentInnerAnimation {
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
    width: 300px;
    height: 300px;
    border: 1px solid #06f;
    border-radius: 50%;
    position: relative;
    animation: contentAnimation 10s linear infinite;
    @keyframes contentAnimation {
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
        width: 50px;
        height: 50px;
        background-color: #06f;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: -25px;
        margin-left: -25px;
        transform-origin: center ${300 / 2 + 50 / 2}px;
        ${generateListItemStyle()}
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
        <div className="list">
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">1</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">2</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">3</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">4</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">5</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-content-inner">6</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
