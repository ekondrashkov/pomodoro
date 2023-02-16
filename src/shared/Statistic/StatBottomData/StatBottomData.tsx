import React, { useEffect, useState } from 'react';
import { IWeekDigits } from '../../Helpers/week';
import { FocusDisplay } from './FocusDisplay';
import { PauseDisplay } from './PauseDisplay';
import styles from './statbottomdata.css';
import { StopsDisplay } from './StopsDisplay';

interface IStatBottomData {
  stats: IWeekDigits;
}

export function StatBottomData({ stats }: IStatBottomData) {
  return (
    <div className={styles.statWrapper}>
      <FocusDisplay poms={stats.pomsDone} workTime={stats.timeworking} pauseTime={stats.timepaused}/>
      <PauseDisplay pauseMin={stats.timepaused}/>
      <StopsDisplay stops={stats.stops}/>
    </div>
  );
}
