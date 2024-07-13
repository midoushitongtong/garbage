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
 * 验证码
 * 为什么需要验证码？
 * - 过滤无效请求，例如过滤掉机器的请求，从而减少服务器压力
 *
 * 为什么服务器不能确认请求是来自人还是机器？
 * - 因为人和机器提交的信息都是一样的，没办法进行区分，要进行区分就需要提交一些不一样的数据
 *   例如验证码，人能识别验证码，并能输入正确的答案，而机器识别不了，就能达到过滤无效请求的效果
 *
 * 验证码的类型
 * - 图片验证码，图片选择验证码、拖拽验证码
 *
 */

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
