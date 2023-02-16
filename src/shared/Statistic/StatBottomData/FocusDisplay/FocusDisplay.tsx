import React from 'react';
import { FocusIcon } from '../../../Svg/FocusIcon';
import styles from './focusdisplay.css';

interface IFocusDisplay {
  poms: number;
  workTime: number;
  pauseTime: number;
}

export function FocusDisplay({ poms, workTime, pauseTime }: IFocusDisplay) {
  const focus = workTime + pauseTime;
  const focusPerc: number = Math.round(((25 * poms) / (workTime + pauseTime)) * 100);

  return (
    <div className={styles.statWrapper}>
      {focus === 0 && <div className={styles.statFocus}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Focus</h3>
          <span className={styles.textValue}>{`0%`}</span>
        </div>
        <div className={styles.iconBlock}>
          <FocusIcon />
        </div>
      </div>}

      {focus !== 0 && <div className={styles.statFocusColor}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Focus</h3>
          <span className={styles.textValue}>{`${focusPerc}%`}</span>
        </div>
        <div className={styles.iconBlockColor}>
          <FocusIcon />
        </div>
      </div>}
    </div>

  );
}
