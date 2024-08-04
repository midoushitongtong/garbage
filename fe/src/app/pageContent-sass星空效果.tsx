'use client';
import { useEffect } from 'react';
import styles from './pageContent-sass星空效果.module.scss';

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['layer-1']}></div>
      <div className={styles['layer-2']}></div>
      <div className={styles['layer-3']}></div>
      <div className={styles['layer-4']}></div>
      <div className={styles['layer-5']}></div>
    </div>
  );
};

export default PageContent;
