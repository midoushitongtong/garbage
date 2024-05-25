'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  color: #000;
  padding: 5px;
  margin: 1rem;
  background: repeating-linear-gradient(
      -45deg,
      #06f,
      #06f 10px,
      #fff 10px,
      #fff 20px,
      #f60 20px,
      #f60 30px,
      #fff 30px,
      #fff 40px
    ) -20px -20px/200% 200%;
  transition: all 0.3s;
  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
    background-position: 0 0;
  }

  div {
    padding: 1rem;
    background-color: #fff;
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
