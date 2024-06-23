'use client';
import styled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBroadcastChannel } from '../pageContent-夸标签通信';

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
  const route = useRouter();
  const searchParams = useSearchParams();
  const [caseSlug, setCaseSlug] = useState(searchParams.get('caseSlug'));

  const handlePostMessage = (e: MessageEvent<any>) => {
    if (e.data.type === 'changeCaseSlug') {
      setCaseSlug(e.data.value);
    }
  };

  useBroadcastChannel({
    name: 'hello-world',
    handlePostMessage,
  });

  useEffect(() => {
    route.replace('/play');
  }, [route]);

  return (
    <Container>
      <div className="content">Case Slug: {caseSlug}</div>
    </Container>
  );
};

export default PageContent;
