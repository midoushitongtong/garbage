'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const fibonacci = (n: number) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  let p1 = 1;
  let p2 = 1;
  let r;
  for (let i = 0; i < n; i++) {
    r = p1 + p2;
    p1 = p2;
    p2 = r;
  }
  return r;
};

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
