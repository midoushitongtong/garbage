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

function createCacheFunction(fn: Function) {
  const cacheResults = new Map();

  function _compareArguments(args1: any[], args2: any[]) {
    return (
      args1.length === args2.length &&
      args1.every((item, index: number) => Object.is(item, args2[index]))
    );
  }

  function _getCacheResult(args: any[]) {
    const cacheKeys = [...cacheResults.keys()];
    const cacheKey = cacheKeys.find((item) => _compareArguments(item, args));
    if (cacheKey) {
      return cacheResults.get(cacheKey);
    }
    return null;
  }

  return function (...args: any[]) {
    const cacheResult = _getCacheResult(args);

    if (cacheResult) {
      console.log('已命中缓存');

      return cacheResult;
    }
    const result = fn(...args);
    cacheResults.set(args, result);
    return result;
  };
}

const PageContent = () => {
  useEffect(() => {
    const test = createCacheFunction((a: number, b: number) => {
      return a + b;
    });

    console.log(test(1, 2));
    console.log(test(1, 2));
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
