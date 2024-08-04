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

// 判断是否为原始值
function isPrimitive(val: any) {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
}

// 判断两个对象属性是否相同
function isEqual(obj1: Object, obj2: Object) {
  if (isPrimitive(obj1) || isPrimitive(obj2)) {
    return Object.is(obj1, obj2);
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key of Object.keys(obj1)) {
    // @ts-ignore
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

console.log(
  isEqual(
    {
      a: '1',
      b: {
        c: '3',
      },
    },
    {
      a: '1',
      b: {
        c: '3',
      },
    }
  )
);

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
