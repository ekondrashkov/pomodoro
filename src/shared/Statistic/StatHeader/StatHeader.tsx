import React, { useState } from 'react';
import { SelectArrow } from '../../Svg/SelectArrow';
import { weekValue } from '../Statistic';
import styles from './statheader.css';

interface IStatHeader {
  setSelectItems: (selectItems: Array<weekValue>) => void;
  selectItems: Array<weekValue>;
}

export function StatHeader({ setSelectItems, selectItems }: IStatHeader) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  function isOpen() {
    setSelectIsOpen(!selectIsOpen);
  }

  function isChoosen(event: React.MouseEvent<HTMLDivElement>) {
    let value: string = ''
    event.currentTarget.textContent ? value = event.currentTarget.textContent : value;
    const firstValue: Array<weekValue> = selectItems.filter((item) => item.weekName === value);
    const dropdownValues: Array<weekValue> = selectItems.filter((item) => item.weekName !== value);
    setSelectItems([...firstValue, ...dropdownValues]);

    setSelectIsOpen(false);
  }

  return (
    <div className={styles.statHeaderWrapper}>
      <h2 className={styles.statTitile}>Your activity</h2>
      <div className={styles.selectWrapper}>
        <button className={styles.statWeekSelect} onClick={isOpen}>
          <span className={styles.statWeekNum}>{selectItems[0].weekName}</span>
          {!selectIsOpen && <div className={styles.arrow}>
            <SelectArrow />
          </div>}
          {selectIsOpen && <div className={styles.arrowOpen}>
            <SelectArrow />
          </div>}
        </button>

        {selectIsOpen &&
          <div className={styles.dropDown}>
            <div className={styles.dropDownItem} onClick={isChoosen}>{selectItems[1].weekName}</div>
            <div className={styles.dropDownItem} onClick={isChoosen}>{selectItems[2].weekName}</div>
          </div>}
      </div>
    </div>
  );
}
