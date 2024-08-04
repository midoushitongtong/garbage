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
 * js中的引用传递
 *
 * 在js中唯一有引用传递的地方就是 import export ES6中的特性, 也叫符号绑定
 * a.js
 * export let a = 1;
 * b.js
 * import { a } from './a.js'
 * a = 2; // 会修改 a.js 中的数据
 *
 * 在js中除了 import export 其他任何地方都没有引用传递，只有值传递
 * const a = { a: 1 }
 * function test(b) {
 *  b = { a: 2 };
 * }
 * test(a)
 * 在上面的代码中, 形参b是一块单独的内存空间, 只不过指向的数据是堆中的对象和a指向的数据相同
 * 修改了形参b的数据, 赋值了一块新的内存空间, 不会影响a
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
