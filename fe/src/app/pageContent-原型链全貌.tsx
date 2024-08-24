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

function a() {}
// 给函数的原型对象上赋值
a.prototype.test = '123';

// 创建对象
// @ts-ignore
const obj = new a();
console.log(obj.test);

/**
 * 原型链的关系:
 * obj.__proto__ 指向 a.prototype (指向 function a 的 prototype)
 * a.prototype.__proto__ 指向 Object.prototype (指向 Object 根对象的 prototype)
 * Object.prototype.__proto__ 指向 null
 *
 * 只有函数有原型链, 原型链可以实现成员的继承, 当我们访问某个对象上的成员属性/方法, 如果自身对象没有
 * 就会从原型链 __proto__ 上寻找, 如果 __proto__ 没有, 会继续会上一层的 __proto__ 继续寻找
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
