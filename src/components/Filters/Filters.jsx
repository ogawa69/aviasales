import React from 'react'

import styles from './Filters.module.scss'

const Filters = () => {
  return (
    <div className={styles.filters}>
      <button className={styles.filters__button}>Самый дешевый</button>
      <button className={styles.filters__button}>Самый быстрый</button>
      <button className={styles.filters__button}>Оптимальный</button>
    </div>
  )
}

export default Filters
