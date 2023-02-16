import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, ITimer, updateTimers } from '../../../store/store';
import { CloseIcon } from '../../Svg/Close';
import styles from './edittask.css';

interface IEditTask {
  setModalEdit: (modalEdit: boolean) => void;
  id: string;
  setChangeTasks: (changeTasks: boolean) => void;
  changeTasks: boolean;
}

export function EditTask({ setModalEdit, id, setChangeTasks, changeTasks }: IEditTask) {
  let tasks = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [index, setIndex] = useState(0);

  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;

  useEffect(() => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        setInputValue(tasks[i].name);
        setIndex(i);
        break;
      }
    }
  }, [])

  function onchange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (inputValue.trim().length === 0) return;

    const form = event.target;
    // @ts-ignore
    const formData = new FormData(form);
    let taskName: any = '';
    if (formData.get('newTaskName') !== null) {
      taskName = formData.get('newTaskName');
    }
    tasks[index].name = taskName;

    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setChangeTasks(!changeTasks);
    setModalEdit(false);
  }

  function onCancel() {
    setModalEdit(false);
  }

  function closeModal(event: any) {
    if (event.__isClicked) return;
    setModalEdit(false);
  }

  function clicked(event: any) {
    event.__isClicked = true;
  }

  return ReactDOM.createPortal ((
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.editTask} onClick={clicked}>
        <span className={styles.editTaskText}>Edit task</span>
        <form className={styles.editTaskForm} onSubmit={onSubmit}>
          <input type="text" name='newTaskName' value={inputValue} className={styles.editTaskInput} onChange={onchange}/>
          <button className={styles.editTaskApprove}>Save changes</button>
        </form>
        <button className={styles.editTaskCancel} onClick={onCancel}>Cancel</button>
        <button className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon />
        </button>
      </div>
    </div>
  ), modalRoot);
}
