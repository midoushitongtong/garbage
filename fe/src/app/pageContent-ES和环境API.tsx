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

/**
 * ES
 *  EsmaScript - 是一种脚本语言规范，JavaScript 实现了这个规范
 *  ES中定义了很多规范，例如语法(如何定义一个变量、定义一个函数、...)，标准库(Math 数学库, Date 日期库)
 * 环境API
 *  环境API是针对每个环境的不同实现
 *  例如浏览器环境中特有的API，Browser，DOM，Window，fetch，xhr
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
