'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;

  // 使用 padding-bottom 实现宽高比
  .container-1 {
    width: 100%;
    position: relative;
    &::after {
      content: '';
      display: block;
      padding-bottom: 50%;
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f60;
    }
  }

  // 使用 aspect-radio 实现宽高比
  .container-2 {
    background-color: #06f;
    aspect-ratio: 2 / 1;
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div className="container-1">
          <div className="content">Hello Wolrd</div>
        </div>
        <div className="container-2">
          <div className="content">Hello Wolrd</div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
