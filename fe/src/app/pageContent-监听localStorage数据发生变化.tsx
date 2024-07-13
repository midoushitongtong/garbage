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

const useLocalStorage = (props: { key: string; onChange?: (data: any) => void }) => {
  const { key, onChange } = props;

  const handleStorage = (e: StorageEvent) => {
    if (e.key === key) {
      onChange && onChange(JSON.parse(e.newValue || '').data);
    }
  };

  const set = (data: any) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        id: Math.random() + '',
        data,
      })
    );
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    set,
  };
};

const PageContent = () => {
  const { set } = useLocalStorage({
    key: 'hello',
    onChange: (data) => {
      console.log(data);
    },
  });

  return (
    <Container>
      <div className="content">Hello World</div>
      <button
        onClick={() => {
          set({
            id: '1',
            name: 'hello world',
          });
        }}
      >
        click
      </button>
    </Container>
  );
};

export default PageContent;
