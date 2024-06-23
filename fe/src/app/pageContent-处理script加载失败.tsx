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

const PageContent = () => {
  const retryInfo: Record<
    string,
    {
      times: number;
      nextIndex: number;
    }
  > = {};

  const handleError = (e: ErrorEvent) => {
    const target = e.target as HTMLScriptElement;
    const domains = ['b.com', 'c.com', 'd.com', 'e.com'];
    const maxRetryTimes = domains.length - 1;

    if (target.tagName == 'SCRIPT') {
      const url = new URL(target.src);
      const pathname = url.pathname;
      if (!retryInfo[pathname]) {
        retryInfo[pathname] = {
          times: 0,
          nextIndex: 0,
        };
      }
      const info = retryInfo[pathname];
      if (info.times > maxRetryTimes) {
        return;
      }
      const script = document.createElement('script');
      url.host = domains[info.nextIndex];
      script.src = url.toString();
      target.parentNode?.insertBefore(script, target);
      info.times++;
      info.nextIndex = (info.nextIndex + 1) % domains.length;
    }
  };

  useEffect(() => {
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('error', handleError);
    };
  });

  return (
    <Container>
      <script async src="https://a.com/1.js"></script>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
