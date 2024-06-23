'use client';
import styled from '@emotion/styled';
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
    .plus {
      position: fixed;
      top: var(--top);
      left: var(--left);
      border-radius: 50%;
      animation: moveY 0.8s cubic-bezier(0.5, -0.5, 1, 1);
      @keyframes moveY {
        100% {
          transform: translateY(var(--y));
        }
      }
      .plus-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #06f;
        color: #fff;
        animation: moveX 0.8s linear;
        @keyframes moveX {
          100% {
            transform: translateX(var(--x));
          }
        }
      }
    }
    .cart {
      width: 100px;
      height: 100px;
      background-color: #06f;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      position: fixed;
      bottom: 10rem;
      left: 10rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: 2px solid #06f;
      border-radius: 4px;
      background-color: #fff;
      outline: none;
      cursor: pointer;
      &:active {
        border-color: #f60;
      }
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <button
          onClick={() => {
            const button = document.querySelector('button');
            const content = document.querySelector('.content');
            const cart = document.querySelector('.cart');
            const div = document.createElement('div');
            const buttonRect = button?.getBoundingClientRect() as DOMRect;
            const cartRect = cart?.getBoundingClientRect() as DOMRect;
            div.className = 'plus';
            const top = buttonRect.top + buttonRect.height / 2 - 10;
            const left = buttonRect.left + buttonRect.width / 2 - 10;
            const x = -(left - (cartRect.left + cartRect.width / 2));
            const y = cartRect.top - top;
            div.style.setProperty('--top', `${top}px`);
            div.style.setProperty('--left', `${left}px`);
            div.style.setProperty('--x', `${x}px`);
            div.style.setProperty('--y', `${y}px`);
            div.innerHTML = `
              <div class="plus-icon">+</div>
            `;
            div.addEventListener('animationend', () => {
              div.remove();
            });
            content?.appendChild(div);
          }}
        >
          点击
        </button>
        <div className="cart">购物车</div>
      </div>
    </Container>
  );
};

export default PageContent;
