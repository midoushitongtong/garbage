'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
  }
`;

const tag = (strings: TemplateStringsArray, ...values: any[]) => {
  const arr = [...strings];
  values.forEach((item, index) => {
    arr[index + 1] = item;
  });
  return arr.join('').toString();
};

const name = 'ABC';
const hi = tag`my name is ${name}`;
console.log(hi);

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
