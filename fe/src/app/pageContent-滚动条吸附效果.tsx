'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  width: 100%;
  overflow-y: auto;
  height: 100vh;
  scroll-snap-type: y mandatory;
  /* scroll-snap-type: y proximity; */
  .item {
    flex-shrink: 0;
    width: 100%;
    height: 100vh;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    scroll-snap-align: center;
    /* scroll-snap-stop: always; */

    &:nth-child(1) {
      background-color: blue;
    }
    &:nth-child(2) {
      background-color: pink;
    }
    &:nth-child(3) {
      background-color: orange;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </Container>
  );
};

export default PageContent;
