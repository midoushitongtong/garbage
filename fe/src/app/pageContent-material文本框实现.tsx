'use client';
import styled from '@emotion/styled';
import { useId } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem;

  .form-item {
    position: relative;
    label {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #cccc;
      padding: 0.5rem;
      pointer-events: none;
      transition: all 0.3s ease;
    }
    input {
      padding: 0.5rem;
      border: none;
      border-bottom: 2px solid #06f;
      outline: none;
      &:focus {
        & ~ .bar {
          width: 100%;
        }
      }
      &:focus,
      &:valid {
        & ~ label {
          transform: translateY(-100%);
        }
      }
    }
    .bar {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: #f60;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
  }
`;

const PageContent = () => {
  const textId = useId();

  return (
    <>
      <Container className="container">
        <div className="form-item">
          <input id={textId} required type="text" />
          <label htmlFor={textId}>UserName</label>
          <span className="bar"></span>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
