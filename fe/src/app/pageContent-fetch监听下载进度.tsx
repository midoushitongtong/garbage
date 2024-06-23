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

function request(options: {
  url: string;
  method?: string;
  data?: any;
  onProgress?: (_data: { loaded: number; total: number }) => void;
}) {
  const { url, method = 'GET', data = null, onProgress } = options;
  return new Promise<string>(async (resolve) => {
    const response = await fetch(url, {
      method,
      body: data,
    });
    const total = +(response.headers.get('content-length') || 0);
    const decoder = new TextDecoder();
    const reader = response.body?.getReader();
    let loaded = 0;
    let body = '';
    while (1) {
      const { done, value } = (await reader?.read()) || {};
      if (done) {
        onProgress &&
          onProgress({
            loaded: total,
            total,
          });
        break;
      }
      loaded += value?.length || 0;
      onProgress &&
        onProgress({
          loaded,
          total,
        });
      body += decoder.decode(value);
    }
    resolve(body);
  });
}

const PageContent = () => {
  useEffect(() => {
    request({
      url: 'https://dog.ceo/api/breeds/image/random',
      onProgress: (data) => {
        console.log(data);
      },
    }).then((res) => {
      console.log(JSON.parse(res));
    });
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
