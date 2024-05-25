'use client';
import styled from '@emotion/styled';

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

// console.debug('debug');

// console.log('log');

// console.info('info');

// console.table([
//   {
//     name: 'aaa',
//   },
//   {
//     name: 'bbb',
//   },
// ]);

// console.group('group 1');
// console.log('aaa');
// console.log('bbb');
// // console.groupCollapsed();
// console.groupEnd();

// console.time('loop');
// const s = Date.now();
// while (Date.now() - s < 100);
// console.timeEnd('loop');

// console.count('123');
// console.count('123');
// console.count('123');

// function b() {
//   console.trace();
// }
// function a() {
//   b();
// }
// a();

// console.assert(1 + 1 == 3);

// console.warn('123');

// console.log(123);
// console.clear();

console.log(
  '%c123',
  `
  background: #06f;
  padding: 5px;
  color: #fff;
`
);

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
