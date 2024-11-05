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

const str = 'aaabbb';

// 实际项目严禁这样用，可读性太差
const result = [...str].reduce(
  // 利用括号运算符, 将对象返回
  (prev: { [_key in string]: number }, item) => (prev[item]++ || (prev[item] = 1), prev),
  {}
);

console.log(result);

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
