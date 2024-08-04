'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">100</div>
      <Button
        variant="contained"
        onClick={() => {
          function animation(
            duration: number,
            from: number,
            to: number,
            callcabak: (_value: number) => void
          ) {
            const step = (to - from) / duration;
            const startTime = Date.now();
            let value = from;

            function _run() {
              const now = Date.now();
              const time = now - startTime;
              if (time >= duration) {
                value = to;
                callcabak(value);
                return;
              }
              value = from + step * time;
              callcabak(value);
              requestAnimationFrame(_run);
            }

            _run();
          }

          animation(3000, 100, 999, (value) => {
            // @ts-ignore
            document.querySelector('.content').textContent = parseInt(value);
          });
        }}
      >
        变化
      </Button>
    </Container>
  );
};

export default PageContent;
