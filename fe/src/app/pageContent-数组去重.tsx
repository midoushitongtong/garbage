'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

function uniqureArray(arr: any) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    let isFind = false;
    for (let j = 0; j < result.length; j++) {
      if (equals(result[j], arr[i])) {
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      result.push(arr[i]);
    }
  }
  return result;
}

function equals(a: any, b: any) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'object' && a !== null && b !== null) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (let key of aKeys) {
      if (!b.hasOwnProperty(key) || !equals(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

console.log(uniqureArray([{ a: '1' }, { a: '1' }, 2]));

const PageContent = () => {
  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
