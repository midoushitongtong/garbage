'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;

  div {
    flex-basis: 0; // 决定在剩余空间分配之前的初始大小
    flex-grow: 1; // 决定在剩余空间分配的增长比
    /* flex: 1; // flex-grow: 1; flex-shrink: 0; flex-basic: 0; */
    height: 100vh;
    &:nth-child(1) {
      background: #f60;
    }
    &:nth-child(2) {
      background: #06f;
    }
    &:nth-child(3) {
      background: #f30;
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>123123123123123123</div>
        <div></div>
        <div></div>
      </Container>
    </>
  );
};

export default PageContent;
