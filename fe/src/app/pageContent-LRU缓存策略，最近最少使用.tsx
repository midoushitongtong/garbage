'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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
    font-size: 5rem;
    text-align: center;
  }
`;

// LRU 最近最后使用缓存算法
class LRUCache {
  public map: Map<any, any> = new Map();
  private length = 0;

  constructor(length: LRUCache['length']) {
    this.length = length;
  }

  get(key: any) {
    if (!this.map.has(key)) {
      return;
    }
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: any, value: any) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.length) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}

const lru = new LRUCache(2);
lru.set('1', 'a');
lru.set('2', 'b');
lru.set('3', 'c');

lru.map.forEach((item, key) => {
  console.log(key, item);
});

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
