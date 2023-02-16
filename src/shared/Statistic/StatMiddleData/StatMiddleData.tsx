import React, { useEffect, useState } from 'react';
import { IWeekDigits } from '../../Helpers/week';
import { StatEmptyPom } from '../../Svg/StatEmptyPom';
import { CurrentDayDisplay } from './CurrentDayDisplay';
import { StatGraph } from './StatGraph';
import styles from './statmiddledata.css';
import { StatPoms } from './StatPoms';

interface IStatMiddleData {
  dayStat: IWeekDigits;
  weekStat: Array<IWeekDigits>;
  setChoosenDay: (choosenDay: number) => void;
  choosenDay: number;
}

export function StatMiddleData({ dayStat, weekStat, setChoosenDay, choosenDay }: IStatMiddleData) {
  const [pomsEmpty, setPomsEmpty] = useState(true);

  useEffect(() => {
    dayStat.pomsDone !== 0 ? setPomsEmpty(false) : setPomsEmpty(true);
  }, [dayStat])

  return (
    <div className={styles.statWrapper}>
      <CurrentDayDisplay currentDay={dayStat.dayName} workingTime={dayStat.timeworking}/>
      <StatGraph weekStat={weekStat} setChoosenDay={setChoosenDay} choosenDay={choosenDay}/>

      <div className={styles.statPoms}>
        {pomsEmpty && <StatEmptyPom />}
        {!pomsEmpty && <StatPoms poms={dayStat.pomsDone}/>}
      </div>
    </div>
  );
}
