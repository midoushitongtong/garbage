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
`;

const PageContent = () => {
  useEffect(() => {
    /**
     * HTMLCollection 的特性:
     *  - 具有实时性
     *  - getElementsByClassName 和 getElementsByTag 返回的是 HTMLCollection
     *  - 数组的长度会跟 dom 元素的长度保持一致, 例如新增了一个 dom 和删除了一个 dom 数组的长度也会跟随发生变化, 是实时的
     *  - 尽量不要用 HTMLCollection 因为可能会发生一些超出预期的行为, 我都没有去改变这个数组, 但是数组里面的内容自动变化了
     */
    const list1 = document.getElementsByClassName('content1');
    console.log(list1.length); // 长度是3
    setTimeout(() => {
      document.querySelector('.content1')?.remove();
      console.log(list1.length); // 长度变成了2
    }, 1000);

    /**
     * NodeList 的特性:
     *  - 非实时性
     *  - 数组的长度是固定的，不会随着 dom 元素的长度变化而变化
     *  - 比 HTMLCollection 的好, 数组的长度是可以预测的, 不会出现一些超出预期的行为
     */
    const list2 = document.querySelectorAll('.content2');
    console.log(list2.length); // 长度是3
    setTimeout(() => {
      document.querySelector('.content2')?.remove();
      console.log(list2.length); // 长度还是3
    }, 1000);
  }, []);

  return (
    <Container>
      <div className="content1">Hello World1</div>
      <div className="content1">Hello World1</div>
      <div className="content1">Hello World1</div>

      <div className="content2">Hello World2</div>
      <div className="content2">Hello World2</div>
      <div className="content2">Hello World2</div>
    </Container>
  );
};

export default PageContent;
