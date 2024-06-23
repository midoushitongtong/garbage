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

function toChineseNum(num: number) {
  const strs = num
    .toString()
    .replace(/(?=(\d{4})+$)/g, ',')
    .split(',')
    .filter(Boolean);

  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千'];
  const bigUnits = ['', '万', '亿'];

  function _transform(numStr: string) {
    let result = '';
    for (let i = 0; i < numStr.length; i++) {
      const digit = +numStr[i];
      const char = chars[digit];
      const unit = units[numStr.length - 1 - i];
      if (digit === 0) {
        if (result[result.length - 1] !== chars[0]) {
          result += char;
        }
      } else {
        result += char + unit;
      }
    }
    if (result[result.length - 1] === chars[0]) {
      result = result.slice(0, -1);
    }
    return result;
  }

  let result = '';
  for (let i = 0; i < strs.length; i++) {
    const part = strs[i];
    const c = _transform(part);
    const bigUnit = c ? bigUnits[strs.length - 1 - i] : '';
    result += c + bigUnit;
  }

  return result;
}
console.log(toChineseNum(12345));
export default PageContent;
