'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const useAnimation = () => {
  useEffect(() => {
    // 临时变量存储 dom 与 animatio 之间的映射
    const animationMap = new WeakMap();
    // 创建交叉观察者
    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const animation = animationMap.get(entry.target);
          animation.play();
          intersectionObserver.unobserve(entry.target);
        }
      }
    });

    const slideInElementList = [...document.querySelectorAll('.slide-in')] as HTMLDivElement[];
    slideInElementList.forEach((item) => {
      // 如果 dom 在滚动条之上, 不需要设置动画
      if (item.getBoundingClientRect().top < window.innerHeight) {
        return;
      }

      const animation = item.animate(
        [
          { opacity: 0.5, transform: 'translateY(150px)' },
          { opacity: 1, transform: 'translateY(0px)' },
        ],
        {
          duration: 1000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      animationMap.set(item, animation);
      animation.pause();
      intersectionObserver.observe(item);
    });

    return () => {
      slideInElementList.forEach((item) => {
        intersectionObserver.unobserve(item);
      });
    };
  }, []);
};

const PageContent = () => {
  useAnimation();

  return (
    <Container className="container">
      <div className="content">
        {new Array(50).fill(1).map((item, index) => (
          <h1 className="slide-in" key={index}>
            {index}
          </h1>
        ))}
      </div>
    </Container>
  );
};

export default PageContent;
