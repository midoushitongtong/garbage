'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

class SuperTask {
  private taskList: {
    task: () => Promise<any>;
    resolve: (_value?: unknown) => void;
    reject: (_reason?: any) => void;
  }[] = [];
  private parallelCount = 0;
  private runningCount = 0;

  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.runningCount = 0;
    this.taskList = [];
  }

  add(task: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  private run() {
    while (this.runningCount < this.parallelCount) {
      const taskListItem = this.taskList.shift();
      if (!taskListItem) {
        return;
      }
      const { task, resolve, reject } = taskListItem;
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.run();
        });
    }
  }
}

function timeout(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const superTask = new SuperTask();

function addTask(time: number, name: string) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(1000, '1');
addTask(2000, '2');
addTask(3000, '3');

export default PageContent;
