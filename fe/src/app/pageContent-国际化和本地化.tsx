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
 * 国际化
 *  国际化是指可以根据某个地域来展示不同信息
 *    - 例如文案的展示，中国地域和美国地域他们的文案就有所不同，分别展示中文和英文
 *
 * 本地化
 *    - 本地化是指为某个地域提供特定的信息，例如举办某行双十一活动那么就只有在中国地域有，其他地方就没有
 *
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
