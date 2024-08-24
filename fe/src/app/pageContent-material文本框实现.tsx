'use client';
import styled from '@emotion/styled';
import { useEffect, useId } from 'react';

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
    .form-item {
      width: 200px;
      position: relative;
      .input {
        width: 100%;
        height: 2.5rem;
        outline: none;
        border: 0;
        border-bottom: 2px solid #ccc;
        &:focus {
          ~ .bar {
            width: 100%;
          }
        }
        &:focus,
        &:valid {
          ~ .label {
            transform: translateY(-2rem);
          }
        }
      }
      .label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        line-height: 2.5rem;
        padding-inline: 0.5rem;
        pointer-events: none;
        transition: all 0.15s linear;
      }
      .bar {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: #06f;
        transition: all 0.15s linear;
        transform: translateX(-50%);
      }
    }
  }
`;

const PageContent = () => {
  const formUserNameId = useId();

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <div className="form-item">
          <input className="input" type="text" id={formUserNameId} required />
          <label className="label" htmlFor={formUserNameId}>
            User Name
          </label>
          <span className="bar"></span>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
