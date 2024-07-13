'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { counter, increase } from './pageContent-ESModule符号绑定.mjs';

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

console.log(counter);
increase();
console.log(counter);

/**
 * ES Module 中的符号绑定
 * 在 ES Module 中导入和导出的变量，都是共用同一块内存空间
 * 所以我们在导出的时候，为了减少不可预测的情况，导出的数据最好设置为常量，防止外部进行修改
 */

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
