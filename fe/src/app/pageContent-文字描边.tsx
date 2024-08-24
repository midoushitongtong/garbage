'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 5rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    /* color: transparent; */
    -webkit-text-stroke: 4px #fff;
    position: relative;

    // 利用伪类解决描边占据原有字体大小的问题
    &::after {
      content: attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      -webkit-text-stroke: 0;
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div data-content="Hello World">Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
