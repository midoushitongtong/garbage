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
  border: 5px solid #f60;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .title {
    width: 100px;
    // 元素的首字符
    &::first-letter {
      font-size: 2rem;
      float: left;
      line-height: 1.35;
      margin-right: 0.5rem;
    }
    // 元素选中状态
    &::selection {
      background-color: #f60;
    }
  }
  .form-item {
    padding: 1rem;
    // 当前元素获得焦点或者子元素获得焦点时
    &:focus-within {
      background-color: #ccc;
    }
    label {
      // 判断相邻的元素有没有 required 属性
      &:has(+ input[required])::after {
        content: '*';
        color: #f60;
      }
    }
    input {
      outline: none;
      border: 1px solid #ccc;
      &:focus {
        border: 1px solid #f60;
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
      <div className="title">表单表单表单表单表单表单</div>
      <div className="form-item">
        <label htmlFor="name">name</label>
        <input type="text" id="name" required />
      </div>
      <div className="form-item">
        <label htmlFor="age">age</label>
        <input type="text" id="age" />
      </div>
    </Container>
  );
};

export default PageContent;
