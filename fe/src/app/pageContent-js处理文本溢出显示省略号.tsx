'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content-2 {
    width: 100px;
    height: 28px;
    line-height: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .content-3 {
    width: 100px;
    height: 28px;
    line-height: 14px;
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');

    const div = document.querySelector('.content-3') as HTMLDivElement;
    let showEllipsis = false;
    const checkShowEllipsis = (div: HTMLDivElement) => {
      if (!div) {
        return;
      }
      const height = div.getBoundingClientRect().height + 1;
      const scrollHegiht = div.scrollHeight;
      if (scrollHegiht > height) {
        showEllipsis = true;
        const content = div.textContent + '';
        div.textContent = content.slice(0, content.length - 1);
        checkShowEllipsis(div);
      }
    };
    checkShowEllipsis(div);
    if (showEllipsis) {
      div.textContent = (div.textContent + '').slice(0, -4) + '...';
    }
  }, []);

  return (
    <Container>
      <div className="content">Hello World Hello World Hello World Hello World Hello World</div>
      <div className="content-2">Hello World Hello World Hello World Hello World Hello World</div>
      <div className="content-3">Hello World Hello World Hello World Hello World Hello World</div>
    </Container>
  );
};

export default PageContent;
