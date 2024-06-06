'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const test = async () => {
  const asyncReplace = (str: string) => {
    return new Promise((resolve) => {
      resolve('async' + str);
    });
  };

  // @ts-ignore
  String.prototype.asyncReplaceAll = async function (searchValue: string | RegExp, replacer: any) {
    const str = this;
    const promiseList: Promise<any>[] = [];
    let index = 0;
    str.replaceAll(/\d/g, (match) => {
      promiseList[index++] = replacer(match);
      return match;
    });
    const promiseListResult = await Promise.all(promiseList);
    let index2 = 0;
    const result2 = str.replaceAll(/\d/g, () => {
      return promiseListResult[index2++];
    });
    return result2;
  };

  // @ts-ignore
  const res = await '123-456-789'.asyncReplaceAll('/d/g', (match) => asyncReplace(match));
  console.log(res);
};

const PageContent = () => {
  useEffect(() => {
    test();
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
