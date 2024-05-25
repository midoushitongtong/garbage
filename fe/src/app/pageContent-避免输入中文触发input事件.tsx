'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

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
  const isComposition = useRef(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('value: ', value);
  }, [value]);

  return (
    <>
      <Container className="container">
        <input
          type="text"
          onChange={(r) => {
            if (!isComposition.current) {
              setValue(r.target.value);
            }
          }}
          onCompositionStart={() => (isComposition.current = true)}
          onCompositionEnd={(e) => {
            isComposition.current = false;
            setValue((prev) => prev + e.data);
          }}
        />
      </Container>
    </>
  );
};

export default PageContent;
