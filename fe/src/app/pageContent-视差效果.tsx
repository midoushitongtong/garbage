'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  .scroll-container {
    height: 100vh;
    position: relative;
    &.scroll-down {
      .item.next {
        height: 100%;
        img {
          transform: translateY(0);
        }
      }
      .item.cur {
        img {
          transform: translateY(-10%);
        }
      }
    }
    &.scroll-up {
      .item.prev {
        height: 100%;
        img {
          transform: translateY(0);
        }
      }
      .item.cur img {
        transform: translateY(10%);
      }
    }
    .item {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      &.prev,
      &.next {
        z-index: 1;
        height: 0;
        transition: all 0.5s ease-in-out;
      }
      &.prev {
        top: 0;
        img {
          top: 0;
          transform: translateY(-10%);
        }
      }
      &.next {
        bottom: 0;
        img {
          bottom: 0;
          transform: translateY(10%);
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        transition: all 0.5s ease-in-out;
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container') as HTMLDivElement;
    const list = [
      'https://picx.zhimg.com/v2-e5142d337fe78cdeab846e96091db62b_r.jpg?source=2c26e567',
      'https://pic1.zhimg.com/80/v2-b74aa6347be67c60ca77466ab4c36970_720w.webp?source=1def8aca',
      'https://pica.zhimg.com/v2-7cd8ead8cd64e5c773b43bf9bb4bb58f_r.jpg?source=1def8aca',
      'https://pic1.zhimg.com/80/v2-1a5fb7e17e19cf4148a42e8a7b3897aa_720w.webp?source=1def8aca',
      'https://picx.zhimg.com/80/v2-4cc8d5cb83f1a9e266cc3cd7a9c91c7f_720w.webp?source=1def8aca',
    ];
    let currentIndex = 0;

    const createItem = (index: number) => {
      const imgUrl = list[index];
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `<img src="${imgUrl}"/>`;
      scrollContainer.appendChild(item);
      return item;
    };

    const resetElement = () => {
      scrollContainer.innerHTML = '';
      const prevIndex = currentIndex - 1 < 0 ? list.length - 1 : currentIndex - 1;
      const nextIndex = currentIndex + 1 > list.length - 1 ? 0 : currentIndex + 1;

      createItem(prevIndex).classList.add('prev');
      createItem(currentIndex).classList.add('cur');
      createItem(nextIndex).classList.add('next');
    };

    resetElement();

    let isAnimating = false;
    const handleWheel = (e: WheelEvent) => {
      if (!e.deltaY) {
        return;
      }
      if (isAnimating) {
        return;
      }
      isAnimating = true;
      if (e.deltaY > 0) {
        // 往下滚动
        scrollContainer.classList.add('scroll-down');
        currentIndex = currentIndex + 1 > list.length - 1 ? 0 : currentIndex + 1;
      } else {
        // 往上滚动
        scrollContainer.classList.add('scroll-up');
        currentIndex = currentIndex - 1 < 0 ? list.length - 1 : currentIndex - 1;
      }
    };

    const handleTransitionEnd = () => {
      isAnimating = false;
      scrollContainer.classList.remove('scroll-down');
      scrollContainer.classList.remove('scroll-up');
      resetElement();
    };

    scrollContainer.addEventListener('wheel', handleWheel);
    scrollContainer.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);

  return (
    <Container className="container">
      <div className="scroll-container"></div>
    </Container>
  );
};

export default PageContent;
