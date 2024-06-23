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

type Sig = 'Red' | 'Yellow' | 'Green';
type Times = [number, number, number];

class Single {
  private sig: Sig;
  private times: Times;
  private static serial = ['Red', 'Yellow', 'Green'];
  private start = 0;
  private end = 0;
  private eventMap: Map<string, Set<(_single: Single) => void>>;

  constructor(options: { sig: Sig; times: [number, number, number] }) {
    this.sig = options.sig;
    this.times = options.times;
    this.eventMap = new Map();
    this.eventMap.set('change', new Set());
    this.eventMap.set('tick', new Set());
    this.setTime();
    this.exchange();
  }

  get next() {
    return Single.serial[(Single.serial.indexOf(this.sig) + 1) % Single.serial.length];
  }

  get remain() {
    let diff = this.end - Date.now();
    if (diff < 0) {
      diff = 0;
    }
    return diff / 1000;
  }

  on(event: string, handler: (_single: Single) => void) {
    this.eventMap.get(event)?.add(handler);
  }

  off(event: string, handler: (_single: Single) => void) {
    this.eventMap.get(event)?.delete(handler);
  }

  emit(event: string) {
    this.eventMap.get(event)?.forEach((item) => {
      item.call(this, this);
    });
  }

  async exchange() {
    await 1;
    if (this.remain > 0) {
      this.emit('tick');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      // @ts-ignore
      this.sig = this.next;
      this.setTime();
      this.emit('change');
    }

    this.exchange();
  }

  setTime() {
    this.start = Date.now();
    const time = this.times[Single.serial.indexOf(this.sig)];
    this.end = this.start + time * 1000;
  }
}

const single = new Single({
  sig: 'Red',
  times: [10, 3, 5],
});
single.on('tick', (e) => {
  console.log(e.next, e.remain);
});
single.on('change', (e) => {
  console.log(e);
});

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
