import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITimer, loadTimers, RootState } from '../../../store/store';
import { rightTimeDisplay } from '../../Helpers/time';
import { AddTaskForm } from './AddTaskForm';
import { TaskItem } from './TaskItem';
import styles from './tasksblock.css';

interface ITasksBlock {
  setDeleteTask: (deleteTask: boolean) => void;
  setIsLoaded: (loaded: boolean) => void;
  isBreak: boolean;
  deleteTask: boolean;
}

export function TasksBlock({ setIsLoaded, isBreak, deleteTask, setDeleteTask }: ITasksBlock) {
  let tasks: Array<ITimer> = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const dispatch = useDispatch();
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [changeTasks, setChangeTasks] = useState(false);
  let overalTime: number = 0;
  const [overalTimeDisplay, setOveralTimeDisplay] = useState('');
  const currentDate: Date = new Date;

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      const tasksStorage = localStorage.getItem('tasks');
      tasksStorage === null ? tasks = [] : tasks = JSON.parse(tasksStorage);

      const dateStorage = localStorage.getItem('date');
      if (dateStorage !== null) {
        if (dateStorage.split('T')[0] !== JSON.stringify(currentDate).split('T')[0]) {
          tasks = [];
          localStorage.setItem('tasks', JSON.stringify(tasks));
          localStorage.setItem('date', JSON.stringify(currentDate));
        }
      };
    } else {
      localStorage.setItem('date', JSON.stringify(new Date));
    }

    if (tasks.length > 0) {
      tasks.forEach((task: ITimer) => {
        task.done === false ? overalTime += (25 * (task.poms - task.currentPom) + Number(task.timer.split(':')[0])) : overalTime;
      });
      setOveralTimeDisplay(rightTimeDisplay(overalTime));
    }

    if (tasks.length === 0 && tasksLoaded) {
      setTasksLoaded(false);
      setIsLoaded(false);
    }

    if (!tasksLoaded && tasks.length > 0) {
      dispatch(loadTimers(tasks));
      setTasksLoaded(true);
      setIsLoaded(true);
    }
  }, [changeTasks, isBreak]);

  return (
    <div className={styles.tasksWrapper}>
      <h3 className={styles.title}>Hi! Now you can start working!</h3>
      <ul className={styles.instructionList}>
        <li className={styles.instructionItem}>Create your task list for today, add more poms if you need</li>
        <li className={styles.instructionItem}>Start timer (pomodoro)</li>
        <li className={styles.instructionItem}>Work until time runs out</li>
        <li className={styles.instructionItem}>Make a short break (5 minutes)</li>
        <li className={styles.instructionItem}>Every 4 pomodors make long break (15 minutes)</li>
        <li className={styles.instructionItem}>Keep working until all the pomodors are done</li>
      </ul>
      <AddTaskForm setChangeTasks={setChangeTasks} changeTasks={changeTasks} />
      <ul className={styles.list}>
        {tasksLoaded && tasks.map((task: ITimer) => (
          <TaskItem
            name={task.name}
            number={task.number}
            id={task.id}
            done={task.done}
            poms={task.poms}
            currentPom={task.currentPom}
            key={task.id}
            setChangeTasks={setChangeTasks}
            changeTasks={changeTasks}
            deleteTask={deleteTask}
            setDeleteTask={setDeleteTask}
          />
        ))}
      </ul>
      {tasksLoaded &&
        <span className={styles.overallTime}>{overalTimeDisplay}</span>
      }
    </div>
  );
}

