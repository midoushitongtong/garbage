'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    border-radius: 20px;
    color: #fff;
    background-color: #000;
    overflow: hidden;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      z-index: -1;
      background-color: #f60;
      animation: rotate 3s infinite linear;
      transform-origin: 0 0;
      @keyframes rotate {
        to {
          transform: rotate(1turn);
        }
      }
    }
    &::after {
      content: '';
      z-index: -1;
      position: absolute;
      background-color: #000;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      left: 2px;
      right: 2px;
      border-radius: 20px;
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
