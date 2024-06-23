'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Container = styled.section`
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
  const [content, setContent] = useState('Hello World');
  const { ref, size } = useSize();

  const addContent = () => {
    setContent((prev) => prev + ' Hello World');
  };

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <button onClick={addContent}>add content</button>
      {JSON.stringify(size)}
      <div ref={ref} className="content">
        {content}
      </div>
    </Container>
  );
};

const useSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const r = ref.current;

    if (!r) {
      return;
    }

    const ob = new ResizeObserver((entries) => {
      const entrie = entries[0];
      setSize({
        width: entrie.contentRect.width,
        height: entrie.contentRect.height,
      });
    });

    ob.observe(r);

    return () => {
      ob.disconnect();
    };
  }, []);

  return {
    ref,
    size,
  };
};

export default PageContent;
