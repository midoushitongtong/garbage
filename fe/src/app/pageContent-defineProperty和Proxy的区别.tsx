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

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

/**
 * Proxy 和 defineProperty 的区别
 * - defineProperty 只能提供 get 和 set，proxy 能提供新增属性，删除属性的监听
 * - defineProperty 只是对象的基本方法只一, proxy 可以拦截所有的基本方法, 这个是主要的区别
 */

const PageContent = () => {
  // useEffect(() => {
  //   function isObject(value: any) {
  //     return typeof value === 'object' && value !== null;
  //   }

  //   function observe(obj: any) {
  //     for (const k in obj) {
  //       let v = obj[k];
  //       if (isObject(v)) {
  //         observe(v);
  //       }
  //       Object.defineProperty(obj, k, {
  //         get() {
  //           console.log('get', k, v);
  //           return v;
  //         },
  //         set(value) {
  //           console.log('set', k, value);
  //           if (value !== v) {
  //             v = value;
  //           }
  //         },
  //       });
  //     }
  //   }

  //   const obj = {
  //     a: '1',
  //   };

  //   observe(obj);

  //   obj.a = '1';
  //   obj.a;
  //   obj.a = '2';
  //   obj.a;
  // }, []);

  useEffect(() => {
    function isObject(value: any) {
      return typeof value === 'object' && value !== null;
    }

    function observe(value: any) {
      return new Proxy(value, {
        get(target: any, key: any) {
          let v = target[key];
          console.log('get', key, v);
          if (isObject(v)) {
            v = observe(v);
          }
          return v;
        },
        set(target: any, key: any, value: any) {
          if (target[key] !== value) {
            target[key] = value;
          }
          console.log('set', key, value);
          return true;
        },
      });
    }

    const obj = {
      a: '1',
      b: {
        c: '1',
      },
    };
    const proxy = observe(obj);
    proxy.a = '1';
    proxy.a;
    proxy.a = '2';
    proxy.a;
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
