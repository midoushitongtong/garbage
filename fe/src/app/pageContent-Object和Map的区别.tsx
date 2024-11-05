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
 * {} 和 new Map
 * 普通对象 和 Map 的区别
 *
 * 1. Object 的 key 只能是字符串或者Symbol, 当 key 的类型不是这两者的情况下会转换为字符串
 * 2. Object 的 key 是无序的
 *    Map 的 key 是有序的
 *    Map 的 key 可以是任意类型
 * 3. Object 继承与 Object.prototype 会携带 Object 上的默认方法和属性
 *    Map 没有继承 Object.prototype
 * 4. 操作方式不同
 *    Object 的增删改查都是使用简单的赋值
 *    Map 提供的专门的方法 set, get, has, delete
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
