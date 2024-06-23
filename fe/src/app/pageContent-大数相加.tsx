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

function sum(a: string, b: string) {
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, '0');
  b = b.padStart(maxLength, '0');
  let c = '';
  let d = 0;
  for (let i = maxLength - 1; i >= 0; i--) {
    let temp = +a[i] + +b[i] + d;
    d = Math.floor(temp / 10);
    c = (temp % 10) + c;
  }
  if (d) {
    c = '1' + c;
  }
  return c;
}

// 9 9 9 9
// 9 9 9 9
// 18
// 1

console.log(sum('888', '112'));

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
