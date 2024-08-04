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

/**
 * 层叠规则
 * - 优先级
 *    用户定义的样式 > 默认样式
 * - 特殊性
 *    选择器特定性比较规则: (0, 0, 0, 0)
 *      - 第一位数字代表行内只有0 1
 *      - 第二位数字代表有多少个 id 选择器
 *      - 第三位数字代表有多少个 类、属性、伪类 选择器
 *      - 第四位数字代表有多少个 元素 选择器
 * - 次序行
 *    后面定义的优先级要大于前面定义的
 *
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
