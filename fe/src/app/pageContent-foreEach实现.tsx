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

Array.prototype.forEach = function (callback) {
  const len = this.length;
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  let k = 0;
  while (k < len) {
    if (k in this) {
      callback(this[k], k, this);
    }
    k++;
  }
};

const arr = [1, 2, 3];

arr.forEach((item) => {
  console.log(item);
});

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
