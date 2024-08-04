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

// vite 手动分包
// 为什么这么做?
// 在项目中有些第三方包如果版本没发生变化，那么包的内容也不会发生变化
// 如果每次打包不进行处理，打包的时候指纹会发生变化，就会导致客户端每次都重新加载相同的内容，降低了系统的性能
// 我们可以进行手动分包，确保第三方包只有在版本变化时才生成新的指纹，提高系统性能
// @ts-ignore
const config = defineConfig({
  build: {
    outDir: '../app/website',
    rollupOptions: {
      output: {
        manualChunks: {
          // 将以下包合并到 vendor 文件中
          vendor: ['vue', 'vue-i18n', 'vue-router', 'pinia', 'axios'],
          // 将 ant-design-vue 包合并到 vendor-ant-design-vue 文件中
          'vendor-ant-design-vue': ['ant-design-vue'],
          // 将 three 包合并到 vendor-three 文件中
          'vendor-three': ['three'],
        },
        // 其他写法
        // manualChunks: (id) => {
        //   if (['vue', 'vue-i18n', 'vue-router', 'pinia', 'axios'].some((item) => id.includes(item))) {
        //     return 'vendor';
        //   }
        //   if (['ant-design-vue'].some((item) => id.includes(item))) {
        //     return 'vendor-ant-design-vue';
        //   }
        //   if (['three'].some((item) => id.includes(item))) {
        //     return 'vendor-three';
        //   }
        // },
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
