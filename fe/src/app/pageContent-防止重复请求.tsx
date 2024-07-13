'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

let promise: Promise<any> | null = null;
const getInfo = () => {
  if (promise) {
    return promise;
  }
  promise = axios('https://dog.ceo/api/breeds/image/random');
  promise.finally(() => {
    promise = null;
  });
  return promise;
};

const PageContent = () => {
  const [info, setInfo] = useState();
  const handleGetInfo = async () => {
    const result = await getInfo();
    setInfo(result.data);
  };

  return (
    <Container>
      <Button variant="contained" onClick={handleGetInfo}>
        获取信息
      </Button>
      <div>{JSON.stringify(info)}</div>
    </Container>
  );
};

export default PageContent;
