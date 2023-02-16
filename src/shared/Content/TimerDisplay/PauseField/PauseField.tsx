import React, { useState } from 'react';
import { SkipPause } from '../../../Modal/SkipPause';
import { AddTimeIcon } from '../../../Svg/AddTime';
import styles from './pausefield.css';

interface IPauseField {
  number: number;
  name: string;
  setIsBreak: (isBreak: boolean) => void;
  currentPom: number;
  pauseNum: number;
  setPauseNum: (pauseNum: number) => void;
}

export function PauseField({ number, name, setIsBreak, currentPom, pauseNum, setPauseNum }: IPauseField) {
  let pauseDuration: string = '05:00';
  pauseNum % 4 === 0 ? pauseDuration = '15:00' : pauseDuration;
  const [pauseTime, setPauseTime] = useState(pauseDuration);
  const [{ timerPauseStarted, pauseTimerId, leftPauseBtn }, setTimerPauseStarted] = useState({ timerPauseStarted: false, pauseTimerId: 0, leftPauseBtn: 'Start' });
  const [timerPausePaused, setTimerPausePaused] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  let timerInterval: NodeJS.Timer;
  let min: number = Number(pauseTime.split(':')[0]);
  let sec: number = Number(pauseTime.split(':')[1]);
  let showMin: string = '';
  let showSec: string = '';

  function startPause() {
    // Launch and relaunch timer
    if ((!timerPauseStarted && !timerPausePaused) || (timerPauseStarted && timerPausePaused)) {
      const rightButton = document.getElementById('stop-pause-btn');
      rightButton?.classList.add('redBtn');
      const TimerDisplay = document.getElementById('pause-display');
      TimerDisplay?.classList.add('text-green');
      // "Stop" enabled
      if (!timerPauseStarted && !timerPausePaused) {
        const TimerDisplayHeader = document.getElementById('pause-display-header');
        TimerDisplayHeader?.classList.add('background-green');
      };
      setTimerPausePaused(false);
      timerInterval = setInterval(() => {
        if (sec === 0 && min > 0) {
          min--;
          sec = 59;
        } else if (sec === 0 && min === 0) {
          clearInterval(timerInterval);
          setTimerPauseStarted({ timerPauseStarted: false, pauseTimerId: 0, leftPauseBtn: 'Continue' });
          setPauseNum(pauseNum + 1);
          setIsBreak(false);
        } else { sec--; };

        min < 10 ? showMin = `0${min}` : showMin = `${min}`;
        sec < 10 ? showSec = `0${sec}` : showSec = `${sec}`;
        setPauseTime(`${showMin}:${showSec}`);
      }, 1000);

      setTimerPauseStarted({ timerPauseStarted: true, pauseTimerId: Number(timerInterval), leftPauseBtn: 'Pause' });
    }

    // Pause
    if (timerPauseStarted && !timerPausePaused) {
      const TimerDisplay = document.getElementById('pause-display');
      TimerDisplay?.classList.remove('text-green');
      setTimerPausePaused(true);
      clearInterval(pauseTimerId);
      setTimerPauseStarted({ timerPauseStarted: true, pauseTimerId: 0, leftPauseBtn: 'Continue' });
    }
  }

  function stopPause() {
    if (!timerPauseStarted) return;
    clearInterval(pauseTimerId);
    setTimerPauseStarted({ timerPauseStarted: true, pauseTimerId: 0, leftPauseBtn: 'Continue' });
    setTimerPausePaused(true);
    setIsSkipped(true);
  }

  function addPauseTime() {
    if ((!timerPauseStarted && timerPausePaused) || (timerPauseStarted && !timerPausePaused)) return;

    let curMin: number = Number(pauseTime.split(':')[0]) + 1;
    let curSec: number = Number(pauseTime.split(':')[1]);
    let showNewMin: string = '';
    let showNewSec: string = '';

    curMin < 10 ? showNewMin = `0${curMin}` : showNewMin = `${curMin}`;
    curSec < 10 ? showNewSec = `0${curSec}` : showNewSec = `${curSec}`;
    setPauseTime(`${showNewMin}:${showNewSec}`);
  }

  return (
    <div className={styles.pauseWrapper}>
      <div className={styles.pauseHeader} id='pause-display-header'>
        <span className={styles.pausePomName}>{`Pause: ${name}`}</span>
        <span className={styles.pausePomNum}>{`Pomodoro ${currentPom}`}</span>
      </div>
      <div className={styles.timer}>
        <div className={styles.timeWrapper}>
          <span className={styles.time} id='pause-display'>{pauseTime}</span>
          <button className={styles.addTimeBtn} onClick={addPauseTime}>
            <AddTimeIcon />
          </button>
        </div>
        <div className={styles.pauseDescr}>
          <span className={styles.pauseNum}>{`Task ${number} - `}</span>
          <span className={styles.pauseName}>{name}</span>
        </div>
        <div className={styles.handlers}>
          <button className={styles.btnStart} onClick={startPause}>{leftPauseBtn}</button>
          <button className={styles.btnStop} onClick={stopPause} id='stop-pause-btn'>Skip</button>
        </div>
      </div>

      {isSkipped && <SkipPause setIsSkipped={setIsSkipped} setIsBreak={setIsBreak}/>}
    </div>
  );
}
