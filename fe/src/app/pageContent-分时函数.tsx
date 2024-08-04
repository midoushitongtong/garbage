'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Container = styled.section`
  padding: 1rem;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

const PageContent = () => {
  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          // const datas = Array.from({ length: 100000 }, (_, i) => i + '1');

          performanceChunk(100000, (item) => {
            const div = document.createElement('div');
            div.innerHTML = item + '';
            document.body.appendChild(div);
          });

          function performanceChunk<T>(datas: T[] | number, callback: (_item: T) => void) {
            const formatDatas = Array.isArray(datas)
              ? datas
              : Array.from({ length: datas }, (_i, i) => i);
            let i = 0;

            function _run() {
              if (i >= formatDatas.length) return;
              requestIdleCallback((idle) => {
                while (idle.timeRemaining() > 0 && i < formatDatas.length) {
                  callback(formatDatas[i] as any);
                  i++;
                }
                _run();
              });
            }

            _run();
          }
        }}
      >
        Run
      </Button>
    </Container>
  );
};

export default PageContent;
