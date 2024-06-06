'use client';
import styled from '@emotion/styled';
import { GlobalStyles, css } from '@mui/material';
import { useEffect } from 'react';

const globalStyles = css`
  @media (prefers-color-scheme: dark) {
    :root {
      --color: #06f;
    }
  }
  @media (prefers-color-scheme: light) {
    :root {
      --color: #f60;
    }
  }
`;

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
    color: var(--color);
  }
`;

const PageContent = () => {
  useEffect(() => {
    const match = matchMedia('(prefers-color-scheme: light)');

    const handleChange = () => {
      console.log(match.matches);
    };

    handleChange();

    match.addEventListener('change', handleChange);

    return () => {
      match.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <Container className="container">
      <GlobalStyles styles={globalStyles} />
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
