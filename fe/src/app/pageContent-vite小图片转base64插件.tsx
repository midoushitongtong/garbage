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

// vite 图片转换
// vite 在生产环境中会将比较小的图片直接转为 base64 在开发环境中不会转换
// 如果我们想在开发环境中也进行转换可以借助 plugin 来实现
const imageTransform = (limit = 4096) => {
  return {
    name: 'imageTransform',
    // @ts-ignore
    async transform(code, id) {
      // @ts-ignore
      if (process.env.NODE_ENV !== 'developmnt') {
        return;
      }
      if (!id.endsWith('.png')) {
        return;
      }
      // @ts-ignore
      const stat = await fs.promises.stat(id);
      if (stat.size > limit) {
        return;
      }
      // @ts-ignore
      const buffer = await fs.promises.readFile(id);
      const base64 = buffer.toString('base64');
      const dataUrl = `data:image/png;base64,${base64}`;
      return {
        code: `export default "${dataUrl}"`,
      };
    },
  };
};

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
