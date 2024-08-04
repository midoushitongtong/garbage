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
 * js 的 == 比较规则
 * 1. 两端类型相同，比较值
 * 2. 两端都是 NaN，返回 false
 * 3. undefined 和 null 只有与自身比较或者相互比较才是 true 其他都是 false
 * 4. 两端都是原始值, 都会转成 number 进行比较
 * 5. 一端是原始类型，一端是对象, 会把对象转成原始值进行运算
 *    对象转原始值的逻辑
 *      1. [Symbol.toPrimitive]
 *      2. valueOf()
 *      3. toString()
 */

const a = {
  count: 1,
  [Symbol.toPrimitive]() {
    return this.count++;
  },
  // valueOf() {},
  // toString() {},
};

// @ts-ignore
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
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
