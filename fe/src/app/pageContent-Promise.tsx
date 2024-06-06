'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  private state = PENDING;
  private result = undefined;

  constructor(executor: (resolve: any, reject: any) => void) {
    const resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    const reject = (reason: any) => {
      this.changeState(REJECTED, reason);
    };
    executor(resolve, reject);
  }

  changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1);
});

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
