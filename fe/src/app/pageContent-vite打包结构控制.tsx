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
 * vite 打包结构控制
 * 通过 rollup 打包配置进行控制, 将特定格式的文件放到特定的目录中
 */
// @ts-ignore
const config = defineConfig({
  build: {
    outDir: '../app/website',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        // assetFileNames: '[ext]/[name]-[hash].[ext]',
        // @ts-ignore
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop() + '';
          if (/png|jpe?g|gif|webp|svg/i.test(ext)) {
            return 'images/[name]-[hash].[extname]';
          } else if (/css/i.test(ext)) {
            return 'css/[name]-[hash].[extname]';
          }
          return 'assets/[name]-[hash].[extname]';
        },
      },
    },
  },
});

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
