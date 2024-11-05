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
 * 为什么需要箭头函数?
 * js 里面已经有函数了, 为什么要单独搞一个箭头函数出来?
 * 1. 为了消除二义性以及
 * 2. 减少调用者的心智负担
 */

// 1. 消除二义性
// 普通函数可以通过直接调用, 也可以通过 new 进行调用, 我们应该只用第一种方式, 第二种 new 应该用在 class 中
function a() {
  console.log(1);
}
a();
// @ts-ignore
new a();

// 报错，箭头函数不允许通过 new 进行调用, 因为箭头函数不继承 Object 的 prototype
const b = () => {};
// new b();

// 2. 减少调用者的心智负担
// 箭头函数不绑定 this 从而也就不会造成 this 指向的问题，箭头函数是基础词法作用域，定义函数的时候作用域就固定了

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
