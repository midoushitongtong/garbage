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

const str = 'dqwdwqdqdqwdqwdwqdqw';
// // 统计每个字符的次数
// const result = {};
// for (let i = 0; i < str.length; i++) {
//   if (result[str[i]]) {
//     result[str[i]]++;
//   } else {
//     result[str[i]] = 1;
//   }
// }a
// console.log(result);

const result = str
  .split('')
  .reduce<Record<string, number>>((prev, item) => (prev[item]++ || (prev[item] = 1), prev), {});
console.log(result);

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
