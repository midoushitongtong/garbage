'use client';

import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    position: relative;
    font-size: 120px;
    color: #000;
    &::before {
      content: 'SHADOW';
      position: absolute;
      color: #666;
      z-index: -1;
      transform: translate(-50px, 9px) skew(50deg) scale(0.8);
      filter: blur(3px);
      mask-image: linear-gradient(transparent, #000);
    }
  }
`;

const PageContent = () => {
  return (
    <Container>
      <h1>SHADOW</h1>
    </Container>
  );
};

export default PageContent;
