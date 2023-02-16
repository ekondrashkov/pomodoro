import React from 'react';
import { LogoIcon } from '../../Svg/Logo';
import styles from './headerlogo.css';

export function HeaderLogo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.logoPic}>
        <LogoIcon />
      </div>
      <span className={styles.logoName}>pomodoro_box</span>
    </div>
  );
}
