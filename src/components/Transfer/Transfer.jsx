import React from 'react'

import styles from './Transfer.module.scss'

const Transfer = () => {
  console.log(styles)
  return (
    <div className={styles.transfer}>
      <span className={styles.transfer__title}>Количество пересадок</span>
      <button type="checkbox" className={styles['transfer__check-box']}>
        Все
      </button>
      <button className={styles['transfer__check-box']}>Без пересадок</button>
      <button className={styles['transfer__check-box']}>1 пересадка</button>
      <button className={styles['transfer__check-box']}>2 пересадка</button>
      <button className={styles['transfer__check-box']}>3 пересадка</button>
    </div>
  )
}

export default Transfer
