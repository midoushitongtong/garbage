'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
  }
`;

const o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  return {
    get: function (key) {
      return obj[key];
    },
  };
})();

// 在不改变上面的代码情况下，修改闭包内部的 obj 对象
Object.defineProperty(Object.prototype, 'abc', {
  get() {
    return this;
  },
});
o.get('abc').c = '123';
console.log(o.get('c'));

// 解决方法 1. hasOwnProperty
const o2 = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  return {
    get: function (key) {
      // 判断 obj 自身有没有属性
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    },
  };
})();

// 解决方法 2. 将原型设为 null
const o3 = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  Object.setPrototypeOf(obj, null);
  return {
    get: function (key) {
      // 判断 obj 自身有没有属性
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    },
  };
})();

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
