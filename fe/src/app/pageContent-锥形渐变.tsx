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
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background: conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div></div>
      </Container>
    </>
  );
};

export default PageContent;
