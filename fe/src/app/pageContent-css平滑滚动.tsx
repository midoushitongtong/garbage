'use client';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.section`
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    height: 200vh;
    color: #fff;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const globalStyles = css`
  html {
    scroll-behavior: smooth;
  }
`;

const PageContent = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Container className="container">
        <div>Hello World</div>
        <button
          onClick={() => {
            document.documentElement.scrollTop = 0;
          }}
        >
          Go Top
        </button>
      </Container>
    </>
  );
};

export default PageContent;
