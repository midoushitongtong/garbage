'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

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
    border: 5px solid #ccc;
    border-image: linear-gradient(to right, #b6cb13, #f60) 1;
    clip-path: inset(0 round 5px);
    aspect-ratio: 1/1;
    padding: 2rem;
    cursor: pointer;
    &.drag-over {
      border-image: linear-gradient(to right, #06f, #f10) 1;
    }
    input {
      display: none;
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    console.log('Hello World');
  }, []);

  const handleUplaod = (files: File[]) => {
    console.log(files);
  };

  return (
    <Container>
      <div
        ref={contentRef}
        className={['content', isDragOver && 'drag-over'].join(' ')}
        onClick={() => {
          contentRef.current?.querySelector('input')?.click();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => {
          setIsDragOver(false);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          setIsDragOver(false);

          // 校验: 防止拖拽的不是文件, 用户可能拖拽一些 dom 元素
          if (!e.dataTransfer.types.includes('Files')) {
            return;
          }

          const items = e.dataTransfer.items;
          const entries: FileSystemEntry[] = [];

          // 将数据转为 entries 便于后续处理
          for (const item of items) {
            const entry = item.webkitGetAsEntry();
            entry && entries.push(entry);
          }

          // 将 entries 转为 files 数组
          const _generateFiles = async (entries: FileSystemEntry[]) => {
            const files: File[] = [];
            for await (const entry of entries) {
              if (entry.isFile) {
                // 文件
                const fileEntry = entry as FileSystemFileEntry;
                const file = await new Promise<File>((resolve, reject) => {
                  fileEntry.file(resolve, reject);
                });
                files.push(file);
              } else {
                // 文件夹
                const directoryEntry = entry as FileSystemDirectoryEntry;
                const reader = directoryEntry.createReader();
                const childrenEntries = await new Promise<FileSystemEntry[]>((resolve, reject) => {
                  reader.readEntries(resolve, reject);
                });
                const childrenFiles = await _generateFiles(childrenEntries);
                files.push(...childrenFiles);
              }
            }
            return files;
          };

          const files = await _generateFiles(entries);

          handleUplaod(files);
        }}
      >
        +
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            files?.[0] && handleUplaod([files[0]]);
          }}
        />
      </div>
    </Container>
  );
};

export default PageContent;
