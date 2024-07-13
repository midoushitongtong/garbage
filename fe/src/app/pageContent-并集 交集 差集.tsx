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

const arr1 = [11, 22, 33, 44, 55];
const arr2 = [11, 22, 33, 44, 55, 66, 77];

// 并集
const union = [...new Set([...arr1, ...arr2])];
console.log(union);

// 交集
const cross = [...new Set(arr1)].filter((item) => arr2.includes(item));
console.log(cross);

// 差集
const diff = union.filter((item) => !cross.includes(item));
console.log(diff);

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
