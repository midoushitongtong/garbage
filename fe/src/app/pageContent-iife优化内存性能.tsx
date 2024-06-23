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

// 如果这个函数被调用1万次，那么内存占用可能会忽上忽下，因为每次调用都会声明 reg 和 replacement 变量占据内存空间
const removeSpace = (str: string) => {
  const reg = /\s/g;
  const replacement = '';
  return str.replace(reg, replacement);
};
console.log(removeSpace('123 456 789'));

// 使用 IIFE 立即执行函数优化内存占用
// 这种情况下 reg 和 replacement 只会声明一次, 解决内存忽上忽下的问题
// 这样会有2个问题
// 1: reg 和 replacement 一开始就占用了内存，如果没有用到这个方法，那么就会造成内存浪费
// 2. 由于这是一个闭包 reg 和 replacement 无法被销毁, 会一直占用内存
const removeSpace2 = (() => {
  const reg = /\s/g;
  const replacement = '';
  return (str: string) => {
    return str.replace(reg, replacement);
  };
})();
console.log(removeSpace2('123 456 789'));

// 使用高阶函数解决一开始内存占用的问题
const createRemoveSpace = () => {
  const reg = /\s/g;
  const replacement = '';
  return (str: string) => {
    return str.replace(reg, replacement);
  };
};
let removeSpace3: ReturnType<typeof createRemoveSpace> | null = createRemoveSpace();
console.log(removeSpace3('123 456 789'));
removeSpace3 = null;

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
