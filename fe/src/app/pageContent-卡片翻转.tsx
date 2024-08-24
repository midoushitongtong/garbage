'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    position: relative;
    width: 100px;
    height: 100px;
    perspective: 500px;
    &:hover {
      .front {
        transform: rotateY(-180deg);
      }
      .back {
        transform: rotateY(0);
      }
    }
    .front,
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      transition: all 1s ease;
      backface-visibility: hidden;
    }
    .front {
      background: #06f;
    }
    .back {
      background: #f60;
      transform: rotateY(180deg);
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div className="content">
          <div className="front">Hello World</div>
          <div className="back">你好世界</div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
