'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    line-height: 12px;
    .small {
      zoom: 0.5;
      /* transform: scale(0.5);
      transform-origin: left center; */

      // zoom 和 scale 的区别
      // zoom 会重新计算自身的宽高, scale 缩小后宽高不变
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>
          <span>Hello World</span>
          <span className="small">XXXXXXX</span>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
