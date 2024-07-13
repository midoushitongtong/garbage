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

const PageContent = () => {
  useEffect(() => {
    const a = 1;
    // @ts-ignore
    window.a = 2;

    const code = 'console.log(a)';

    // eval, 同步执行, 使用当前作用域
    eval(code);

    // setTimeout, 异步执行, 使用全局作用域
    setTimeout(code, 0);

    // script, 同步执行, 使用全局作用域
    const script = document.createElement('script');
    script.innerHTML = code;
    document.body.appendChild(script);

    // function, 同步执行, 使用全局作用域
    const fn = new Function(code);
    fn();
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
