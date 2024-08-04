'use client';
import styled from '@emotion/styled';
import { DragEvent, useEffect } from 'react';

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
    border: 1px solid #ccc;
    padding: 5rem;
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const _getFiles = async (entries: FileSystemEntry[]) => {
      let files: File[] = [];

      for await (const entry of entries) {
        if (entry?.isFile) {
          // 文件
          const fileEntry = entry as FileSystemFileEntry;
          const file = await new Promise<File>((resolve, reject) => {
            fileEntry.file(resolve, reject);
          });
          files.push(file);
        } else if (entry?.isDirectory) {
          // 目录
          const directoryEntry = entry as FileSystemDirectoryEntry;
          const reader = directoryEntry.createReader();
          const childEntries = await new Promise<FileSystemEntry[]>((resolve, reject) => {
            reader.readEntries(resolve, reject);
          });
          const childFiles = await _getFiles(childEntries);
          files.push(...childFiles);
        }
      }

      return files;
    };

    const entries: FileSystemEntry[] = [];
    for (const item of e.dataTransfer.items) {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(entry);
      }
    }

    const files = await _getFiles(entries);

    console.log(files);
  };

  return (
    <Container>
      <div
        className="content"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDragEnd}
      >
        将文件拖拽到此处
      </div>
    </Container>
  );
};

export default PageContent;
