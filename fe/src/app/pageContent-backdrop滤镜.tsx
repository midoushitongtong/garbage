'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    position: relative;
    color: #fff;
    font-size: 5rem;
    .modal {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.4);
      width: 50%;
      height: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(1px);
    }
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>
          Hello World
          <div className="modal"></div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
