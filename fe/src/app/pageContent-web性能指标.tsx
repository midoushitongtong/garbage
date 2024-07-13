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

/**
 * web 性能指标
 *  - FCP，First Content Paint 首次内容绘制的时间
 *    时间越短代表白屏时间越短，用户体验就越好
 *  - LCP，Large Contentful Paint 最大内容加载的时间
 *    时间越短代表能更快速的看到页面中最重要信息，用户体验就越好
 *  - CLS，Cumulative Layout Shift 累积布局偏移
 *    值越大代表布局发生偏移的范围就越大，用户体验就越差
 *    例如：图片的加载，图片未加载完成时宽高是0，加载完成时宽高变成了200，此时图片大小发生了变化影响到了其他的元素位置，解决方案是一开始就限制图片的宽高
 *  - TTI，Time to Interactive 用户可交互的时间
 *    值越小用户体验越好
 *    例如：某个按钮渲染出来了，但是用户点了没反应，可能还未绑定点击事件，影响用户体验
 *  - TBT，Total Blok Time，总共阻塞的时间，FCP 到 TTI 之间的时间
 *    值越小越好
 *    例如：某个按钮渲染出来了，但是用户点了没反应，绑定点击事件的过程中，可能执行了一些很耗时的任务，比如渲染大量UI，等待某个异步操作等，TBT事件就会非常长，影响用户体验
 *
 * 如何检测 web 性能指标
 *  - 可以借助 lighthouse 工具，此工具不用下载 chrome 自带，工具在 f12 中
 */

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
