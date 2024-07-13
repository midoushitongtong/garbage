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

const PageContent = () => {
  const handleCopy = async (e: ClipboardEvent) => {
    e.preventDefault();
    // 设置剪切板内容
    await navigator.clipboard.writeText('233');
    // 获取用户选中的文字
    console.log(window.getSelection()?.toString());
  };

  useEffect(() => {
    console.log('Hello World');

    window.addEventListener('copy', handleCopy);
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
