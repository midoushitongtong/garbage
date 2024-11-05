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

console.log(0.1 + 0.2 === 0.3); // false
/**
 * 小数运算不精确的原因:
 * 0.1和0.2是十进制的小数，但在计算内部是使用二进制来表示这些小数，而二进制是无法精确表示某些十进制的小数的，比如0.1和0.2
 * 0.1和0.2这样的十进制小数在二进制中是无限循环的，因此计算在计算过程中会进行截断，导致结果不准确
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
