'use client';
import { useEffect } from 'react';
import styles from './pageContent-sass模块化开发-1.module.scss';

/**
 * sass 模块化开发
 * - @import 语法的问题
 *    - 混淆, 多个 @import 如果里面有相同的变量，会带来混淆，后者 @import 会覆盖前面的变量
 *    - 污染全局, @import 的变量都是全局的
 *    - 无法私有, @import 的文件内部无法定义私有的变量，都会变成全局的
 *
 * - @use 用于替换 @import 语法带来的问题
 *    - 模块化, 因为是模块化的, 所以就不会带来混淆和污染全局问题
 *    - 可私有, 变量名前面加_代表私有变量, 外部无法使用
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return <div className={styles.container}>Hello World</div>;
};

export default PageContent;
