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
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <button
        onClick={async () => {
          try {
            // 选择文件夹
            // @ts-ignore
            const handle = await window.showDirectoryPicker();

            // 将句柄转为树桩结构的对象
            const progessHandle = async (handle: any) => {
              if (handle.kind === 'file') {
                return handle;
              }
              handle.children = [];
              for await (const [, value] of handle.entries()) {
                handle.children.push(await progessHandle(value));
              }
              return handle;
            };
            const root = await progessHandle(handle);

            // 拿到某个文件的内容
            const fileHandle = root.children[0];
            const file = (await fileHandle.getFile()) as File;
            const getFileContent = (file: File) => {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  resolve(e.target?.result);
                };
                reader.readAsText(file, 'utf-8');
              });
            };
            const content = await getFileContent(file);

            // 修改文件内容
            const newContent = content + '\n123';
            const blob = new Blob([newContent], { type: 'text/plain' });
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
          } catch (error) {
            console.log(error);
            console.log('用户拒绝访问文件夹内容');
          }
        }}
      >
        选择文件夹
      </button>
    </Container>
  );
};

export default PageContent;
