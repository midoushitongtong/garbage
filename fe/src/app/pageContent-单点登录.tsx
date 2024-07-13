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
 * 单点登录
 *
 * token 模式
 * 客户端 => 认证中心(返回token) => 客户端保存token
 * 客户端(携带token) => 子系统(携带客户端的token) => 认证中心
 * 缺点：无法集中控制, 例如用户登录了10个子系统, 先让某个用户10个子系统同时下线
 *
 * 双 token 模式
 * 客户端 => 认证中心(返回token + refresh token) => 客户端保存token + refresh token
 * 客户端(携带token) => 子系统(携带客户端的token) => 认证中心 => token 过期 => 客户端(携带 refresh token) => 认证中心刷新 token
 * 缺点：可以集中控制, 用户token时效可以设为10分钟, 如果想让某个用户下线, 那么这个用户最多还能登录10分钟
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
