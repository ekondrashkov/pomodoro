import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITimer, newTimers, RootState } from '../../../../store/store';
import styles from './addtaskform.css';

interface IAddTaskForm {
  changeTasks: boolean;
  setChangeTasks: (changeTasks: boolean) => void;
}

export function AddTaskForm({ setChangeTasks, changeTasks }: IAddTaskForm) {
  const value = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();

  function isClicked(event: FormEvent) {
    event.preventDefault();

    const form = event.target;
    // @ts-ignore
    const formData = new FormData(form);
    let taskName: any = '';
    if (formData.get('task') !== null) {
      taskName = formData.get('task');
    }
    // @ts-ignore
    let input: HTMLInputElement = document.getElementById('task-input');
    input.value = '';
    if (taskName.trim().length === 0) return;

    const newTask: ITimer = {
      number: value.length + 1,
      name: taskName,
      id: Math.random().toString(36).substring(2, 15),
      paused: false,
      pauseTime: 0,
      timer: '25:00',
      poms: 1,
      currentPom: 1,
      done: false
    }

    dispatch(newTimers(newTask));

    let storageTasks: Array<ITimer> = [];
    const tasksStorage = localStorage.getItem('tasks');
    tasksStorage === null ? storageTasks = [] : storageTasks = JSON.parse(tasksStorage);
    storageTasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(storageTasks));

    setChangeTasks(!changeTasks);
  }

  return (
    <form className={styles.form} onSubmit={isClicked} id='form'>
      <input type="text" name="task" id='task-input' placeholder='Task name' autoComplete='off' className={styles.addInput} />
      <button className={styles.addBtn} >Добавить</button>
    </form>
  );
}
