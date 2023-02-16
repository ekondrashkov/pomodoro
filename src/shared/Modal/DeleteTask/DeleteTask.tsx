import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, ITimer, updateTimers } from '../../../store/store';
import { CloseIcon } from '../../Svg/Close';
import styles from './deletetask.css';

interface IDeleteTask {
  dropId: string;
  changeTasks: boolean;
  setChangeTasks: (changeTasks: boolean) => void;
  setModalDelete: (modalDelete: boolean) => void;
  deleteTask: boolean;
  setDeleteTask: (deleteTask: boolean) => void;
}

export function DeleteTask({ dropId, changeTasks, setChangeTasks, setModalDelete, setDeleteTask, deleteTask }: IDeleteTask) {
  let tasks = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();

  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;

  function onDelete() {
    for (let task = 0; task < tasks.length; task++) {
      if (tasks[task].id === dropId) {
        tasks.splice(task, 1);
        break;
      }
    }
    let num = 1;
    if (tasks.length !== 0) {
      tasks.map((task) => {
        task.number = num;
        num++;
      });
    }
    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setChangeTasks(!changeTasks);
    setDeleteTask(!deleteTask);
    setModalDelete(false);
  }

  function onCancel() {
    setModalDelete(false);
  }

  function closeModal(event: any) {
    if (event.__isClicked) return;
    setModalDelete(false);
  }

  function clicked(event: any) {
    event.__isClicked = true;
  }

  return ReactDOM.createPortal ((
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.deleteTask} onClick={clicked}>
        <span className={styles.deleteTaskText}>Confirm delete</span>
        <button className={styles.deleteTaskApprove} onClick={onDelete}>Delete</button>
        <button className={styles.deleteTaskCancel} onClick={onCancel}>Cancel</button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon />
        </button>
      </div>
    </div>
  ), modalRoot);
}
