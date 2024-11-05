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
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    &:hover {
      .image-item {
        transform: translate(var(--disX, 0), var(--disY, 0));
      }
    }
    .image-item {
      width: 100px;
      height: 100px;
      background-image: url(/1.jpeg);
      background-size: 300px 300px;
      transition: all 0.3s ease;
      background-position: var(--bgX, 0) var(--bgY, 0);
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');

    const items = [...document.querySelectorAll('.image-item')] as HTMLDivElement[];

    for (let i = 0; i < items.length; i++) {
      const r = Math.floor(i / 3);
      const c = i % 3;
      const bgX = -c * 100 + '%';
      const bgY = -r * 100 + '%';
      const disX = (c - 1) * 20 + 'px';
      const disY = (r - 1) * 20 + 'px';
      items[i].style.setProperty('--bgX', bgX + '');
      items[i].style.setProperty('--bgY', bgY + '');
      items[i].style.setProperty('--disX', disX + '');
      items[i].style.setProperty('--disY', disY + '');
    }
  }, []);

  return (
    <Container>
      <div className="content">
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
        <div className="image-item"></div>
      </div>
    </Container>
  );
};

export default PageContent;
