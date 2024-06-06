'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  .header,
  .footer {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    background-color: #999;
    color: #fff;
  }
  .animation-container {
    height: 300vh;
    .animation-content {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000;
      .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .list-item {
          position: relative;
          width: calc(100% / 7);
          padding: 1rem;
          transform-origin: left top;
          &::after {
            content: '';
            display: block;
            padding-bottom: 100%;
          }
          .inner {
            position: absolute;
            top: 1rem;
            right: 1rem;
            bottom: 1rem;
            left: 1rem;
            border-radius: 0.5rem;
          }
          &:nth-child(3n + 1) {
            .inner {
              background-color: #2e74f6;
            }
          }
          &:nth-child(3n + 2) {
            .inner {
              background-color: #43a148;
            }
          }
          &:nth-child(3n + 3) {
            .inner {
              background-color: #f1a034;
            }
          }
        }
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    const animationContainer = document.querySelector('.animation-container') as HTMLDivElement;
    const animationContent = document.querySelector('.animation-content') as HTMLDivElement;
    const listContainer = document.querySelector('.list') as HTMLDivElement;
    const items = [...document.querySelectorAll('.list-item')] as HTMLDivElement[];

    const animationMap = new Map();

    function getAnimationProgress(item: HTMLDivElement) {
      // 控制动画延迟加载
      const offset = parseInt(item.dataset.order || '0') * 100;

      const scrollStart = animationContainer.offsetTop + offset;
      const scrollEnd = scrollStart + animationContent.getBoundingClientRect().height;
      const scrollRange = scrollEnd - scrollStart;
      const currentScrollTop = document.documentElement.scrollTop;
      const scrollValue = currentScrollTop - scrollStart;
      const progress = Math.min(Math.max(0, scrollValue / scrollRange), 1);
      return progress;
    }

    function updateAnimationMap() {
      animationMap.clear();
      for (const item of items) {
        animationMap.set(item, {
          opacity: function () {
            const progress = getAnimationProgress(item);
            const opacity = 1 * progress;
            return opacity;
          },
          transform: function () {
            const progress = getAnimationProgress(item);
            const scale = 1 * progress;
            let x =
              listContainer.clientWidth / 2 - item.getBoundingClientRect().width / 2 - item.offsetLeft;
            x = x - x * progress;
            let y =
              listContainer.clientHeight / 2 - item.getBoundingClientRect().height / 2 - item.offsetTop;
            y = y - y * progress;
            return `translate(${x}px, ${y}px) scale(${scale})`;
          },
        });
      }
    }

    function updateStyles() {
      for (const [dom, value] of animationMap) {
        for (const cssProp in value) {
          dom.style[cssProp] = value[cssProp]();
        }
      }
    }

    updateAnimationMap();

    updateStyles();

    window.addEventListener('scroll', updateStyles);

    return () => {
      window.removeEventListener('scroll', updateStyles);
    };
  }, []);

  return (
    <Container className="container">
      <div className="header">Header</div>
      <div className="animation-container">
        <div className="animation-content">
          <div className="list">
            <div data-order="0" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="1" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="2" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="3" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="2" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="1" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="0" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="0" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="1" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="2" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="3" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="2" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="1" className="list-item">
              <div className="inner"></div>
            </div>
            <div data-order="0" className="list-item">
              <div className="inner"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">Footer</div>
      <div className="footer">Footer</div>
    </Container>
  );
};

export default PageContent;
