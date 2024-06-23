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

function arrange(taskId: string) {
  const tasks: Function[] = [];
  tasks.push(() => {
    console.log(taskId);
  });

  async function execute() {
    for (const task of tasks) {
      await task();
    }
  }

  function doSometing(taskId: string) {
    tasks.push(() => {
      console.log(taskId);
    });
    // @ts-ignore
    return this as ReturnType<typeof arrange>;
  }

  function wait(second: number) {
    tasks.push(
      () =>
        new Promise((resolve) => {
          console.log(`wait ${second}s`);
          setTimeout(resolve, second * 1000);
        })
    );
    // @ts-ignore
    return this as ReturnType<typeof arrange>;
  }

  function waitFirst(second: number) {
    tasks.unshift(
      () =>
        new Promise((resolve) => {
          console.log(`wait ${second}s`);
          setTimeout(resolve, second * 1000);
        })
    );
    // @ts-ignore
    return this as ReturnType<typeof arrange>;
  }

  return {
    execute,
    do: doSometing,
    wait,
    waitFirst,
  };
}

arrange('1').wait(1).do('2').execute();

export default PageContent;
