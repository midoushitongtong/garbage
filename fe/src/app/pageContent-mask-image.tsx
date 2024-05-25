'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  div {
    color: #fff;
    width: 100px;
    height: 100px;
    mask-image: url('/w3logo.png');
    mask-size: 100%;
    mask-repeat: no-repeat;
    animation: gradientBackground 3s infinite;
    @keyframes gradientBackground {
      0% {
        background: #f60;
      }
      33% {
        background: #06f;
      }
      66% {
        background: #b6cb13;
      }
      100% {
        background: #f60;
      }
    }
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
