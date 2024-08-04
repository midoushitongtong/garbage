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
 * 深度克隆的解决方案
 *
 * 1. 序列化 JSON.parse(JSON.stringify({}))
 *    缺点：不能克隆函数, Map, Set, Date
 * 2. 正常递归实现
 * 3. MessageChannel API
 */
function deepClone(value: any) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const result: any = Array.isArray(value) ? [] : {};
  // 保留对象的原型
  Object.setPrototypeOf(result, Object.getPrototypeOf(value));
  for (const key in value) {
    // 防止克隆原型上的属性
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}

class Test {
  a() {
    console.log(1);
  }
}

console.log(deepClone({ a: new Test() }).a.a);

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
