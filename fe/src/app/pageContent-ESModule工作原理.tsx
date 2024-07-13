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
 * ESModule 工作原理
 *  main.js
 *    import foo from './foo.js';
 *    import ('./dynamic.js').then(module => {
 *      console.log(module.default);
 *    })
 *    console.log('main', foo, bar);
 *    import bar from './bar.js';
 *
 * foo.js
 *    import bar from './bar.js';
 *    console.log('foo', bar);
 *    export default 'foo';
 *
 * bar.js
 *    console.log('bar');
 *    export default 'bar';
 *
 *  index.html
 *    <script src="./main.js" type="module" />
 *
 *  1. 加载文件，首先会根据路径加载 main.js 的文件的内容
 *  2. 模块解析，会将静态导入语句全部提到文件的最前面，会加载 foo.js 以及 bar.js，得力于浏览器的自动纠错功能会将静态导入语句提到文件最前面，开发的时候尽量将静态导入语句都写在最前面，不要依赖浏览器的自动纠错功能
 *     同时下载 foo.js 和 bar.js 两个文件，然后同样对 foo.js 和 bar.js 进行模块解析，直到后续所有的模块都解析完成
 *     注意：到此为止一句代码都还没开始运行，只是对模块进行解析
 *  3. 模块执行，找到最开始的模块依次执行代码
 *     - bar.js - console.log('bar');
 *     - foo.js - console.log('foo', bar);
 *     - import ('./dynamic.js') 动态导入语句，遇到动态导入语句会进行异步的模块解析和模块执行，也就是重复第 2、3 步的流程
 *     - main.js - console.log(main, foo, bar);
 *
 * 符号绑定
 *  - import foo from './foo.js';
 *    这里的 foo 绑定的就是 foo 模块中的默认导出，这里的 foo 和 export default 使用同一块内存空间
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
