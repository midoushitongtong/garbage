'use client';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
`;

const PageContent = () => {
  const [html, setHTML] = useState('');
  useEffect(() => {
    console.log('Hello World');
    const keyword = '123';
    const searchResults = ['aaa123bbb', 'ccc123ddd'];
    const htmlStr = searchResults
      .map(
        (item) => `
                  <p>
                    ${item.replace(new RegExp(keyword, 'gi'), (key) => `<span style="color: #06f;">${key}</span>`)}
                  </p>
                `
      )
      .join('');
    setHTML(htmlStr);
  }, []);

  return (
    <Container>
      <div className="content" dangerouslySetInnerHTML={{ __html: html }}></div>
    </Container>
  );
};

export default PageContent;
