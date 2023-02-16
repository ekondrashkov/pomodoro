import React from 'react';
import { graphTimeDisplay } from '../../../Helpers/axisTime';
import { IWeekDigits } from '../../../Helpers/week';
import { GraphBar } from './GraphBar';
import styles from './statgraph.css';

interface IStatGraph {
  weekStat: Array<IWeekDigits>;
  setChoosenDay: (choosenDay: number) => void;
  choosenDay: number;
}

export function StatGraph({ weekStat, setChoosenDay, choosenDay }: IStatGraph) {
  let maxValue = 0;
  weekStat.forEach((day) => {
    day.timeworking > maxValue ? maxValue = day.timeworking : maxValue;
  });

  return (
    <div className={styles.statGraph}>
      <div className={styles.graphField}>
        <ul className={styles.graphLines}>
          <li className={styles.graphLine}>
            <span className={styles.graphLineValue}>{graphTimeDisplay(maxValue / 5 * 4)}</span>
          </li>
          <li className={styles.graphLine}>
            <span className={styles.graphLineValue}>{graphTimeDisplay(maxValue / 5 * 3)}</span>
          </li>
          <li className={styles.graphLine}>
            <span className={styles.graphLineValue}>{graphTimeDisplay(maxValue / 5 * 2)}</span>
          </li>
          <li className={styles.graphLine}>
            <span className={styles.graphLineValue}>{graphTimeDisplay(maxValue / 5)}</span>
          </li>
        </ul>

        <ul className={styles.graphBars}>
          {weekStat.map((day: IWeekDigits) => (
            <GraphBar value={day.timeworking} maxValue={maxValue} dayName={day.dayShortName} dayNum={day.dayNum} key={`${day.date}`} setChoosenDay={setChoosenDay} choosenDay={choosenDay}/>
          ))}
        </ul>
      </div>

      <div className={styles.graphCaptionWrapper}>
        <div className={styles.graphCaption}></div>
      </div>
    </div>
  );
}
