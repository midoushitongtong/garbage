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

// 前瞻运算符
// 使用前瞻运算符可以不消耗目标字符串
const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@,_.])[a-zA-Z\d$@,_.]{6,12}$/;

console.log(reg.test('aA1@11'));

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
