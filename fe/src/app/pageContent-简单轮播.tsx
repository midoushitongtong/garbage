'use client';
import styled from '@emotion/styled';
import { useCallback, useRef, useState } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .swiper {
    position: relative;
    width: 500px;
    height: 300px;
    overflow: hidden;
    .swiper-slide-list {
      width: 100%;
      height: 100%;
      display: flex;
      transition: all 0.3s ease;
      .item {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 300px;
        font-size: 2rem;
        font-weight: 600;
        border: 1px solid #06f;
      }
    }
    .indicator {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        display: flex;
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        margin: 0 0.25rem;
        cursor: pointer;
        &.active {
          border-color: #06f;
          background-color: #06f;
        }
      }
    }
  }
`;

const PageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [list] = useState(['1', '2', '3', '4', '5']);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperTo = useCallback(
    (index: number) => () => {
      const swiperSlideList = containerRef.current?.querySelector(
        '.swiper-slide-list'
      ) as HTMLDivElement | null;

      // null check
      if (!swiperSlideList) return;

      swiperSlideList.style.transform = `translateX(-${index * 500}px)`;

      setActiveIndex(index);
    },
    []
  );
  return (
    <>
      <Container>
        <div ref={containerRef} className="swiper">
          <div className="swiper-slide-list">
            {list.map((item) => (
              <div key={item} className="item">
                {item}
              </div>
            ))}
          </div>
          <div className="indicator">
            {list.map((item, index) => (
              <span
                key={item}
                className={[index === activeIndex ? 'active' : ''].join(' ')}
                onClick={swiperTo(index)}
              ></span>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
