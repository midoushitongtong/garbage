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

const PageContent = () => {
  useEffect(() => {
    const arr = [1, 2, 3, 4, 5, 6];

    let sumData = 0;
    for (let i = 0; i < arr.length; i++) {
      sumData += arr[i];
    }
    console.log(sumData);

    // 循环转递归
    const sum = (arr: number[], index = 0): number => {
      // 递归终止条件
      if (index >= arr.length) {
        return 0;
      }
      // 逻辑代码
      return arr[index] + sum(arr, index + 1);
    };

    console.log(sum(arr));
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
