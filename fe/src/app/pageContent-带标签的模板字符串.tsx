'use client';
import styled from '@emotion/styled';

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

const tag = (strings: TemplateStringsArray, ...values: any[]) => {
  let finalString = '';
  strings.forEach((string, i) => {
    finalString += string + (values[i] || '');
  });
  return finalString;
};

const name = '张三';
const age = 10;

const h1 = tag`name: ${name}, age: ${age}`;

console.log(h1);

const PageContent = () => {
  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
