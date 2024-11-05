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

// 函数签名
// 函数签名 = 函数名 + 参数 + 返回值
// 函数签名的重要性: 用来引导函数的具体实现
// 函数签名的作用: 降低调用者的心智负担, 调用者只需要知道函数名 + 参数 + 返回值就可以, 不需要知道里面的具体实现

/**
 * 判断一个数是不是偶数 (函数名)
 *
 * @param value (参数)
 */
function isEven(value: number) {
  return value % 2 === 0; // (返回值)
}

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
