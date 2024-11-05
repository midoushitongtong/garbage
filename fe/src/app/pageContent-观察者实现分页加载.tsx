'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const PageContent = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMoreRefElement = loadMoreRef.current;
    if (!loadMoreRefElement) return;

    // 建立观察者
    const ob = new IntersectionObserver(
      function (entries) {
        // 获取观察的对象
        const entrie = entries[0];
        // 判断是否重叠
        if (entrie.isIntersecting) {
          // 触发分页加载
          console.log('load more');
        }
      },
      {
        threshold: 0.5, // 元素 50% 可见就触发
      }
    );

    // 设置观察的对象
    ob.observe(loadMoreRefElement);

    return () => {
      // 组件销毁，取消观察
      ob.unobserve(loadMoreRefElement);
    };
  }, []);

  return (
    <>
      <Container className="container">
        <div className="list">
          {new Array(100).fill(1).map((_item, index) => (
            <div key={index}>{index}</div>
          ))}
          <div ref={loadMoreRef} className="load-more">
            Load More ...
          </div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
