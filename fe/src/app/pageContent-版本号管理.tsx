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

function* walk(str: string) {
  let part = '';
  let terminals = ['.', '-'];
  for (let i = 0; i < str.length; i++) {
    if (terminals.includes(str[i])) {
      yield part;
      part = '';
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield part;
  }
}

const a = walk('1.2.3');
for (const b of a) {
  console.log(b);
}

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
