'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
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
资源提示符
async 用于 script 标签
  <script async /> 的情况下，不会阻塞 dom 的解析和渲染，资源加载完成后会马上执行
defer 用于 script 标签
  <script defer /> 的情况下，不会阻塞 dom 的解析和渲染，资源加载完成后不会马上执行，会等待所有 dom 加载完成才执行 js (DOMContentLoaded)
通常情况
  <script /> 没有加任何资源提示符的情况下，js 加载以及执行会阻塞主线程的 dom 的解析和渲染
  <script type="module" /> 如果是是 module 类型的 js 资源, 默认就是 defer

preload 用于预加载资源
  <link rel="preload" as="css/js" /> 的情况下，会立即加载资源，资源加载完成不会应用到页面中，用于作缓存，将来要用到的时候直接从缓存中拿
prefetch 用于预加载资源
  <link rel="prefetch" as="css/js" /> 的情况下，会在空闲的时候加载资源，资源加载完成不会应用到页面中，用于作缓存，将来要用到的时候直接从缓存中拿

prerender
  <link rel="prerender" /> prerender 是一个 HTML 链接关系（rel）类型，通常用于优化用户体验，通过在后台预渲染整个页面或部分页面内容，
preconnect
  <link rel="preconnect" /> 提前建立与目标域的连接（DNS 解析、TCP 握手、TLS 协商），减少后续资源请求的延迟。
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
