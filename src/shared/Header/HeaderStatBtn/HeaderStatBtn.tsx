import React from 'react';
import { StatIcon } from '../../Svg/Eqalizer';
import styles from './headerstatbtn.css';

export function HeaderStatBtn() {
  return (
    <button className={styles.btnStatistics}>
      <div className={styles.graph}>
        <StatIcon />
      </div>
      <span className={styles.statText}>Statistics</span>
    </button>
  );
}
