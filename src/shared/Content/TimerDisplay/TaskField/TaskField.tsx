import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITimer, RootState, updateTimers } from '../../../../store/store';
import { IWeekDigits, weekStatLoad } from '../../../Helpers/week';
import { EndTask } from '../../../Modal/EndTask';
import { AddTimeIcon } from '../../../Svg/AddTime';
import styles from './taskfield.css';

interface ITaskField {
  number: number;
  name: string;
  setIsBreak: (isBreak: boolean) => void;
  index: number;
  currentPom: number;
  setPomodoro: (pomodoro: string) => void;
  pomodoro: string;
  setPomDone: (pomDone: boolean) => void;
}

export function TaskField({ number, name, setIsBreak, index, currentPom, setPomodoro, pomodoro, setPomDone }: ITaskField) {
  let tasks = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();
  const [{ timerStarted, timerId, leftBtn }, setTimerStarted] = useState({ timerStarted: false, timerId: 0, leftBtn: 'Start' });
  const [{ timerPaused, rightBtn }, setTimerPaused] = useState({ timerPaused: false, rightBtn: 'Stop' });
  const [pauseTime, setpauseTime] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [workingTime, setWorkingTime] = useState(0);

  let workInterwal: number = 0;
  let timeToPom: number = 0;

  let statStorage = localStorage.getItem('pomStat');
  let stats: Array<Array<IWeekDigits>> = [];
  statStorage === null ? stats = weekStatLoad() : stats = JSON.parse(statStorage);
  const todayDate = new Date;
  let todayDay = todayDate.getDay();
  todayDay === 0 ? todayDay = 7 : todayDay;

  let timerInterval: NodeJS.Timer;
  let min: number = Number(pomodoro.split(':')[0]);
  let sec: number = Number(pomodoro.split(':')[1]);
  let showMin: string = '';
  let showSec: string = '';

  function updateTask(newTime: string) {
    tasks[index].timer = newTime;
    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Left button
  function startPomodoro() {
    // Launch and relaunch timer
    if ((!timerStarted && !timerPaused) || (timerStarted && timerPaused)) {
      const rightButton = document.getElementById('stop-btn');
      rightButton?.classList.add('redBtn');
      const TimerDisplay = document.getElementById('timer-display');
      TimerDisplay?.classList.add('text-red');
      setWorkingTime(Number(new Date));
      let startTime: number = Number(new Date);
      // "Stop" enabled
      if (!timerStarted && !timerPaused) {
        const TimerDisplayHeader = document.getElementById('timer-display-header');
        TimerDisplayHeader?.classList.add('background-red');
      };
      setTimerPaused({ timerPaused: false, rightBtn: 'Stop' });
      // Pause time calculation
      tasks[index].paused = false;
      if (pauseTime !== 0) {
        const secOnPause: number = (Number(new Date) - pauseTime) / 1000 / 60;
        tasks[index].pauseTime += secOnPause;
        stats[0][todayDay - 1].timepaused += secOnPause;
        localStorage.setItem('pomStat', JSON.stringify(stats));
      }
      updateTask(pomodoro);
      // Launch timer (interval)
      timerInterval = setInterval(() => {
        if (sec === 0 && min > 0) {
          min--;
          sec = 59;
        } else if (sec === 0 && min === 0) {
          clearInterval(timerInterval);
          setPomDone(true);

          setTimerStarted({ timerStarted: false, timerId: 0, leftBtn: 'Start' });
          if (tasks[index].poms === tasks[index].currentPom) {
            tasks[index].done = true;
          };

          stats[0][todayDay - 1].pomsDone += 1;
          workInterwal = (Number(new Date) - startTime) / 1000 / 60;
          stats[0][todayDay - 1].timeworking += workInterwal;
          localStorage.setItem('pomStat', JSON.stringify(stats));
          tasks[index].timer = '25:00';
          tasks[index].currentPom += 1;
          dispatch(updateTimers(tasks));
          localStorage.setItem('tasks', JSON.stringify(tasks));
          setIsBreak(true);
        } else { sec--; };

        min < 10 ? showMin = `0${min}` : showMin = `${min}`;
        sec < 10 ? showSec = `0${sec}` : showSec = `${sec}`;
        setPomodoro(`${showMin}:${showSec}`);
      }, 1000);

      setTimerStarted({ timerStarted: true, timerId: Number(timerInterval), leftBtn: 'Pause' });
    }
    // Pause
    if (timerStarted && !timerPaused) {
      const TimerDisplay = document.getElementById('timer-display');
      TimerDisplay?.classList.remove('text-red');

      workInterwal = (Number(new Date) - workingTime) / 1000 / 60;
      stats[0][todayDay - 1].timeworking += workInterwal;

      setpauseTime(Number(new Date));
      tasks[index].paused = true;
      stats[0][todayDay - 1].stops += 1;
      localStorage.setItem('pomStat', JSON.stringify(stats));
      updateTask(pomodoro);

      setTimerPaused({ timerPaused: true, rightBtn: 'Done' });
      clearInterval(timerId);
      setTimerStarted({ timerStarted: true, timerId: 0, leftBtn: 'Continue' });
    }
  }

  // Right button
  function stopPomodoro() {
    if (!timerStarted) return;

    const TimerDisplay = document.getElementById('timer-display');
    TimerDisplay?.classList.remove('text-red');

    let workInterwal = (Number(new Date) - workingTime) / 1000 / 60;
    stats[0][todayDay - 1].timeworking += workInterwal;

    clearInterval(timerId);
    setTimerStarted({ timerStarted: true, timerId: 0, leftBtn: 'Continue' });
    setTimerPaused({ timerPaused: true, rightBtn: 'Done' });

    updateTask(pomodoro);

    setIsDone(true);
  }

  function addTime() {
    if ((!timerStarted && timerPaused) || (timerStarted && !timerPaused)) return;

    let curMin: number = Number(pomodoro.split(':')[0]) + 1;
    let curSec: number = Number(pomodoro.split(':')[1]);
    let showNewMin: string = '';
    let showNewSec: string = '';

    curMin < 10 ? showNewMin = `0${curMin}` : showNewMin = `${curMin}`;
    curSec < 10 ? showNewSec = `0${curSec}` : showNewSec = `${curSec}`;
    setPomodoro(`${showNewMin}:${showNewSec}`);
    updateTask(`${showNewMin}:${showNewSec}`);
  }

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.taskHeader} id='timer-display-header'>
        <span className={styles.taskPomName}>{name}</span>
        <span className={styles.taskPomNum}>{`Pomodoro ${currentPom}`}</span>
      </div>
      <div className={styles.timer}>
        <div className={styles.timeWrapper}>
          <span className={styles.time} id='timer-display'>{pomodoro}</span>
          <button className={styles.addTimeBtn} onClick={addTime}>
            <AddTimeIcon />
          </button>
        </div>
        <div className={styles.taskDescr}>
          <span className={styles.taskNum}>{`Task ${number} - `}</span>
          <span className={styles.taskName}>{name}</span>
        </div>
        <div className={styles.handlers}>
          <button className={styles.btnStart} onClick={startPomodoro}>{leftBtn}</button>
          <button className={styles.btnStop} onClick={stopPomodoro} id='stop-btn'>{rightBtn}</button>
        </div>
      </div>

      {isDone && <EndTask index={index} setIsBreak={setIsBreak} setIsDone={setIsDone}/>}
    </div>
  );
}
