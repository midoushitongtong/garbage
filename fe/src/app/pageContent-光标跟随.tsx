'use client';
import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef, useState } from 'react';

const getLastTextNode = (dom: Node): ChildNode | null => {
  const children = dom.childNodes;
  for (let i = children.length - 1; i >= 0; i++) {
    const node = children[i];
    if (!node) {
      break;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      return node;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const last = getLastTextNode(node);
      if (last) {
        return last;
      }
    }
  }
  return null;
};
const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    textarea {
      width: 300px;
      padding: 1rem;
    }
    section {
      position: relative;
      width: 300px;
      .cursor {
        position: absolute;
        width: 10px;
        height: 15px;
        background-color: #ccc;
        animation: cursor 1s linear infinite alternate;
        @keyframes cursor {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      }
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 自适应高度
  const handleInput = (_e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  useEffect(() => {
    const str =
      '好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的';
    let index = 0;
    const timerId = setInterval(() => {
      if (index >= str.length) {
        clearInterval(timerId);
        setShowCursor(false);
        return;
      }
      setShowCursor(true);
      setContent((prev) => (prev += str[index++]));
    }, 50);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || !showCursor) {
      return;
    }
    const lastTextNode = getLastTextNode(content);
    const cursorTextNode = document.createTextNode('\u200b');
    if (lastTextNode) {
      lastTextNode.parentElement?.appendChild(cursorTextNode);
    } else {
      content.appendChild(cursorTextNode);
    }
    const contentRect = content.getBoundingClientRect();
    const range = document.createRange();
    range.setStart(cursorTextNode, 0);
    range.setEnd(cursorTextNode, 0);
    const cursorTextNodeRect = range.getBoundingClientRect();
    const x = cursorTextNodeRect.left - contentRect.left;
    const y = cursorTextNodeRect.top - contentRect.top;
    setCursorPosition({ x, y });
    cursorTextNode.remove();
  }, [content, showCursor]);

  return (
    <Container>
      <div className="content">
        <section>
          <div ref={contentRef}>{content}</div>
          {showCursor && (
            <div className="cursor" style={{ top: cursorPosition.y, left: cursorPosition.x }}></div>
          )}
        </section>
        <textarea ref={textareaRef} rows={1} onInput={handleInput}></textarea>
      </div>
    </Container>
  );
};

export default PageContent;
