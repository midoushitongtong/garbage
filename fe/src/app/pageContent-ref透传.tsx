'use client';
import styled from '@emotion/styled';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
`;

const PageContent = () => {
  const aRef = useRef<ARef>(null);

  return (
    <Container>
      <A ref={aRef} />
      <button
        onClick={() => {
          aRef.current?.aInitModal();
          aRef.current?.bInitModal();
        }}
      >
        click
      </button>
    </Container>
  );
};

type ARef = {
  aInitModal: () => void;
} & BRef;
const A = forwardRef<ARef, {}>((_props, ref) => {
  const bRef = useRef<BRef>(null);

  useImperativeHandle(ref, () => ({
    ...(bRef.current as BRef),
    aInitModal: () => {
      console.log('a init modal');
    },
  }));
  return (
    <div>
      A
      <B ref={ref} />
    </div>
  );
});
A.displayName = 'A';

type BRef = {
  bInitModal: () => void;
};
const B = forwardRef<BRef, {}>((_props, ref) => {
  useImperativeHandle(ref, () => ({
    bInitModal: () => {
      console.log('b init modal');
    },
  }));
  return <div>B</div>;
});
B.displayName = 'B';

export default PageContent;
