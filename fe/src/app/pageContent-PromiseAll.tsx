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

Promise.myAll = function (promiseList) {
  let resolve;
  let reject;
  const p = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const resultList = [];
  let count = 0;
  let fullfiledCount = 0;
  for (const promise of promiseList) {
    const i = count;
    count++;
    Promise.resolve(promise).then((result) => {
      resultList[i] = result;
      fullfiledCount++;
      if (fullfiledCount === count) {
        resolve(resultList);
      }
    }, reject);
  }
  if (count === 0) {
    resolve(resultList);
  }
  return p;
};

Promise.myAll([1, 2, 3]).then((res) => {
  console.log(res);
});

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
