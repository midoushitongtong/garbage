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
    font-size: 5rem;
    text-align: center;
  }
`;

const arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const isWin = (board: any, x: any, y: any, type: any) => {
  board[x][y] = type;

  const checkHorizontal = () => {
    let _y1 = y;
    let _y2 = y;
    let _points = [board[x][y]];
    for (let i = 0; i < 4; i++) {
      _y1 -= 1;
      _y2 += 1;
      _points.unshift(board[x]?.[_y1]);
      _points.push(board[x]?.[_y2]);
    }
    let count = 0;
    return _points.some((item) => {
      if (item === type) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        count = 0;
      }
    });
  };

  const checkVertical = () => {
    let _y1 = y;
    let _y2 = y;
    let _points = [board[x][y]];
    for (let i = 0; i < 4; i++) {
      _y1 -= 1;
      _y2 += 1;
      _points.unshift(board[x]?.[_y1]);
      _points.push(board[x]?.[_y2]);
    }
    let count = 0;
    return _points.some((item) => {
      if (item === type) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        count = 0;
      }
    });
  };

  const checkSlash = () => {
    let _x1 = x;
    let _x2 = x;
    let _y1 = y;
    let _y2 = y;
    let _points = [board[x][y]];
    for (let i = 0; i < 4; i++) {
      _x1 -= 1;
      _y1 -= 1;
      _x2 += 1;
      _y2 += 1;
      _points.unshift(board[_x1]?.[_y1]);
      _points.push(board[_x2]?.[_y2]);
    }
    let count = 0;
    return _points.some((item) => {
      if (item === type) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        count = 0;
      }
    });
  };

  const checkBackslash = () => {
    let _x1 = x;
    let _x2 = x;
    let _y1 = y;
    let _y2 = y;
    let _points = [board[x][y]];
    for (let i = 0; i < 4; i++) {
      _x1 += 1;
      _y1 -= 1;
      _x2 -= 1;
      _y2 += 1;
      _points.unshift(board[_x1]?.[_y1]);
      _points.push(board[_x2]?.[_y2]);
    }
    let count = 0;
    return _points.some((item) => {
      if (item === type) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        count = 0;
      }
    });
  };

  return checkHorizontal() || checkVertical() || checkSlash() || checkBackslash();
};

console.log(isWin(arr, 3, 3, 1));

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
