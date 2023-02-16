import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ITimer, updateTimers } from '../../../store/store';
import { CloseIcon } from '../../Svg/Close';
import styles from './endtask.css';

interface IEndTask {
  index: number;
  setIsBreak: (isBreak: boolean) => void;
  setIsDone: (isDone: boolean) => void;
}

export function EndTask({ index, setIsBreak, setIsDone }: IEndTask) {
  let tasks = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();

  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;

  function onDelete() {
    tasks[index].done = true;
    tasks[index].currentPom = tasks[index].poms;
    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setIsBreak(true);
    setIsDone(false);
  }

  function onCancel() {
    setIsDone(false);
  }

  function closeModal(event: any) {
    if (event.__isClicked) return;
    setIsDone(false);
  }

  function clicked(event: any) {
    event.__isClicked = true;
  }

  return ReactDOM.createPortal ((
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.deleteTask} onClick={clicked}>
        <span className={styles.deleteTaskText}>Confirm ending</span>
        <button className={styles.deleteTaskApprove} onClick={onDelete}>End</button>
        <button className={styles.deleteTaskCancel} onClick={onCancel}>Cancel</button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon />
        </button>
      </div>
    </div>
  ), modalRoot);
}
