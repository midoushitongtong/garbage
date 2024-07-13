'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { Flip } from './flip';

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
    width: 500px;
    .item {
      padding: 1rem;
      background-color: #06f;
      margin-bottom: 1rem;
      border-radius: 4px;
      border: 1px solid transparent;
      color: #fff;
      cursor: pointer;
      &.moving {
        background: transparent;
        color: transparent;
        border: 1px dashed #ccc;
      }
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current as HTMLDivElement;
    if (!content) {
      return;
    }
    let sourceElement: HTMLDivElement;
    let flip: ReturnType<typeof Flip>;

    const _handleDragStart = (e: DragEvent) => {
      const element = e.target as HTMLDivElement;
      // 添加异步任务，防止修改拖转元素的样式，只修改列表元素的样式
      setTimeout(() => {
        element.classList.add('moving');
      }, 0);
      sourceElement = element;
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
      flip = Flip([...content.children]);
    };

    const _handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const _handleDragEnter = (e: DragEvent) => {
      e.preventDefault();

      const element = e.target as HTMLDivElement;
      if (element === content || e.target === sourceElement) {
        return;
      }
      const children = Array.from(content.children);
      const sourceIndex = children.indexOf(sourceElement);
      const targetIndex = children.indexOf(element);
      flip.record();
      if (sourceIndex < targetIndex) {
        // 向下拖拽
        content.insertBefore(sourceElement, element.nextElementSibling);
      } else {
        // 向上拖拽
        content.insertBefore(sourceElement, element);
      }
      flip.play();
    };

    const _handleDragEnd = (e: DragEvent) => {
      e.preventDefault();
      const element = e.target as HTMLDivElement;
      element.classList.remove('moving');
    };

    content.addEventListener('dragstart', _handleDragStart);
    content.addEventListener('dragover', _handleDragOver);
    content.addEventListener('dragenter', _handleDragEnter);
    content.addEventListener('dragend', _handleDragEnd);

    return () => {
      content.removeEventListener('dragstart', _handleDragStart);
      content.removeEventListener('dragover', _handleDragOver);
      content.removeEventListener('dragenter', _handleDragEnter);
      content.removeEventListener('dragend', _handleDragEnd);
    };
  }, []);

  return (
    <Container>
      <div ref={contentRef} className="content">
        <div draggable className="item">
          1
        </div>
        <div draggable className="item">
          2
        </div>
        <div draggable className="item">
          3
        </div>
        <div draggable className="item">
          4
        </div>
        <div draggable className="item">
          5
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
