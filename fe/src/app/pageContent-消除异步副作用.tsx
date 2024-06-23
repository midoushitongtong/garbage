'use client';
import styled from '@emotion/styled';

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

const runOnBrowser = () => {
  if (!globalThis.document) {
    return;
  }

  function getUser() {
    return window.fetch('https://dog.ceo/api/breeds/image/random');
  }

  function main() {
    const user = getUser();
    console.log(user);
  }

  function run(func: Function) {
    let originFetch = fetch;
    let cache: any = {
      status: 'pending',
      data: null,
      error: null,
    };
    // @ts-ignore
    window.fetch = function (...args) {
      if (cache.status === 'fulfilled') {
        return cache.data;
      } else if (cache.status === 'rejected') {
        return cache.error;
      }
      const promise = originFetch(...args)
        .then((result) => result.json())
        .then(
          (result) => {
            cache.status = 'fulfilled';
            cache.data = result;
            cache.error = null;
          },
          (error) => {
            cache.status = 'rejected';
            cache.data = null;
            cache.error = error;
          }
        );
      throw promise;
    };

    try {
      func();
    } catch (error) {
      if (error instanceof Promise) {
        const runFunc = () => {
          func();
        };
        error.then(runFunc, runFunc);
      }
    }
  }

  run(main);
};

runOnBrowser();
const PageContent = () => {
  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
