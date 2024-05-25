'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Container = styled.section`
  width: 100%;
  position: relative;
  border: 1px solid #f60;
  .item {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
`;

const PageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // 每列宽度
  const columnWidth = 250;
  // 每列间隙
  const columnSpace = 20;
  const [items, setItems] = useState<
    {
      width: string;
      height: string;
    }[]
  >([]);

  useEffect(() => {
    const items = new Array(100).fill(1).map(() => ({
      width: `${columnWidth}px`,
      height: `${Math.random() * 300 + 1}px`,
    }));
    setItems(items);
  }, []);

  useEffect(() => {
    const getLayout = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      // 列数
      let columns = Math.floor(containerWidth / columnWidth);
      if (columns > 1) {
        columns = Math.floor((containerWidth - columns * columnSpace) / columnWidth);
      }

      return {
        space: columnSpace,
        columns,
      };
    };

    const setPosition = () => {
      if (!containerRef.current) return;

      const layout = getLayout();

      const items = [...(containerRef.current.querySelectorAll('.item') || [])] as HTMLDivElement[];
      const nextTops = new Array(layout.columns).fill(0);

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const minTop = Math.min(...nextTops);
        const minTopIndex = nextTops.indexOf(minTop);

        // top
        item.style.top = `${minTop}px`;
        nextTops[minTopIndex] += rect.height + layout.space;

        // left
        const left = minTopIndex * columnWidth + (minTopIndex + 1) * layout.space;
        item.style.left = `${left}px`;
      });
      const maxTop = Math.max(...nextTops);
      containerRef.current.style.height = `${maxTop}px`;
    };

    setPosition();

    window.addEventListener('resize', setPosition);

    return () => {
      window.removeEventListener('resize', setPosition);
    };
  }, [items]);

  return (
    <>
      <Container className="container" ref={containerRef}>
        {items.map((item, index) => (
          <div key={index} className="item" style={{ width: item.width, height: item.height }}>
            {index}
          </div>
        ))}
      </Container>
    </>
  );
};

export default PageContent;
