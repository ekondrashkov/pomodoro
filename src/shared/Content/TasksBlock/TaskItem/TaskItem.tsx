import React, { useState } from 'react';
import { MenuIcon } from '../../../Svg/MenuIcon';
import { Dropdown } from './Dropdown';
import styles from './taskitem.css';

interface ITaskItem {
  number: number;
  name: string;
  id: string;
  changeTasks: boolean;
  done: boolean;
  poms: number;
  currentPom:  number;
  setChangeTasks: (changeTasks: boolean) => void;
  setDeleteTask: (deleteTask: boolean) => void;
  deleteTask: boolean;
}

export function TaskItem({ number, name, id, setChangeTasks, changeTasks, done, poms, currentPom, setDeleteTask, deleteTask }: ITaskItem) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  function isOpen() {
    setDropdownIsOpen(!dropdownIsOpen);
  }

  return (
    <li className={styles.item}>
      <div className={styles.name}>
        {!done && <div className={styles.number}>
          <span>{number}</span>
        </div>}
        {done && <div className={styles.numberDone}>
          <span>{number}</span>
        </div>}
        <span className={styles.text}>{`${name} (${done ? 'done' : `${poms - currentPom + 1} poms`})`}</span>
      </div>
      <div className={styles.dropdownMenu}>
        <button className={styles.menu} onClick={isOpen}>
          <MenuIcon />
        </button>

        {dropdownIsOpen &&
          <Dropdown
            dropId={id}
            setChangeTasks={setChangeTasks}
            changeTasks={changeTasks}
            done={done}
            deleteTask={deleteTask}
            setDeleteTask={setDeleteTask}
          />}
      </div >
    </li>
  );
}
