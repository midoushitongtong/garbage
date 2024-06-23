'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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

function asyncRun(fn: () => void) {
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(fn);
  } else if (typeof MutationObserver !== 'undefined') {
    const ob = new MutationObserver(fn);
    const textNode = document.createTextNode('0');
    ob.observe(textNode, {
      characterData: true,
    });
    textNode.data = '1';
  } else {
    setTimeout(fn);
  }
}

const PageContent = () => {
  useEffect(() => {
    asyncRun(() => {
      console.log(1);
    });
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
