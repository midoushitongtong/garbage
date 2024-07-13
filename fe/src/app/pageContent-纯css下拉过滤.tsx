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
    width: 200px;
    position: relative;
    input {
      width: 100%;
      height: 40px;
      outline: none;
      border: 1px solid #666;
      &:focus + .select-container {
        .select-content {
          /* grid-template-rows: 1fr; */
          transform: scaleY(1);
        }
      }
    }
    .select-container {
      overflow: hidden;
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      transition: all 0.3s;
      .select-content {
        /* display: grid;
        grid-template-rows: 0fr;
        transition: 0.3s;
        overflow: hidden; */
        transition: 0.3s;
        transform: scaleY(0);
        transform-origin: center top;
        border: 1px solid #ccc;
        border-top-width: 0;
        .select-list {
          /* min-height: 0; */
          .select-list-item {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #ccc;
            &:last-child {
              border-bottom-width: 0;
            }
          }
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
        <input type="text" />
        <div className="select-container">
          <div className="select-content">
            <div className="select-list">
              {new Array(5).fill(1).map((_item, index) => (
                <div key={index} className="select-list-item">
                  {index}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
