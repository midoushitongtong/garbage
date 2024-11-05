'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

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
 * 利用浏览器 Source 界面进行断点调试
 *  1. 先找到元素的 Event Listeners 然后点击需要调试的函数，进到 Source 界面
 *  2. 在 Source 界面，找到对应的函数，然后点击行号，添加断点
 *    - step over 进入当前行的调试，如果当前行是函数，则直接跳到下一行，会忽略函数执行的详情，只需要获取执行的结果
 *    - step into 进入当前行的调试，如果当前行是函数，则进入函数内部，从函数第一行开始执行，获取函数的执行详情
 *    - step out  跳出当前函数
 */

const PageContent = () => {
  const a = () => {
    const a = 1;
    const b = 2;
    const c = a + b / 0;
    console.log(c);
  };

  return (
    <Container>
      <div className="content">Hello World</div>
      <Button variant="contained" onClick={a}>
        Click
      </Button>
    </Container>
  );
};

export default PageContent;
