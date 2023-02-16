import React from 'react';
import { showTomatosQuantity } from '../../../Helpers/tomates';
import { TomatoIcon } from '../../../Svg/Tomato';
import styles from './statpoms.css';

interface IStatPoms {
  poms: number;
}

export function StatPoms({ poms }: IStatPoms) {
  return (
    <div className={styles.pomsWrapper}>
      <div className={styles.pomsQuantityPic}>
        <TomatoIcon />
        <span className={styles.pomsQuantity}>{`x ${poms}`}</span>
      </div>
      <div className={styles.pomsQuantityText}>{`${poms} ${showTomatosQuantity(poms)}`}</div>
    </div>
  );
}
