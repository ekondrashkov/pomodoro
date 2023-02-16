import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../../Svg/Close';
import styles from './skippause.css';

interface ISkipPause {
  setIsSkipped: (isSkipped: false) => void;
  setIsBreak: (isBreak: boolean) => void;
}

export function SkipPause({ setIsSkipped, setIsBreak }: ISkipPause) {
  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;

  function onDelete() {
    setIsBreak(false);
    setIsSkipped(false);
  }

  function onCancel() {
    setIsSkipped(false);
  }

  function closeModal(event: any) {
    if (event.__isClicked) return;
    setIsSkipped(false);
  }

  function clicked(event: any) {
    event.__isClicked = true;
  }


  return ReactDOM.createPortal ((
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.skipPause} onClick={clicked}>
        <span className={styles.skipPauseText}>Confirm skipping</span>
        <button className={styles.skipPauseApprove} onClick={onDelete}>Skip</button>
        <button className={styles.skipPauseCancel} onClick={onCancel}>Cancel</button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon />
        </button>
      </div>
    </div>
  ), modalRoot);
}
