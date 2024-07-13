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

/**
 * 字符串的 .length .slice 都是用的码元
 * '🦊' 这种特殊字符的码元占据两个单位
 * '🦊'.length  = 2
 * '1🦊'.slice(0, 2) 就会出现乱码，因为字符串的总长度是3，只取了前2个字符，取出来的最后1个字符就会是乱码
 * 要处理这种情况就需要用到码点，码点就是不管怎么样你一个字就算1个长度
 */

const PageContent = () => {
  const sliceByPoint = (str: string, pStart: number, pEnd: number) => {
    let result = ''; // 截取的结果
    let pIndex = 0; // 码点的指针
    let cIndex = 0; // 码元的指针
    while (true) {
      if (pIndex >= pEnd || cIndex >= str.length) {
        break;
      }
      const point = str.codePointAt(cIndex) || 0;
      if (pIndex >= pStart) {
        result += String.fromCodePoint(point);
      }
      pIndex++;
      cIndex += point > 0xffff ? 2 : 1;
    }
    return result;
  };

  useEffect(() => {
    console.log('Hello World');

    console.log(sliceByPoint('1🦊2', 0, 2));
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
