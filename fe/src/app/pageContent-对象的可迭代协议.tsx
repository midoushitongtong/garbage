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
  useEffect(() => {
    // @ts-ignore
    Object.prototype[Symbol.iterator] = function () {
      return Object.values(this)[Symbol.iterator]();
    };

    // @ts-ignore
    const [a, b] = { a: 1, b: 2 };

    console.log(a, b);
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
