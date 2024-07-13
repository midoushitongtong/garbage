'use client';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  const handleDownload = async () => {
    // 下载文件的方式 1:
    // 优点: 下载资源由前端控制, 可以对下载的资源进行二次修改
    // 缺点: 需要等待文件全部下载完成，才能触发浏览器的下载行为，如果文件很大，那么会占用很大的内存
    // const result = await fetch('/1.jpeg', {
    //   headers: {
    //     authorization: 'xxx',
    //   },
    // });
    // const blob = await result.blob();
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.download = '1.jpeg';
    // a.href = url;
    // a.click();

    // 下载文件的方式 2:
    // 优点: 直接触发浏览器的下载行为, 让浏览器进行流式传输, 不会占用内存空间
    // 缺点: 前端无法对资源进行二次修改, 大部分场景也不需要这样的需求
    const a = document.createElement('a');
    // 获取临时的下载地址, 这个地址只能使用一次, 访问过后就失效
    const downladUrl = '/1.jpeg?token=xxxxx';
    a.download = '1.jpeg';
    a.href = downladUrl;
    a.click();
  };

  return (
    <Container>
      <div className="content">Hello World</div>
      <Button variant="contained" onClick={handleDownload}>
        下载
      </Button>
    </Container>
  );
};

export default PageContent;
