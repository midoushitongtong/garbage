'use client';
import { useEffect } from 'react';
import styles from './pageContent-scss媒体查询.module.scss';

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return <div className={styles.content}>Hello World</div>;
};

export default PageContent;
