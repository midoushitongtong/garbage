'use client';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';

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

export const useBroadcastChannel = (props: {
  name: string;
  handlePostMessage?: (_e: MessageEvent<any>) => void;
}) => {
  const { name, handlePostMessage } = props;
  const idRef = useRef(Math.random().toString());
  const broadcastChannelRef = useRef<BroadcastChannel>();
  const listenerListRef = useRef<Set<string>>(new Set());

  const innerHandlePostMessage = useCallback(
    (e: MessageEvent<any>) => {
      const broadcastChannel = broadcastChannelRef.current;

      if (!broadcastChannel) {
        return;
      }

      if (e.data.type === 'newListener') {
        listenerListRef.current.clear();
        broadcastChannel.postMessage({ type: 'send', id: idRef.current });
      } else if (e.data.type === 'send') {
        broadcastChannel.postMessage({ type: 'receive', id: e.data.id, listenerId: idRef.current });
      } else if (e.data.type === 'receive') {
        if (e.data.id === idRef.current) {
          listenerListRef.current.add(e.data.listenerId);
        }
      }

      handlePostMessage && handlePostMessage(e);
    },
    [handlePostMessage]
  );

  const getListenerList = useCallback(() => {
    const broadcastChannel = broadcastChannelRef.current;

    if (!broadcastChannel) {
      return;
    }

    listenerListRef.current.clear();
    broadcastChannel.postMessage({ type: 'send', id: idRef.current });

    return new Promise<Set<string>>((resolve) => {
      setTimeout(() => {
        resolve(listenerListRef.current);
      }, 50);
    });
  }, []);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(name);
    broadcastChannel.addEventListener('message', innerHandlePostMessage);
    broadcastChannel.postMessage({ type: 'newListener' });
    broadcastChannel.postMessage({ type: 'send', id: idRef.current });

    broadcastChannelRef.current = broadcastChannel;

    return () => {
      broadcastChannel.removeEventListener('message', innerHandlePostMessage);
      broadcastChannel.close();
    };
  }, [innerHandlePostMessage, name]);

  return {
    broadcastChannelRef,
    getListenerList,
  };
};

const PageContent = () => {
  const windowRef = useRef<Window | null>();
  const { broadcastChannelRef } = useBroadcastChannel({
    name: 'hello-world',
  });

  const handleCase = (caseSlug: string) => async () => {
    windowRef.current = window.open(`/play?caseSlug=${caseSlug}`, 'hello-world');
    broadcastChannelRef.current?.postMessage({
      type: 'changeCaseSlug',
      value: caseSlug,
    });
  };

  return (
    <Container>
      <div className="content">
        <button onClick={handleCase('1')}>按钮1</button>
        <button onClick={handleCase('2')}>按钮2</button>
        <button onClick={handleCase('3')}>按钮3</button>
      </div>
    </Container>
  );
};

export default PageContent;
