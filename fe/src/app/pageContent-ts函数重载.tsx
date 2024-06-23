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

// ts 函数重载
function message(_options: object): void;
function message(_text: string): void;
function message(_text: string, _type: string): void;
function message(_text: string, _type: string, _duration: number): void;
function message(_text: string, _duration: number): void;
function message(_text: string, _duration: number, _onClose: Function): void;
function message(_text: string, _onClose: Function): void;
function message(
  _param1: string | object,
  _param2?: number | Function | string,
  _param3?: number | Function
) {}

message({
  text: 'hello',
  mode: 'success',
  onClose: function () {},
  duration: 3000,
});
message('dqw');
message('hello', 3000);
message('hello', function () {});
message('hello', 'success');
message('hello', 'success', 3000);
message('hello', 3000, function () {});

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
