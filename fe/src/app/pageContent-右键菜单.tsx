'use client';
import styled from '@emotion/styled';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }

  .menu-list {
    position: fixed;
    top: 0;
    left: 0;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    min-width: 150px;
    background-color: #fff;
    .menu-list-item {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const useContextMenu = (menuListRef: RefObject<HTMLDivElement>) => {
  const mousePosition = useRef({
    x: 0,
    y: 0,
  });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
    mousePosition.current = {
      x: e.pageX,
      y: e.pageY,
    };
  }, []);

  const handleMouseDown = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const menuList = menuListRef.current;

    if (!menuList) {
      return;
    }

    let x = mousePosition.current.x;
    let y = mousePosition.current.y;

    const menuListWidth = menuList.offsetWidth;
    const menuListHeight = menuList.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxX = windowWidth - menuListWidth;
    const maxY = windowHeight - menuListHeight;

    x = x > maxX ? maxX - (windowWidth - mousePosition.current.x) : x;
    y = y > maxY ? maxY - (windowHeight - mousePosition.current.y) : y;

    setX(x);
    setY(y);
    setShowMenu(true);
  }, [menuListRef, showMenu]);

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleContextMenu]);

  return {
    x,
    y,
    showMenu,
  };
};

const PageContent = () => {
  const menuListRef = useRef<HTMLDivElement>(null);
  const { x, y, showMenu } = useContextMenu(menuListRef);

  return (
    <Container className="container">
      <div className="content">Hello World</div>

      {showMenu && (
        <div
          ref={menuListRef}
          className="menu-list"
          style={{
            left: x + 'px',
            top: y + 'px',
          }}
        >
          <div className="menu-list-item">menu1</div>
          <div className="menu-list-item">menu2</div>
          <div className="menu-list-item">menu3</div>
          <div className="menu-list-item">menu4</div>
          <div className="menu-list-item">menu5</div>
        </div>
      )}
    </Container>
  );
};

export default PageContent;
