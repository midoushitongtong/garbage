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

interface Point {
  x: number;
  y: number;
}

const a: keyof Point = 'x';

function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const b = {
  a: '1',
  b: 2,
};

const v1 = getValue(b, 'a');
const v2 = getValue(b, 'b');

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
