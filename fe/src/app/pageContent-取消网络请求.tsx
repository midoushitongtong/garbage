'use client';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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

const PageContent = () => {
  const [value, setValue] = useState('');
  const [imageURL, setImageURL] = useState('');
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    const handle = async () => {
      if (!value) {
        return;
      }
      try {
        // 如果存在之前的 abortController，则取消之前的请求
        abortControllerRef.current && abortControllerRef.current.abort('请求被中断');

        // 创建新的 abortController
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        // 发起新的 fetch 请求
        await fetch('https://dog.ceo/api/breeds/image/random', {
          signal: abortController.signal,
        });
      } catch (e) {
        console.log(e);
      }
    };

    handle();
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <Container>
      <input type="text" onChange={handleChange} />
      {/* @ts-ignore */}
      <img src={imageURL} alt="" />
    </Container>
  );
};

export default PageContent;
