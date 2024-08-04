'use client';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Container = styled.section`
  padding: 1rem;

  .content {
    display: flex;
    .left {
      flex-shrink: 0;
      position: sticky;
      top: 1rem;
      height: calc(100vh - 2rem);
      padding: 1rem;
      .active {
        color: #06f;
      }
    }
    .right {
      padding-left: 1rem;
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState('1');

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const lis = [...content.querySelectorAll('li')];
    const titles = [...content.querySelectorAll('h1')];
    const scrollTop = window.scrollY;
    const id =
      titles.toReversed().find((item) => scrollTop >= item.offsetTop)?.dataset.id || lis[0]?.dataset?.id;
    setCurrentId(id + '');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <div ref={contentRef} className="content">
        <div className="left">
          <li data-id="1" className={[currentId === '1' && 'active'].join(' ')}>
            标题1
          </li>
          <li data-id="2" className={[currentId === '2' && 'active'].join(' ')}>
            标题2
          </li>
          <li data-id="3" className={[currentId === '3' && 'active'].join(' ')}>
            标题3
          </li>
        </div>
        <div className="right">
          <div>
            <h1 className="title" data-id="1">
              标题1
            </h1>
            {new Array(10).fill(1).map((_item, index) => (
              <p key={index}>
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
            ))}

            <h1 className="title" data-id="2">
              标题2
            </h1>
            {new Array(10).fill(1).map((_item, index) => (
              <p key={index}>
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
            ))}

            <h1 className="title" data-id="3">
              标题3
            </h1>
            {new Array(10).fill(1).map((_item, index) => (
              <p key={index}>
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
