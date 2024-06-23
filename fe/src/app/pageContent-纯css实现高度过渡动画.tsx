'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    .trigger {
      &:hover {
        .grid {
          grid-template-rows: 1fr;
        }
      }
      .grid {
        display: grid;
        grid-template-rows: 0fr;
        transition: 0.3s;
        overflow: hidden;
        .grid-content {
          min-height: 0;
        }
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
        <div className="trigger">
          hover me
          <div className="grid">
            <div className="grid-content">
              <h1>Hello World</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
