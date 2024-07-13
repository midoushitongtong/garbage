'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

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
    span {
      display: inline-flex;
    }
  }
`;

function getCurvePoints(curveFunc: Function, range: number[], number: number, xLength: number) {
  if (number < 1) {
    return [];
  }
  if (number === 1) {
    return [0];
  }
  const piece = (range[1] - range[0]) / (number - 1);
  const result = [];
  const scale = xLength / (range[1] - range[0]);
  for (let i = 0; i < number; i++) {
    result.push(-curveFunc(i * piece + range[0]) * scale);
  }
  return result;
}

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    content.innerHTML = (content.textContent || '')
      .split('')
      .map((item) => `<span>${item}</span>`)
      .join('');

    function createCurve(
      func: Parameters<typeof getCurvePoints>[0],
      range: Parameters<typeof getCurvePoints>[1]
    ) {
      if (!content) {
        return;
      }

      const points = getCurvePoints(func, range, content.children.length, content.clientWidth);
      console.log(points);
      for (let i = 0; i < points.length; i++) {
        (content.children[i] as HTMLSpanElement).style.transform = `translateY(${points[i]}px)`;
      }
    }

    let offset = 0;
    createCurve((x: number) => Math.sin(x), [offset, offset + 2 * Math.PI]);

    setInterval(() => {
      createCurve((x: number) => Math.sin(x), [offset, offset + 2 * Math.PI]);
      offset += 0.1;
    }, 16);
  }, []);

  return (
    <Container>
      <div ref={contentRef} className="content">
        Hello World
      </div>
    </Container>
  );
};

export default PageContent;
