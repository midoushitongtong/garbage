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

// 字符串比大小
const str1 = '11-23-33-44-55';
const str2 = '11-22-33-44-55';

function* walk(str: string) {
  let n = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '-') {
      yield Number(n);
      n = '';
    } else {
      n += char;
    }
  }
  if (n) {
    yield Number(n);
  }
}

const compareStr = (str1: string, str2: string) => {
  const generator1 = walk(str1);
  const generator2 = walk(str2);
  while (1) {
    const n1 = generator1.next();
    const n2 = generator2.next();
    if (n1.done && n2.done) {
      return 0;
    } else if (n1.done) {
      return -1;
    } else if (n2.done) {
      return 1;
    } else if (n1.value > n2.value) {
      return 1;
    } else if (n1.value < n2.value) {
      return -1;
    } else {
      continue;
    }
  }
};

console.log(compareStr(str1, str2));

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
