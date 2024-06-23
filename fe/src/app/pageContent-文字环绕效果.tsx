'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    text-align: center;
    img {
      float: left;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      shape-outside: circle(50%);
      border: 2px solid #06f;
    }
  }
`;

const Article = styled.section`
  margin-top: 2rem;
  .left,
  .right {
    width: 40%;
    height: 100px;
    background-color: #06f;
  }
  .left {
    float: left;
    --shape: 0 0, 0 100%, 100% 100%;
    shape-outside: polygon(var(--shape));
    clip-path: polygon(var(--shape));
  }
  .right {
    float: right;
    --shape: 100% 0, 0 100%, 100% 100%;
    shape-outside: polygon(var(--shape));
    clip-path: polygon(var(--shape));
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <img src="/1.jpeg" alt="" />
        <div>
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World
        </div>
      </div>

      <Article>
        <div className="left"></div>
        <div className="right"></div>
        <div>
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World
          Hello World Hello World Hello World Hello World
        </div>
      </Article>
    </Container>
  );
};

export default PageContent;
