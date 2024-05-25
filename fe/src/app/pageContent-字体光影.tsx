'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);
  overflow: hidden;

  div {
    font-size: 5rem;
    color: #fff;
    span {
      animation: text-shadow 0s ease-in-out infinite alternate;
    }
    @keyframes text-shadow {
      100% {
        color: black;
        text-shadow: 20px 0 50px black;
      }
    }
  }
`;

const PageContent = () => {
  const str = 'Hello World';
  return (
    <>
      <Container className="container">
        <div>
          {str.split('').map((item, index) => (
            <span
              key={index}
              style={{
                animationDuration: `${str.split('').length * 0.2}s`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </>
  );
};

export default PageContent;
