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
  a: '张三',
  b: 30,
  get c() {
    return this.b;
  },
};
// Reflect 的本质: 调用对象的基本方法
Reflect.set(obj, 'd', '111');
console.log(obj);
// 通过 receiver 更改 this 指向
const a = Reflect.get(obj, 'd', { b: 15 });
console.log(a);

Object.defineProperty(obj, 'e', {
  get() {
    return 'e';
  },
  enumerable: true,
});
// 通过 ownKeys 拿到全部的 key
console.log(Reflect.ownKeys(obj));

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
