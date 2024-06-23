'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

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

const arr = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 4 },
];

function isObject(val: any) {
  return typeof val === 'object' && val !== null;
}

function equals(a: any, b: any) {
  if (isObject(a) && isObject(b)) {
    const k1 = Object.keys(a);
    const k2 = Object.keys(b);
    if (k1.length !== k2.length) {
      return false;
    }
    for (const k of k1) {
      if (!k2.includes(k)) {
        return false;
      }
      if (!equals(a[k], b[k])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}

function unique(arr: any) {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (equals(newArr[i], newArr[j])) {
        newArr.splice(j, 1);
        j--;
      }
    }
  }
  return newArr;
}

console.log(unique(arr));

export default PageContent;
