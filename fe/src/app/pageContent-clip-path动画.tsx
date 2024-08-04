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
    .box {
      clip-path: inset(0% 0% 100% 0%);
    }
    &:hover {
      .box {
        clip-path: inset(0% 0% 0% 0%);
      }
    }

    .box {
      text-align: center;
      aspect-ratio: 1 / 1;
      background-color: #06f;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      transition: all 0.3s linear;

      /* 4个参数分别是 顶部开始的内边距、右侧开始的内边距、底部开始的内边距、左侧开始的内边距 */
      /* clip-path: inset(10% 10% 10% 10%); */

      /* 3个参数分别是 元的半径是宽度或高度的50%、圆的x坐标、圆的y坐标 */
      /* clip-path: circle(50% at 50% 50%); */

      /* 
        生成 clip-path 的小工具
        https://bennettfeely.com/clippy/
      */

      .text {
        color: #fff;
        font-size: 3rem;
        color: transparent;
        background-image: linear-gradient(90deg, yellow, pink);
        -webkit-background-clip: text;
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
      <div className="content">
        Hover Me
        <div className="box">Hello World</div>
      </div>
    </Container>
  );
};

export default PageContent;
