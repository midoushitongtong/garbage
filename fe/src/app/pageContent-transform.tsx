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
    /* transform: rotate(120deg) translate(100px); */
    transform: translate(100px) rotate(120deg);
    /* transform 会从左到右依次应用, 不同顺序会有不同的效果 */
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
