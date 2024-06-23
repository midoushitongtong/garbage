'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

function processTask<T extends any[]>(...tasks: { [K in keyof T]: () => Promise<T[K]> | T[K] }) {
  let isRunning = false;
  let i = 0;
  const results: Partial<T>[] = [];
  let prom: Promise<any> | null = null;

  return {
    async start(): Promise<T> {
      return new Promise(async (resolve, reject) => {
        if (prom) {
          prom.then(resolve, reject);
          return;
        }
        if (isRunning) {
          return;
        }
        isRunning = true;
        while (i < tasks.length) {
          console.log(`${i} 执行中`);
          try {
            const result = await tasks[i]();
            results.push(result);
          } catch (error) {
            isRunning = false;
            prom = Promise.reject(error);
            reject(error);
            return;
          }
          i++;
          if (!isRunning && i < tasks.length - 1) {
            return;
          }
        }
        isRunning = false;
        prom = Promise.resolve(results);
        resolve(results as T);
      });
    },
    pause() {
      isRunning = false;
    },
  };
}

const process = processTask(
  () => 1,
  () => new Promise<string>((resolve) => setTimeout(() => resolve('2'), 1000)),
  () => 3
);

process.start();
process.pause();

setTimeout(() => {
  process.start();
}, 3000);

export default PageContent;
