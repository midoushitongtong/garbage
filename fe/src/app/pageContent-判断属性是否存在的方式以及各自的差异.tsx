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
 * 判断属性是否存在
 * 1. Object.keys()
 *  是否过滤原型链上的属性:                        过滤
 *  是否过滤不可被枚举的属性 (enumerable: false):  过滤
 *
 * 2. hashOwnProperty 和 Reflect.ownKeys()
 *  是否过滤原型链上的属性:                        过滤
 *  是否过滤不可被枚举的属性 (enumerable: false):  不过滤
 *
 * 3. in
 *  是否过滤原型链上的属性:                        不过滤
 *  是否过滤不可被枚举的属性 (enumerable: false):  不过滤
 */

function Obj() {}
// @ts-ignore
Obj.prototype.a = '1';

const obj = new Proxy(
  // @ts-ignore
  new Obj(),
  {
    get(obj, prop) {
      // @ts-ignore
      return obj[prop];
    },
    set(obj, key, val) {
      // @ts-ignore
      obj[key] = val;

      Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
      });
      return true;
    },
    // ownKeys() {
    //   return ['a'];
    // },
  }
);

obj.b = '2';

console.log(Object.keys(obj)); // []
console.log(obj.hasOwnProperty('b')); // true
console.log('a' in obj); // true

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
