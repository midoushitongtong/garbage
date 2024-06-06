'use client';
import styled from '@emotion/styled';
import { MouseEvent, useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 2rem;
  .content {
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    margin: 0 auto;
    .item {
      position: relative;
      width: calc(100% / 3);
      &::after {
        content: '';
        display: block;
        padding-bottom: calc(100%);
      }
      .inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 15px;
        .text {
          width: 100%;
          height: 100%;
          background-color: #000;
          color: #fff;
        }
      }
    }
    .pointer {
      position: absolute;
      --gap: 0px;
      --width: 200px;
      --x: 0px;
      --y: 0px;
      width: calc(var(--width) + 2 * var(--gap));
      height: calc(var(--width) + 2 * var(--gap));
      margin-top: calc(var(--gap) * -1);
      margin-left: calc(var(--gap) * -1);
      border: 3px solid #06f;
      transform: translate(var(--x), var(--y));
      transition: all 0.3s ease;
      -webkit-mask: conic-gradient(at 30px 30px, transparent 75%, blue 75% 100%) 0 0 / calc(100% - 30px)
        calc(100% - 30px);
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefList = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => () => {
    const content = contentRef.current;
    const ref = itemRefList.current[index];
    const pointerRef = content?.querySelector('.pointer') as HTMLDivElement | null;

    if (!content || !ref || !pointerRef) {
      return;
    }

    const width = ref.offsetWidth;
    const x = ref.offsetLeft - content.offsetLeft;
    const y = ref.offsetTop - content.offsetTop;
    pointerRef.style.setProperty('--x', x + 'px');
    pointerRef.style.setProperty('--y', y + 'px');
    pointerRef.style.setProperty('--width', width + 'px');
  };

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div ref={contentRef} className="content">
        <div className="pointer"></div>
        {new Array(9).fill(1).map((_item, index) => (
          <div
            ref={(ref) => {
              itemRefList.current[index] = ref;
            }}
            key={index}
            className="item"
            onMouseEnter={handleMouseEnter(index)}
          >
            <div className="inner">
              <div className="text">{index}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PageContent;
