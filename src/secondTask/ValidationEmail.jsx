import React from 'react';
import { useState } from 'react';

import styles from './ValidationEmail.module.scss';

const ValidationEmail = () => {
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailR, setEmailR] = useState('');

  const blurHandler = (e) => {
    setEmailDirty(true);
  };

  const inputHandler = (e) => {
    setEmail(e.target.value);

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!String(e.target.value).toLowerCase().match(re)) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }

    const config = {
      read: ['sample@email.com', 'mark@fb.com', 'whoami@dot.com', 'test@email.com'],
      write: ['sample@email.com', 'test@email.com'],
    };

    let read_access = config.read.includes(e.target.value) ? true : false;
    let write_access = config.write.includes(e.target.value) ? true : false;

    if (read_access) setEmailR('Права доступа: read');
    if (write_access) setEmailR('Права доступа: write');
    if (read_access && write_access) setEmailR('Права доступа: read and write');
    if (!read_access && !write_access) setEmailR("У этого email'a нет прав!");
  };

  return (
    <div className={styles.root}>
      <input
        onChange={(e) => inputHandler(e)}
        onBlur={blurHandler}
        name="email"
        value={email}
        className={styles.input}
        placeholder="Введи Email..."
        type="text"
      />
      {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      {emailR && <div style={{ color: 'green' }}>{emailR}</div>}
    </div>
  );
};

export default ValidationEmail;
