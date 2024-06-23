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

function isOdd(n: number) {
  /**
   * % 余数的计算方式
   * a % b = a - b * p
   * p: a / b 的整数部分
   * 例如:
   * 3 % 2 = 3 - 2 * 1 = 1
   */
  if (typeof n !== 'number') {
    throw new TypeError(`${n} is not a nmber`);
  }

  return (
    // 适配正数的情况
    n % 2 === 1 ||
    // 适配负数的情况
    n % 2 == -1
  );
}

console.log(isOdd(1));

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
