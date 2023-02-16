import React from 'react';
import { showWorkMinutes } from '../../../Helpers/minutes';
import styles from './currentdaydisplay.css';

interface ICurrentDayDisplay {
  currentDay: string;
  workingTime: number;
}

export function CurrentDayDisplay({ currentDay, workingTime }: ICurrentDayDisplay) {
  return (
    <div>
      <div className={styles.statDay}>
        <span className={styles.activeDay}>{currentDay}</span>
        {(workingTime === 0 || workingTime === undefined) &&
          <span className={styles.activeStatText}>No data</span>
        }
        {(workingTime !== 0 && workingTime !== undefined) &&
          <p className={styles.activeStatText}>You've been working for
            <span className={styles.activeStatTextMins}>{` ${Math.round(workingTime)} ${showWorkMinutes(Math.round(workingTime))}`}</span>
          </p>
        }
      </div>
    </div>
  );
}
