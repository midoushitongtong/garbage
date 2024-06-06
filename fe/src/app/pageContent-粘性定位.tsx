'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 1rem;
  .title {
    background-color: #ccc;
    padding: 1rem;
    position: sticky;
    top: 1rem;
    /**
      sticky 定位的依据:
      1. top 值是基于他的包含块来定位的，包含块就是第一个设置了overflow(非 visible)的父元素，如果没有这样的父元素就是基于窗口
      2. 当这个包含块离开视口，sticky 的元素也会随之离开 
    */
  }
  .value {
    padding: 1rem;
  }
`;

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>
          <div className="title">A</div>
          <div className="value">A 1</div>
          <div className="value">A 2</div>
          <div className="value">A 3</div>
          <div className="value">A 4</div>
          <div className="value">A 5</div>
          <div className="value">A 6</div>
          <div className="value">A 7</div>
          <div className="value">A 8</div>
          <div className="value">A 9</div>
          <div className="value">A 10</div>
        </div>
        <div>
          <div className="title">B</div>
          <div className="value">B 1</div>
          <div className="value">B 2</div>
          <div className="value">B 3</div>
          <div className="value">B 4</div>
          <div className="value">B 5</div>
          <div className="value">B 6</div>
          <div className="value">B 7</div>
          <div className="value">B 8</div>
          <div className="value">B 9</div>
          <div className="value">B 10</div>
        </div>
        <div>
          <div className="title">C</div>
          <div className="value">C 1</div>
          <div className="value">C 2</div>
          <div className="value">C 3</div>
          <div className="value">C 4</div>
          <div className="value">C 5</div>
          <div className="value">C 6</div>
          <div className="value">C 7</div>
          <div className="value">C 8</div>
          <div className="value">C 9</div>
          <div className="value">C 10</div>
        </div>
        <div>
          <div className="title">D</div>
          <div className="value">D 1</div>
          <div className="value">D 2</div>
          <div className="value">D 3</div>
          <div className="value">D 4</div>
          <div className="value">D 5</div>
          <div className="value">D 6</div>
          <div className="value">D 7</div>
          <div className="value">D 8</div>
          <div className="value">D 9</div>
          <div className="value">D 10</div>
        </div>
        <div>
          <div className="title">E</div>
          <div className="value">E 1</div>
          <div className="value">E 2</div>
          <div className="value">E 3</div>
          <div className="value">E 4</div>
          <div className="value">E 5</div>
          <div className="value">E 6</div>
          <div className="value">E 7</div>
          <div className="value">E 8</div>
          <div className="value">E 9</div>
          <div className="value">E 10</div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
