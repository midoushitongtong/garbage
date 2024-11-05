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
  background-color: #333;

  .content {
    font-size: 5rem;
    text-align: center;
    color: #06f;
    span {
      animation: colorChange 0s infinite alternate;
      @keyframes colorChange {
        100% {
          color: #f60;
        }
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  const str = 'Hello World';

  return (
    <Container>
      <div className="content">
        {str.split('').map((item, index) => (
          <span
            key={index}
            style={{
              animationDuration: `${str.length * 0.1}s`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default PageContent;
