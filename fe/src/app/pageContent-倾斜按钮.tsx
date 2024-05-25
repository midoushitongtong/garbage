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
    color: #fff;
    background-color: #000;
    transform: skew(-30deg);
    span {
      transform: skew(30deg);
    }
    &::before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      bottom: 0;
      left: -30px;
      background: radial-gradient(circle at 0 0, transparent, transparent 30px, #000 30px);
    }
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      right: -30px;
      background: radial-gradient(circle at 100% 100%, transparent, transparent 30px, #000 30px);
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>
          <span>Hello World</span>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
