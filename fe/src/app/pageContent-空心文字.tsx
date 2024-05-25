'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #000;

  div {
    font-size: 5rem;
    color: #000;
    text-shadow:
      1px 0 #fff,
      1px 1px #fff,
      1px -1px #fff,
      0 1px #fff,
      0 -1px #fff,
      -1px 0#fff,
      -1px 1px #fff,
      -1px -1px #fff;
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
