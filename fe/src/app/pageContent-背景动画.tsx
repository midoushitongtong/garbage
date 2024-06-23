'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    span {
      font-size: 5rem;
      text-align: center;
      transition: background-size 0.75s linear;
      background: linear-gradient(to right, #b6cb13, #f60) no-repeat right bottom;
      background-size: 0 2px;
      &:hover {
        background-position-x: left;
        background-size: 100% 2px;
      }
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
        <span>Hello World Hello World Hello World Hello World Hello World Hello World</span>
      </div>
    </Container>
  );
};

export default PageContent;
