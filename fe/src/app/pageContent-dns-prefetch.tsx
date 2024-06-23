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
    font-size: 5rem;
    text-align: center;
  }
`;

/**
DNS 解析优化
1. DNS 解析的过程是需要耗费时间的，DNS是有本地缓存的
2. 不管是图片, css, js 或者其他资源, 只要是网络资源, 都需要进行DNS解析
经过以上两个步骤，除了一开始加载页面的DNS解析是不能优化的，但是后续的网络资源DNS解析是可以优化的，
我们可以在页面中提前解析DNS(这个操作是异步的不会影响页面加载速度)，后续如果加载到对应的网络资源，就省去了解析DNS的步骤
具体的步骤: 
<link rel="dns-prefetch" href="https://a.com" />
<link rel="dns-prefetch" href="https://b.com" />
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
