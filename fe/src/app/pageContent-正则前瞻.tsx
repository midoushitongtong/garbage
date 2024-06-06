'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
  }
`;

const PageContent = () => {
  const str = '1000000';
  useEffect(() => {
    console.log(str.replace(/(?=\B(\d{3})+$)/g, ','));
  }, []);
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
