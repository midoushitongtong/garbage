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

const arr = [{ n: 1 }];
console.log(arr);
arr[0].n++;
console.log(arr);

/**
 * 会发现控制台两次打印的结果相同
 * 是因为chrome只有在真正读取对象内容的时候才会从内存中读取数据
 * 两个对象用的同一块内存空间，就会导致打印的结果相同
 *
 * 解决方法: 使用 debugger 或者 JSON.stringify() 转为字符串
 *
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
