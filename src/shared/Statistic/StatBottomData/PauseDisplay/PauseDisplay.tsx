import React, { useState } from 'react';
import { PauseIcon } from '../../../Svg/PauseIcon';
import styles from './pausedisplay.css';

interface IPauseDisplay {
  pauseMin: number;
}

export function PauseDisplay({ pauseMin }: IPauseDisplay) {
  return (
    <div className={styles.statWrapper}>
      {pauseMin === 0 && <div className={styles.statPauses}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Pause time</h3>
          <span className={styles.textValue}>0м</span>
        </div>
        <div className={styles.iconBlock}>
          <PauseIcon />
        </div>
      </div>}

      {pauseMin !== 0 && <div className={styles.statPausesColor}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Pause time</h3>
          <span className={styles.textValue}>{`${pauseMin.toFixed(1)}м`}</span>
        </div>
        <div className={styles.iconBlockColor}>
          <PauseIcon />
        </div>
      </div>}
    </div>
  );
}
