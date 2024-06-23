'use client';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

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

const PageContent = () => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target?.result);
    };
    reader.readAsDataURL(file);
    console.log(URL.createObjectURL(file));
  };

  return (
    <Container>
      <input type="file" onChange={handleFileChange} />
    </Container>
  );
};

export default PageContent;
