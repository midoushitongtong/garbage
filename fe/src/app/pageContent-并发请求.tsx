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

function concurRequest(urls: string[], concurSize: number) {
  return new Promise((resolve) => {
    const results: any[] = [];

    if (urls.length === 0) {
      resolve(results);
    }

    let index = 0;
    let count = 0;
    async function request() {
      if (index === urls.length) {
        return;
      }
      const i = index;
      index++;
      const url = urls[i];
      try {
        const res = await fetch(url);
        results[i] = await res.json();
      } catch (err) {
        results[i] = err;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }

    for (let i = 0; i < concurSize; i++) {
      request();
    }
  });
}

concurRequest(
  [
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
    'https://dog.ceo/api/breeds/image/random',
  ],
  3
).then((res) => {
  console.log(res);
});

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
