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

// 实现一个没有侵入性的 fetch
function createFetch(timeout: number) {
  return (resource: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1]) => {
    options = options || {};
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, timeout);
    return fetch(resource, options);
  };
}

const PageContent = () => {
  const init = async () => {
    try {
      await createFetch(200)('https://dog.ceo/api/breeds/image/random');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Hello World');
    init();
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
