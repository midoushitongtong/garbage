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

function isPalindrome(s: string) {
  // s = s.toLowerCase();
  // s = s.replace(/\s/g, '');
  // s = s.replace(/[^a-zA-Z0-9]/g, '');
  // const origin = s;
  // s = s.split('').reverse().join('');
  // return s === origin;

  function isValid(c: string) {
    return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
  }

  let i = 0;
  let j = s.length - 1;

  while (j >= i) {
    const left = s[i].toLowerCase();
    const right = s[j].toLowerCase();
    if (!isValid(left)) {
      i++;
    } else if (!isValid(right)) {
      j--;
    } else if (left === right) {
      i++;
      j--;
    } else {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome('a b c b a'));

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
