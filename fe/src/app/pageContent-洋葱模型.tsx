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

class Task {
  private currentIndex = 0;
  private isRunning = false;
  private taskList: ((_next: Function) => void)[] = [];
  private next = async () => {
    this.currentIndex++;
    await this.runTask();
  };

  constructor() {
    this.taskList = [];
  }

  private reset() {
    this.currentIndex = 0;
    this.isRunning = false;
    this.taskList = [];
  }

  private async runTask() {
    if (this.currentIndex >= this.taskList.length) {
      this.reset();
      return;
    }

    const task = this.taskList[this.currentIndex];
    const i = this.currentIndex;
    await task(this.next);
    const j = this.currentIndex;
    if (i == j) {
      this.next();
    }
  }

  public addTask(task: (typeof this.taskList)[0]) {
    this.taskList.push(task);
  }

  public run() {
    if (this.isRunning || !this.taskList.length) {
      return;
    }
    this.isRunning = true;
    this.runTask();
  }
}

const t = new Task();

t.addTask(async (next) => {
  console.log(1, 'start');
  await next();
  console.log(1, 'end');
});

t.addTask(() => {
  console.log(2, 'end');
});

t.addTask(() => {
  console.log(3, 'end');
});

t.run();

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
