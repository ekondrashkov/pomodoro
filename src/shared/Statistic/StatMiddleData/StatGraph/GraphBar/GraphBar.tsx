import React from 'react';
import styles from './graphbar.css';

interface IGraphBar {
  value: number;
  maxValue: number;
  dayName: string;
  dayNum: number;
  setChoosenDay: (choosenDay: number) => void;
  choosenDay: number;
}

export function GraphBar({ value, maxValue, dayName, dayNum, setChoosenDay, choosenDay }: IGraphBar) {
  const hight: number = value / maxValue * 100;
  const hightStyle = {
    height: `${hight}%`
  }

  let todayDay: number = dayNum;
  dayNum === 0 ? todayDay = 7 : todayDay;

  function onClick() {
    setChoosenDay(todayDay);
  }

  return (
    <li className={styles.barWrapper} onClick={onClick}>
      {todayDay !== choosenDay && <div className={styles.bar} style={hightStyle}></div>}
      {todayDay === choosenDay && <div className={styles.barFocus} style={hightStyle}></div>}
      {todayDay !== choosenDay && <span className={styles.barDay}>{dayName}</span>}
      {todayDay === choosenDay && <span className={styles.barDayFocus}>{dayName}</span>}
    </li>
  );
}
