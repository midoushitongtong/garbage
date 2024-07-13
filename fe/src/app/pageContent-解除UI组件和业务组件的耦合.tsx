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
    font-size: 5rem;
    text-align: center;
  }
`;

/**
 * 在实际开发中经常会遇到CRUD的场景
 * 为了复用代码，通常会将添加和修改共用一个组件，提到代码的复用性
 * 这样做的坏处是，添加和修改的逻辑都在一个组件，不利于维护
 * 我们可以将表单组件单独抽离出来，表单组件只负责UI，业务组件负责具体的添加和修改逻辑
 *
 * 原来的做法：
 *  Submit.tsx // 包含了添加修改的逻辑和UI
 * 解耦的做法：
 *  Form.tsx // 只负责UI
 *  Add.tsx // 只负责添加逻辑，内部引入Form组件
 *  Edit.tsx // 只负责修改逻辑，内部引入Form组件
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
