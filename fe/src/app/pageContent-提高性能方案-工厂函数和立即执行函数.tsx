'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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

// 利用工厂函数和立即执行函数来提高程序性能, 原理都是根据运行时动态生成适当的函数, 而不是每次调用的时候进行条件判断

// 工厂函数
// 优点: 不会有而外的性能消耗
// 缺点: 比较繁琐, 需要单独声明一个变量, 接收新的函数
// function createCopyText() {
//   if (navigator.clipboard) {
//     return (text: string) => {
//       navigator.clipboard.writeText(text);
//     };
//   } else {
//     return (text: string) => {
//       const textarea = document.createElement('textarea');
//       textarea.value = text;
//       document.body.appendChild(textarea);
//       textarea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textarea);
//     };
//   }
// }
// const copyText = createCopyText();

// 立即执行函数 (iife)
// 优点: 简化调用, 纯函数风格
// 缺点: 有一定的而外性能消耗
const copyText = (() => {
  if (navigator.clipboard) {
    return (text: string) => {
      navigator.clipboard.writeText(text);
    };
  } else {
    return (text: string) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };
  }
})();

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
      <Button variant="contained" onClick={() => copyText('Hello World')}>
        Copy
      </Button>
    </Container>
  );
};

export default PageContent;
