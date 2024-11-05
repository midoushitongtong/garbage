'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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

const PageContent = () => {
  useEffect(() => {
    function concurRequest(urls: string[], maxNum: number = 3) {
      if (urls.length === 0) {
        return Promise.resolve([]);
      }

      return new Promise((resolve) => {
        let index = 0; // 当前请求的索引
        let completeCount = 0; // 当前请求完成的数量
        const results: any[] = []; // 保存 api 请求的结果

        const _request = async () => {
          const currentIndex = index;
          const url = urls[currentIndex];
          index++;
          try {
            const result = await fetch(url);
            results[currentIndex] = await result.json();
          } catch (error) {
            results[currentIndex] = error;
          } finally {
            completeCount++;
            if (completeCount === urls.length) {
              resolve(results);
            }
            if (index < urls.length) {
              _request();
            }
          }
        };

        for (let i = 0; i < maxNum; i++) {
          _request();
        }
      });
    }

    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/1',
    ];

    concurRequest(urls, 2).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
