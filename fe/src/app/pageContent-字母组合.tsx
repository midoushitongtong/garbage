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

function keyboardMap(digits: string) {
  const map: string[] = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxzy'];
  let result: string[] = [];
  function _compose(arr1: string[], arr2: string[]) {
    if (arr1.length === 0) return arr2;
    if (arr2.length === 0) return arr1;
    const res: string[] = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        res.push(arr1[i] + arr2[j]);
      }
    }
    return res;
  }
  for (let i = 0; i < digits.length; i++) {
    result = _compose(result, map[digits[i] as unknown as number].split(''));
  }
  return result;
}

console.log(keyboardMap('234'));

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
