'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .top {
    min-height: 100vh;
  }

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      content,
      { scale: 0.5 },
      {
        scale: 1,
        rotation: 360,
        scrollTrigger: {
          trigger: content,
          // start: 'center center',
          end: '+=50%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <Container className="container">
      <div className="top"></div>
      <div ref={contentRef} className="content">
        Hello World
      </div>
      <div className="top"></div>
    </Container>
  );
};

export default PageContent;
