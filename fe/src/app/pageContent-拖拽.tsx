'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  .content {
    width: 200px;
    height: 300px;
    background-color: #06f;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
    position: fixed;
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef(new BroadcastChannel('card'));

  const getScreenPoint = (clientX: number, clientY: number) => {
    const screenX = clientX - Math.abs(window.screenX);
    const screenY = clientY - Math.abs(window.screenY) - 79;
    console.log(screenX, screenY);
    return [screenX, screenY];
  };

  const getClientRect = (screenX: number, screenY: number) => {
    const clientX = screenX + Math.abs(window.screenX);
    const clientY = screenY + Math.abs(window.screenY) + 79;
    return [clientX, clientY];
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }
    const mouse = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };
    const handleMouseDown = (e: MouseEvent) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
      offset.x = content.offsetLeft;
      offset.y = content.offsetTop;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - mouse.x + offset.x;
      const y = e.pageY - mouse.y + offset.y;
      content.style.left = x + 'px';
      content.style.top = y + 'px';
      channelRef.current.postMessage(getScreenPoint(x, y));
    };
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const channel = channelRef.current;
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const handleMessage = (e: MessageEvent) => {
      // @ts-ignore
      const [x, y] = getClientRect(...e.data);
      console.log(...e.data);
      content.style.left = x + 'px';
      content.style.top = y + 'px';
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }
    if (window.location.search.includes('hidden')) {
      content.style.left = '-999px';
    }
  }, []);

  return (
    <Container className="container">
      <div className="content" ref={contentRef}></div>
    </Container>
  );
};

export default PageContent;
