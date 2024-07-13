import './spark-md5.min.js';

function createChunk(file, index, chunkSize) {
  return new Promise(async (resolve, reject) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spart = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (!result) {
        reject('read result fail');
        return;
      }
      spart.append(result);
      resolve({
        start,
        end,
        index,
        hash: spart.end(),
      });
    };

    fileReader.readAsArrayBuffer(file.slice(start, end));
  });
}

onmessage = async (e) => {
  const { file, CHUNK_SIZE, startIndex, endIndex } = e.data;

  const promiseResults = [];

  for (let i = startIndex; i < endIndex; i++) {
    promiseResults.push(createChunk(file, i, CHUNK_SIZE));
  }

  const chunks = await Promise.all(promiseResults);

  postMessage(chunks);
};
