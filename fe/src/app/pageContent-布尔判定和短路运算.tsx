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

// 布尔判定和短路规则
/**
 * 布尔判定: 在某些特定的位置需要判断为 true 或者 false
 *  例如 if (xxx), while (xxx), a && b, a || a, 这些位置都存在布尔判定, 所参与的表达式会转为布尔类型的结果
 * 短路运算
 *  a || b, a && b, 会对表达式进行布尔判定, 如果满足条件就返回对应的结果, 后续的表达式就不执行了, 成为短路
 */

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
