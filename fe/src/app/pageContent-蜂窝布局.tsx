'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  .content {
    font-size: 5rem;
    text-align: center;
    --size: calc(100vw / 10);
    padding-top: calc(var(--size) / 6);
    .list {
      width: 100%;
      display: flex;
      margin-top: calc(-1 * var(--size) / 6);
      &:nth-child(even) {
        transform: translateX(calc(-1 * var(--size) / 2));
      }
      .list-item {
        width: var(--size);
        height: var(--size);
        background-color: #06f;
        /* 利用裁剪路径 */
        clip-path: polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        transition: all 0.3s;
        &:hover {
          transform: scale(1.1);
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
        <div className="list">
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
        </div>
        <div className="list">
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          {/* 偶数行有11个 */}
          <div className="list-item"></div>
        </div>
        <div className="list">
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
          <div className="list-item"></div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
