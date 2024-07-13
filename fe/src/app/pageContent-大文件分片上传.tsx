'use client';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import SparkMD5 from 'spark-md5';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
`;

// const CHUNK_SIZE = 1024 * 1024 * 5; // 5M

// function createChunk(file: File, index: number, chunkSize: number) {
//   return new Promise(async (resolve, reject) => {
//     const start = index * chunkSize;
//     const end = start + chunkSize;
//     const spart = new SparkMD5.ArrayBuffer();
//     const fileReader = new FileReader();

//     fileReader.onload = (e) => {
//       const result = e.target?.result;
//       if (!result) {
//         reject('read result fail');
//         return;
//       }
//       spart.append(result as ArrayBuffer);
//       resolve({
//         start,
//         end,
//         index,
//         hash: spart.end(),
//       });
//     };

//     fileReader.readAsArrayBuffer(file.slice(start, end));
//   });
// }

// async function cutFile(file: File) {
//   const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
//   const promiseResults = [];

//   for (let i = 0; i < chunkCount; i++) {
//     promiseResults.push(await createChunk(file, i, CHUNK_SIZE));
//   }

//   return promiseResults;
// }

const CHUNK_SIZE = 1024 * 1024 * 5; // 5M
const THREAD_COUNT = 4;

async function cutFile(file: File) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const results: any[] = [];
    let finishCount = 0;

    for (let i = 0; i < THREAD_COUNT; i++) {
      // 创建 worker 线程
      const worker = new Worker('/pageContent-大文件分片.js', {
        type: 'module',
      });
      const startIndex = i * workerChunkCount;
      const endIndex = Math.min(startIndex + workerChunkCount, chunkCount);
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
      });
      worker.onmessage = (e) => {
        for (let i = startIndex; i < endIndex; i++) {
          results[i] = e.data[i - startIndex];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(results);
        }
      };
    }
  });
}

const PageContent = () => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    console.time('cutFile time');
    const chunks = await cutFile(file);
    console.timeEnd('cutFile time');
    console.log(chunks);
  };

  return (
    <Container>
      <input type="file" onChange={handleFileChange} />
    </Container>
  );
};

export default PageContent;
