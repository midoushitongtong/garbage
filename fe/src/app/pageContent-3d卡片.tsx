'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    .card {
      position: relative;
      width: 200px;
      height: 300px;
      margin: 2rem;
      &:nth-child(1) {
        .background {
          background-color: #06f;
        }
      }
      &:nth-child(2) {
        .background {
          background-color: #f60;
        }
      }
      &:hover {
        .background {
          transform: perspective(500px) rotateX(25deg);
          box-shadow: 0 35px 35px -8px rgba(0, 0, 0, 0.5);
        }
        .detail {
          opacity: 1;
          transform: perspective(500px) translate3d(0, -75px, 50px);
        }
        .title {
          transform: perspective(500px) translate3d(0, -25px, 50px);
        }
      }
      .background,
      .detail,
      .title {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
      }
      .background {
        z-index: 1;
      }
      .detail {
        z-index: 2;
        background-color: yellow;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin: -50px 0 0 -50px;
        opacity: 0;
      }
      .title {
        bottom: 0;
        height: auto;
        z-index: 3;
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">
        <div className="card">
          <div className="background"></div>
          <div className="title">Title</div>
          <div className="detail">Detail</div>
        </div>
        <div className="card">
          <div className="background"></div>
          <div className="title">Title</div>
          <div className="detail">Detail</div>
        </div>
      </div>
    </Container>
  );
};

export default PageContent;
