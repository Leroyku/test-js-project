import React from 'react';
import { useRef } from 'react';

import styles from './UrlDownloader.module.scss';

const UrlDownloader = () => {
  const inputRef = useRef(null);

  const onClickDownload = async () => {
    if (inputRef.current.value) {
      await fetch(inputRef.current.value)
        .then((res) => res.blob())
        .then((data) => {
          let url = URL.createObjectURL(data);
          let link = document.createElement('a');
          link.href = url;
          link.download = '';
          inputRef.current.append(link);
          link.style = 'display:none';
          link.click();
          link.remove();
        });
    }
  };

  return (
    <div className={styles.root}>
      <input ref={inputRef} className={styles.input} placeholder="Введи Url..." type="text" />
      <button onClick={onClickDownload} className={styles.btn}>
        Скачать файл
      </button>
    </div>
  );
};

export default UrlDownloader;
