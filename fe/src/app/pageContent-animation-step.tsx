'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  perspective: 500px;

  div {
    width: 50px;
    height: 128px;
    background-image: url('/user-avatar.png');
    background-size: 128px 128px;
    background-repeat: no-repeat;
    // step 将动画分成 10 份
    animation: run 1s steps(10) infinite;
    @keyframes run {
      from {
        background-position-x: 0;
      }
      to {
        background-position-x: -128px;
      }
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
