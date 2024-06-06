'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  // 设置文字朝向
  writing-mode: vertical-lr;
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <h1>静夜思</h1>
        <div>床前明月光</div>
        <div>疑是地上霜</div>
        <div>举头望明月</div>
        <div>低头思故乡</div>
      </Container>
    </>
  );
};

export default PageContent;
