'use client';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
// @ts-ignore
import ColorThief from 'colorthief';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    position: relative;
    font-size: 5rem;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      opacity: 0.5;
    }
    .item {
      width: 50%;
      padding: 1rem;
      .inner {
        position: relative;
        &::after {
          content: '';
          display: flex;
          padding-bottom: 100%;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.25rem;
          transition: all 0.3s ease;
          &.active {
            z-index: 100;
            transform: scale(1.1);
          }
        }
      }
    }
  }
`;

const PageContent = () => {
  const [currentItem, setCurrentItem] = useState('');
  const list = ['/1.jpeg', '/2.webp', '/3.jpeg', '/4.webp'];

  useEffect(() => {}, []);

  return (
    <Container className="container">
      <div className="content">
        <div className="backdrop"></div>
        {list.map((item) => (
          <div key={item} className="item">
            <div className="inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item}
                alt={item}
                className={currentItem === item ? 'active' : ''}
                onMouseEnter={(e) => {
                  setCurrentItem(item);
                  const colorThief = new ColorThief();
                  const colors = colorThief.getPalette(e.target, 3);
                  const colorsString = colors.map(
                    (item: any) => `rgb(${item[0]}, ${item[1]}, ${item[2]})`
                  );
                  // @ts-ignore
                  document.querySelector('.backdrop').style.background =
                    `linear-gradient(to bottom, ${colorsString[0]}, ${colorsString[1]}, ${colorsString[2]})`;
                }}
                onMouseOut={() => setCurrentItem('')}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PageContent;
