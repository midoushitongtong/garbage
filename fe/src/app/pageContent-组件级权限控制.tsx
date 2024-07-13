'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import Authority from './pageContent-组件级权限控制-Button';

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
      <div className="content">Hello World</div>
      <Authority permission="add">add</Authority>
      <br />
      <Authority permission="edit">edit</Authority>
      <br />
      <Authority permission={['add', 'edit']}>add and edit</Authority>
      <br />
      <Authority permission="add">
        {(userPermissions) => {
          return userPermissions.includes('add') && 'add custom';
        }}
      </Authority>
      <br />
    </Container>
  );
};

export default PageContent;
