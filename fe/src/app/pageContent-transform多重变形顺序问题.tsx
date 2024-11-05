'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f60;

  div {
    width: 100px;
    height: 100px;
    background-color: #06f;
    /* 
      transform 从视觉和书写的角度来看，是从左往右的，但在底层数学实现中，矩阵乘法是从右往左的。
      不同顺序会有不同的效果
    */
    /* transform: translate(100px) rotate(120deg); */
    transform: rotate(120deg) translate(100px);
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div></div>
      </Container>
    </>
  );
};

export default PageContent;
