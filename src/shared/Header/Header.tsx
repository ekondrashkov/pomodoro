import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.css';
import { HeaderLogo } from './HeaderLogo';
import { HeaderStatBtn } from './HeaderStatBtn';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to='/timer/'>
          <HeaderLogo />
        </Link>
        <Link to='/statistic/'>
          <HeaderStatBtn />
        </Link>
      </div>
    </header>
  );
}
