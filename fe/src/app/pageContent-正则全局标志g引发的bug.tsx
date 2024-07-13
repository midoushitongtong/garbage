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

const reg = /^1\d{10}/g;
console.log(reg.test('13000000000'));
console.log(reg.lastIndex);

console.log(reg.test('13000000000'));

/**
 * 以上结果第一个会打印 true 第二个会打印 false
 * 这是一个正则表达式 g 全局标志的 bug
 * 如果有 g 全局标志, 每次 test 的时候都会用上一次匹配结束的位置开始找
 *  - 第一次 log 后, lastIndex 为 11
 *  - 第二个 log 会从 11 的位置开始匹配，自然就是 false
 * 两种修复方式
 *  - 去掉 g 全局标志，/^1\d{10}/
 *  - 第一次 log 后手动修改 lastIndex 为 0，reg.lastIndex = 0
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
