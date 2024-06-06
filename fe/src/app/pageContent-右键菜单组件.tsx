'use client';
import styled from '@emotion/styled';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated, useSpringRef } from '@react-spring/web';

const useContextMenu = (
  triggerContainerRef: RefObject<HTMLDivElement>,
  menuListRef: RefObject<HTMLDivElement>
) => {
  const mousePosition = useRef({
    x: 0,
    y: 0,
  });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
  }, [menuListRef, showMenu]);

  useEffect(() => {
    const triggerContainer = triggerContainerRef.current;

    if (!triggerContainer) {
      return;
    }

    triggerContainer.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      triggerContainer.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleContextMenu, triggerContainerRef]);

  return {
    x,
    y,
    showMenu,
    setShowMenu,
  };
};

const ContextMenuContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 150px;
  background-color: #fff;
  overflow: hidden;
  .menu-list-item {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ContextMenu = (props: { children: React.ReactNode; menus: string[] }) => {
  const { children, menus } = props;

  const triggerContainer = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const { x, y, showMenu, setShowMenu } = useContextMenu(triggerContainer, menuListRef);
  const [height, setHeight] = useState(0.001);
  const transitonsRef = useSpringRef();
  const transitions = useTransition(showMenu, {
    ref: transitonsRef,
    from: { height: 0 },
    enter: { height },
    leave: { height: 0 },
    config: { duration: 200 },
    onStart: () => {
      const menuList = menuListRef.current;
      if (!menuList) {
        return;
      }
      const containerHeight = menuList.scrollHeight || 0.001;
      if (containerHeight > height) {
        menuList.style.height = '0px';
        setShowMenu(false);
        setHeight(containerHeight);
        requestAnimationFrame(() => {
          setShowMenu(true);
        });
      }
    },
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      transitonsRef.start();
    });
  }, [showMenu, transitonsRef]);

  return (
    <>
      <div className="trigger-container" ref={triggerContainer}>
        {children}
      </div>

      {createPortal(
        transitions(
          (styles, show) =>
            show && (
              <ContextMenuContainer
                ref={menuListRef}
                style={{
                  left: x + 'px',
                  top: y + 'px',
                  ...styles,
                }}
              >
                {menus.map((item) => (
                  <div key={item} className="menu-list-item">
                    {item}
                  </div>
                ))}
              </ContextMenuContainer>
            )
        ),
        document.body
      )}
    </>
  );
};

const Container = styled.section`
  display: flex;
  .content {
    width: 50vw;
    background-color: red;
    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  }
  .content2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    background-color: blue;
    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    .content3 {
      width: 25vw;
      background-color: yellow;
      &::after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <ContextMenu menus={['1', '2', '3']}>
        <div className="content"></div>
      </ContextMenu>
      <ContextMenu menus={['4', '5', '6']}>
        <div className="content2">
          <ContextMenu menus={['7', '8', '9']}>
            <div className="content3"></div>
          </ContextMenu>
        </div>
      </ContextMenu>
    </Container>
  );
};

export default PageContent;
