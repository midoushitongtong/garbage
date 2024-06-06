'use client';
import styled from '@emotion/styled';
import Image from 'next/image';

const Container = styled.section`
  padding: 1rem;

  img {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    filter: drop-shadow(0 0 10px #000);
    /* 
      box-shadow 和 drop-shadow 的区别
       - box-shadow: 针对容器进行设置
       - drop-shadow: 针对像素点进行设置, 透明的区域就不管了
    */
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <Image
          src="https://www.w3schools.com/images/img_certification_up_generic_css_300.png"
          width={128}
          height={128}
          alt="avatar"
        />
      </Container>
    </>
  );
};

export default PageContent;
