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

const PageContent = () => {
  useEffect(() => {
    const add = new Proxy(
      {
        _store: 0,
      },
      {
        get(target, key, receiver) {
          // 原始值返回 _store
          if (key === Symbol.toPrimitive) {
            return () => {
              return target._store;
            };
          }
          // @ts-ignore
          target._store += +key;
          return receiver;
        },
      }
    );

    // @ts-ignore
    const a = add[1][2] + 3;
    // @ts-ignore
    const b = add[1][2] + 3;
    console.log(a);
    console.log(b);

    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
