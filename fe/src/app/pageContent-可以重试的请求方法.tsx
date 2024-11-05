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

// 可以重试的请求方法
const request = (url: string, maxCount = 5): Promise<Response> => {
  return fetch(url).catch((err) => (maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)));
};

request('https://aaaaaaaaaabbbbbbbbb.com')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
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
