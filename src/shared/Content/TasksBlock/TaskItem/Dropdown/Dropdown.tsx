import React, { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ITimer, updateTimers } from '../../../../../store/store';
import { DeleteTask } from '../../../../Modal/DeleteTask';
import { EditTask } from '../../../../Modal/EditTask';
import { DeleteIcon } from '../../../../Svg/Delete';
import { EditIcon } from '../../../../Svg/Edit';
import { PlusIcon } from '../../../../Svg/Plus';
import { ReduceIcon } from '../../../../Svg/Reduce';
import styles from './dropdown.css';

interface IDropdown {
  dropId: string;
  changeTasks: boolean;
  done: boolean;
  deleteTask: boolean;
  setDeleteTask: (deleteTask: boolean) => void;
  setChangeTasks: (changeTasks: boolean) => void;
}

export function Dropdown({ dropId, setChangeTasks, changeTasks, done, setDeleteTask, deleteTask }: IDropdown) {
  const tasks: Array<ITimer> = useSelector<RootState, Array<ITimer>>(state => state.timers);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const dispatch = useDispatch();

  function isIncreased() {
    tasks.map((task) => {
      if (task.id === dropId) {
        task.poms += 1;
      }
    });
    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setChangeTasks(!changeTasks);
  }

  function isReduced() {
    tasks.map((task) => {
      if (task.id === dropId) {
        if (task.poms === 1) return;
        task.poms -= 1;
      }
    });
    dispatch(updateTimers(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setChangeTasks(!changeTasks);
  }

  function isEdit() {
    setModalEdit(true);
  }

  return (
    <div className={styles.dropdown}>
      {!done && <button className={styles.button}>
        <div className={styles.icon}>
          <PlusIcon />
        </div>
        <span className={styles.btntext} onClick={isIncreased}>Add</span>
      </button>}
      {!done && <button className={styles.button}>
        <div className={styles.icon}>
          <ReduceIcon />
        </div>
        <span className={styles.btntext} onClick={isReduced}>Reduce</span>
      </button>}
      {!done && <button className={styles.button} onClick={isEdit}>
        <div className={styles.icon}>
          <EditIcon />
        </div>
        <span className={styles.btntext}>Edit</span>
      </button>}
      <button className={styles.button} onClick={() => setModalDelete(true)}>
        <div className={styles.icon}>
          <DeleteIcon />
        </div>
        <span className={styles.btntext}>Delete</span>
      </button>

      {modalDelete && <DeleteTask dropId={dropId} setChangeTasks={setChangeTasks} changeTasks={changeTasks} setModalDelete={setModalDelete} deleteTask={deleteTask} setDeleteTask={setDeleteTask}/>}

      {modalEdit && <EditTask setModalEdit={setModalEdit} id={dropId} setChangeTasks={setChangeTasks} changeTasks={changeTasks}/>}
    </div>
  );
}
