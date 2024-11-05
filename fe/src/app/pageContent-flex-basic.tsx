'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  .content {
    display: flex;
    .item {
      flex-grow: 1; // 占用剩余空间比例
      flex-basis: 0; // 将初始宽度设为 0 不然得话如果当元素有内容默认会占用一部分宽度，导致容器被撑开
      height: 100vh;
      &:nth-child(1) {
        background-color: #b6cb13;
      }
      &:nth-child(2) {
        background-color: #f60;
      }
      &:nth-child(3) {
        background-color: #06f;
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
        <div className="item">123123123123123123123123123123123</div>
        <div className="item"></div>
        <div className="item"></div>
      </div>
    </Container>
  );
};

export default PageContent;
