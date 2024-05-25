'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  div {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url('/user-avatar.png');
    background-color: #fff;
    background-size: 100px 100px;
    background-repeat: no-repeat;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 50%;
    }
    &::before {
      background-color: rgba(0, 0, 0, 0.5);
    }
    &::after {
      background: inherit;
      clip-path: circle(0% at 50% 50%);
      transition: all 0.5s;
    }
    &:hover {
      &::before {
        background-color: rgba(0, 0, 0, 0.5);
      }
      &::after {
        clip-path: circle(50% at 50% 50%);
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
