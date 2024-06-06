'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    height: 100px;
    font-size: 5rem;
    text-align: center;
    border: 1px solid #f60;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
    .text {
      // 如果父元素设置了 transform, filter, backdrop-filter, perspective 那么就会基于此父元素进行定位
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const PageContent = () => {
  return (
    <Container className="container">
      <div className="content">
        <div className="text">Helo World</div>
      </div>
    </Container>
  );
};

export default PageContent;
