import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, ITimer } from '../../../store/store';
import { PomDone } from '../../Modal/PomDone';
import { PauseField } from './PauseField';
import { TaskField } from './TaskField';
import styles from './timerdisplay.css';

interface ITimerDisplay {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  setIsBreak: (isBreak: boolean) => void;
  isBreak: boolean;
  deleteTask: boolean;
}

export function TimerDisplay({ isLoaded, setIsLoaded, isBreak, setIsBreak, deleteTask }: ITimerDisplay) {
  let value = useSelector<RootState, Array<ITimer>>(state => state.timers);
  let index: number = value.length;
  const [pomDone, setPomDone] = useState(false);
  const [pauseNum, setPauseNum] = useState(1);
  const [pomodoro, setPomodoro] = useState('00:00');
  if (isLoaded && value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].done === false) {
        index = i;
        break;
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      // @ts-ignore
      const storage: [] = JSON.parse(localStorage.getItem('tasks'))
      storage.length > 0 ? setIsLoaded(true) : setIsLoaded(false);
    }
    if (value[index]) setPomodoro(value[index].timer);
  }, [isBreak, deleteTask, value]);

  return (
    <div className={styles.displayWrapper}>
      {isLoaded && !isBreak && value.length > 0 && index !== value.length
        && <TaskField number={value[index].number} name={value[index].name} currentPom={value[index].currentPom} setIsBreak={setIsBreak} index={index} setPomodoro={setPomodoro} pomodoro={pomodoro} setPomDone={setPomDone}/>}
      {isLoaded && isBreak && value.length > 0 && index !== value.length
        && <PauseField number={value[index].number} name={value[index].name} currentPom={value[index].currentPom} setIsBreak={setIsBreak} pauseNum={pauseNum} setPauseNum={setPauseNum}/>}
      {pomDone && <PomDone setPomDone={setPomDone}/>}
    </div>
  );
}
