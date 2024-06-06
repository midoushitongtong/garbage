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

function isFullCombination(datas: any[]) {
  if (datas.length === 0) {
    return;
  }
  const fieldMap = new Map<string, Set<string>>(); // 字段映射
  const keys = Object.keys(datas[0]);
  const combinationSet = new Set();
  const valueMap = new Map();
  let n = 1;
  for (const item of datas) {
    let combination = '';
    for (const key of keys) {
      const value = item[key];
      let valueSet = fieldMap.get(key);
      if (!valueSet) {
        valueSet = new Set();
        fieldMap.set(key, valueSet);
      }
      valueSet.add(value);
      let num = valueMap.get(value);
      if (!num) {
        num = n++;
        valueMap.set(value, n);
      }
      combination += `-${num}`;
    }
    if (combinationSet.has(combination)) {
      return false;
    }
    combinationSet.add(combination);
  }
  console.log(combinationSet);

  const n1 = [...fieldMap].reduce((s, [, v]) => s * v.size, 1);
  const n2 = datas.length;

  return n1 === n2;
}

const inputData = [
  { 字段1: '甲', 字段2: 'a', 字段3: '1' },
  { 字段1: '甲', 字段2: 'a', 字段3: '2' },
  { 字段1: '甲', 字段2: 'a', 字段3: '3' },
  { 字段1: '甲', 字段2: 'b', 字段3: '1' },
  { 字段1: '甲', 字段2: 'b', 字段3: '2' },
  { 字段1: '甲', 字段2: 'b', 字段3: '3' },
  { 字段1: '乙', 字段2: 'a', 字段3: '1' },
  { 字段1: '乙', 字段2: 'a', 字段3: '2' },
  { 字段1: '乙', 字段2: 'a', 字段3: '3' },
  { 字段1: '乙', 字段2: 'b', 字段3: '1' },
  { 字段1: '乙', 字段2: 'b', 字段3: '2' },
  { 字段1: '乙', 字段2: 'b', 字段3: '3' },
];

console.log(isFullCombination(inputData));

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
