import React from 'react';
import { NoPageIcon } from '../Svg/404Icon';
import styles from './nomatch.css';

export function NoMatch() {
  return (
    <main className={styles.content}>
      <section className={styles.container}>
        <div className={styles.noPageIcon}>
          <NoPageIcon />
        </div>
        <span className={styles.noPageText}>This page doesn't exist</span>
      </section>
    </main>
  );
}
