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

const arr = [
  { age: 1, name: '1-1', sex: '1' },
  { age: 1, name: '1-2', sex: '1' },
  { age: 1, name: '1-1', sex: '1' },
  { age: 2, name: '2-1', sex: '1' },
  { age: 2, name: '2-2', sex: '2' },
];

function groupBy<T extends {}, K extends keyof T>(arr: T[], generateKey: K | ((_item: T) => string)) {
  const _generateKey = (item: T) => {
    if (typeof generateKey === 'function') {
      return generateKey(item);
    }
    return item[generateKey];
  };

  const result: any = {};

  for (const item of arr) {
    const key = _generateKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

console.log(groupBy(arr, 'age'));
console.log(groupBy(arr, (item) => item.sex));

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
