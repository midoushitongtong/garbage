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

const obj = {
  a: 1,
  b: 2,
};

// 设置属性描述符
Object.defineProperty(obj, 'a', {
  enumerable: false,
});
// 获取属性描述符
console.log(Object.getOwnPropertyDescriptor(obj, 'a'));

for (const k in obj) {
  console.log(k);
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
