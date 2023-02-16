import React from 'react';
import { StopIcon } from '../../../Svg/StopIcon';
import styles from './stopsdisplay.css';

interface IStopsDisplay {
  stops: number
}

export function StopsDisplay({ stops }: IStopsDisplay) {
  return (
    <div className={styles.statWrapepr}>
      {stops === 0 && <div className={styles.statStops}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Stops</h3>
          <span className={styles.textValue}>0</span>
        </div>
        <div className={styles.iconBlock}>
          <StopIcon />
        </div>
      </div>}

      {stops !== 0 && <div className={styles.statStopsColor}>
        <div className={styles.textBlock}>
          <h3 className={styles.textTitle}>Stops</h3>
          <span className={styles.textValue}>{stops}</span>
        </div>
        <div className={styles.iconBlockColor}>
          <StopIcon />
        </div>
      </div>}
    </div>
  );
}
