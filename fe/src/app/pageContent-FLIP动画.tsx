'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Container = styled.section`
  padding: 1rem;
  .item {
    font-size: 2rem;
    color: #000;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成 0 到 i 之间的随机整数
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素
  }
  return [...array];
}

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState([{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]);
  let prevPositionList = useRef<{ id: string; x: number; y: number }[]>([]);

  const record = () => {
    const items = [...(contentRef.current?.querySelectorAll('div') || [])] as HTMLDivElement[];
    prevPositionList.current = list.map((item) => {
      const rect = items.find((domItem) => domItem.dataset.id === item.id)?.getBoundingClientRect();
      return {
        id: item.id,
        x: rect?.left || 0,
        y: rect?.top || 0,
      };
    });
  };

  useEffect(() => {
    if (!contentRef.current || prevPositionList.current.length === 0) return;
    const items = [...(contentRef.current?.querySelectorAll('div') || [])] as HTMLDivElement[];
    list.forEach((item, index) => {
      const rect = items.find((domItem) => domItem.dataset.id === item.id)?.getBoundingClientRect();
      const prevPosition = prevPositionList.current.find((prevPosition) => prevPosition.id === item.id);
      if (prevPosition) {
        const diffX = prevPosition.x - (rect?.x || 0);
        const diffY = prevPosition.y - (rect?.y || 0);
        items[index].animate(
          [
            { transform: `translateX(${diffX}px) translateY(${diffY}px)` },
            { transform: 'translateX(0px) translateY(0px)' },
          ],
          {
            duration: 300,
          }
        );
      }
    });
  }, [list]);

  return (
    <>
      <Container className="container">
        <div ref={contentRef}>
          {list.map((item) => (
            <div className="item" data-id={item.id} key={item.id}>
              {item.id}
            </div>
          ))}
        </div>
      </Container>

      <button
        onClick={() => {
          record();
          setList(shuffleArray(list));
        }}
      >
        随机排序
      </button>
    </>
  );
};

export default PageContent;
