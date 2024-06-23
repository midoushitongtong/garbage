'use client';
import styled from '@emotion/styled';
import { deepEqual } from 'assert';
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

(async () => {
  function deppClone(obj: object) {
    return new Promise((resolve) => {
      const { port1, port2 } = new MessageChannel();
      port1.onmessage = (e) => {
        resolve(e.data);
      };
      port2.postMessage(obj);
    });
  }
  const obj = {
    a: 1,
    b: 2,
    c: {
      d: 1,
    },
  };
  const obj2 = await deppClone(obj);
  console.log(obj2);
  console.log(obj2 === obj);
})();

// function dc(value: any) {
//   if (typeof value === 'object' && value !== null) {
//     return value;
//   }

//   const result: any = Array.isArray(value) ? [] : {};

//   for (const key in value) {
//     result[key] = dc(value[key]);
//   }

//   return result;
// }

// console.log(
//   dc({
//     a: 1,
//     b: 2,
//     c: {
//       d: 1,
//     },
//   })
// );

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
