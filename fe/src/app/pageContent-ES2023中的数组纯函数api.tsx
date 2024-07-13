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

const arr = [3, 2, 1];

// ES2023 中的数组的纯函数api
console.log(arr.toSorted()); // 排序
console.log(arr.toReversed()); // 反转
console.log(arr.toSpliced(0, 1, 10)); // 替换数组中的某几项
console.log(arr.with(0, 10)); // 修改数组中的某一项

console.log(arr);

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
