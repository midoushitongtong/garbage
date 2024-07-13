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

function lengthOfLIS(nums: any[]) {
  if (nums.length === 0) return 0;
  // 初始化 tails 数组，第一个元素是 nums 的第一个元素
  let tails = [nums[0]];

  // 找到第一个大于等于 target 的位置
  function getFirstGenerateIndex(target: any) {
    for (let i = 0; i < tails.length; i++) {
      if (tails[i] >= target) {
        return i;
      }
    }
    return 0;
  }

  // 遍历 nums 从第二个元素开始
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > tails[tails.length - 1]) {
      // 如果当前元素比 tails 的最后一个元素大，就将其添加到 tails 数组末尾
      tails.push(nums[i]);
    } else {
      // 如果当前元素小于或等于 tails 的最后一个元素，则找到第一个大于等于当前元素的位置，并替换
      const index = getFirstGenerateIndex(nums[i]);
      tails[index] = nums[i];
    }
  }

  console.log(tails);

  return tails.length;
}

console.log(lengthOfLIS([6, 9, 11, 13, 15, 17, 5, 1]));

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
