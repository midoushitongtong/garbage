'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  position: relative;
  .text {
    font-size: 10rem;
    font-weight: bold;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    mix-blend-mode: screen;
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <video src="/oceans.mp4" autoPlay muted loop />
        <div className="text">
          <span>你好</span>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
