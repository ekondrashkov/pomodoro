import React, { useEffect, useState } from 'react';
import { weekStatLoad, IWeekDigits } from '../Helpers/week';
import { StatBottomData } from './StatBottomData';
import { StatHeader } from './StatHeader';
import styles from './statistic.css';
import { StatMiddleData } from './StatMiddleData';

export type weekValue = {
  weekId: number;
  weekName: string;
}

export function Statistic() {
  let stats: Array<Array<IWeekDigits>> = [];
  const [selectItems, setSelectItems] = useState<Array<weekValue>>([{weekId: 0 , weekName: 'This week'}, {weekId: 1, weekName: 'Last week'}, {weekId: 2, weekName: '2 weeks ago'}]);

  if (!localStorage.getItem('pomStat')) {
    weekStatLoad();
  }

  let statStorage = localStorage.getItem('pomStat');
  statStorage === null ? stats = weekStatLoad() : stats = JSON.parse(statStorage);

  const todayDate = new Date;
  let todayDay = todayDate.getDay();
  todayDay === 0 ? todayDay = 7 : todayDay;

  const [choosenDay, setChoosenDay] = useState(todayDay);

  useEffect(() => {}, [selectItems, choosenDay])

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        <StatHeader selectItems={selectItems} setSelectItems={setSelectItems}/>
        <StatMiddleData dayStat={stats[selectItems[0].weekId][choosenDay - 1]} weekStat={stats[selectItems[0].weekId]} setChoosenDay={setChoosenDay} choosenDay={choosenDay}/>
        <StatBottomData stats={stats[selectItems[0].weekId][choosenDay - 1]} />
      </section>
    </main>
  );
}
