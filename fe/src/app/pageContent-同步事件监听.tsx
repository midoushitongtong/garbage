'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    text-align: center;
    button {
      font-size: 5rem;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    function getElement(selector: string) {
      const dom = document.querySelector(selector);
      if (!dom) {
        return;
      }

      const domProxy = new Proxy(dom, {
        get(target, key) {
          if (!key.toString().startsWith('wait')) {
            // @ts-ignore
            return target[key];
          }
          const event = key.toString().replace('wait', '').toLowerCase();
          return new Promise((resolve) => {
            target.addEventListener(event, resolve, {
              once: true,
            });
          });
        },
      });
      return domProxy;
    }

    (async () => {
      const btn = getElement('button');
      while (1) {
        // @ts-ignore
        await btn.waitClick;
        console.log('按钮被点击了');
      }
    })();
  }, []);

  return (
    <Container className="container">
      <div className="content">
        <button>Submit</button>
      </div>
    </Container>
  );
};

export default PageContent;
