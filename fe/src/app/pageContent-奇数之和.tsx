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

// 求 1 开始的前 n 个奇数之和
function sum(n: number) {
  // let res = 0;
  // for (let i = 0; i < n; i++) {
  //   res += i * 2 + 1;
  // }
  // return res;
  return n * n;
}

console.log(sum(5));

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
