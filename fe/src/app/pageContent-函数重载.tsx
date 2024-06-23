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

// @ts-ignore
const search: {
  find: (() => void) | ((n?: string) => void) | ((n?: string, a?: number) => void);
} = {};

function addMethod(object: any, name: string, fn: Function) {
  const old = object[name];
  object[name] = function (...args: any) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === 'function') {
      return old.apply(this, args);
    }
  };
}

addMethod(search, 'find', () => {
  console.log('find');
});
addMethod(search, 'find', (name: string) => {
  console.log('findName');
});
addMethod(search, 'find', (name: string, age: number) => {
  console.log('findNameAndAge');
});

search.find();
search.find('1');
search.find('1', 2);
search.find();
search.find('1');
search.find('1', 2);

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
