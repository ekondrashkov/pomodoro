import React from 'react';
import ReactDOM from 'react-dom';
import { TomatoIcon } from '../../Svg/Tomato';
import styles from './pomdone.css';

interface IPomDone {
  setPomDone: (pomDone: boolean) => void;
}

export function PomDone({ setPomDone }: IPomDone) {
  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;

  setTimeout(() => {
    setPomDone(false);
  }, 3000)

  return ReactDOM.createPortal ((
    <div className={styles.pomDone}>
      <TomatoIcon />
      <span className={styles.pomText}>+1 pomodoro!</span>
    </div>
  ), modalRoot);
}
