import React, { useEffect } from 'react';
import { weekStatLoad, IWeekDigits, showMonth, getDateFn } from '../Helpers/week';
import styles from './content.css';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  if (!localStorage.getItem('pomStat')) {
    weekStatLoad();
  } else {
    let statStorage = localStorage.getItem('pomStat');
    let stats: Array<Array<IWeekDigits>> = [];
    statStorage === null ? stats = weekStatLoad() : stats = JSON.parse(statStorage);

    const todayDate = new Date;
    let todayDay = todayDate.getDay();
    todayDay === 0 ? todayDay = 7 : todayDay;
    const today = `${todayDate.getDate()} ${showMonth(todayDate.getMonth())}`;

    if (stats[0][todayDay - 1].date !== today) {
      stats.splice(2, 1);
      stats.unshift([
        {
          dayNum: 1,
          dayName: 'Monday',
          dayShortName: 'Mo',
          date: getDateFn(Number(todayDate), todayDay, 1, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 2,
          dayName: 'Tuesday',
          dayShortName: 'Tu',
          date: getDateFn(Number(todayDate), todayDay, 2, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 3,
          dayName: 'Wednesday',
          dayShortName: 'We',
          date: getDateFn(Number(todayDate), todayDay, 3, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 4,
          dayName: 'Thursday',
          dayShortName: 'Th',
          date: getDateFn(Number(todayDate), todayDay, 4, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 5,
          dayName: 'Friday',
          dayShortName: 'Fr',
          date: getDateFn(Number(todayDate), todayDay, 5, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 6,
          dayName: 'Saturday',
          dayShortName: 'Sa',
          date: getDateFn(Number(todayDate), todayDay, 6, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        },
        {
          dayNum: 0,
          dayName: 'Sunday',
          dayShortName: 'Su',
          date: getDateFn(Number(todayDate), todayDay, 7, 0),
          pomsDone: 0,
          stops: 0,
          timepaused: 0,
          timeworking: 0,
        }
      ])
    };
    localStorage.setItem('pomStat', JSON.stringify(stats));
  }

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        {children}
      </section>
    </main>
  );
}

