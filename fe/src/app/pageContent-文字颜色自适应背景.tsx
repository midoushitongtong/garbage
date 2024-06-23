'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;

  .content {
    text-align: center;
    background: linear-gradient(60deg, #000 50%, #fff 50%);
    border: 5px solid #06f;
    border-image: linear-gradient(to right, #b6cb13, #f60) 1;
    padding: 2rem;
    width: 300px;
    &:hover {
      .title {
        transform: translateX(-50px);
      }
    }
    .title {
      transition: all 0.3s ease;
      mix-blend-mode: difference;
      color: #fff;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <div className="title">Hello World</div>
      </div>
    </Container>
  );
};

export default PageContent;
