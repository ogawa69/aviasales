import React from 'react'

import styles from './Ticket.module.scss'

const Ticket = () => {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <span className={styles.ticket__price}>13 400</span>
        <span className={styles.ticket__logo}>Airlains</span>
      </div>
      <div className={styles.ticket__main}>
        <div className={styles.ticket__way}>
          <span className={styles['ticket__up-side-text']}>MOW – HKT</span>
          <span className={styles['ticket__down-side-text']}>10:45 – 08:00</span>
        </div>
        <div className={styles.ticket__time}>
          <span className={styles['ticket__up-side-text']}>В пути</span>
          <span className={styles['ticket__down-side-text']}>21ч 15м</span>
        </div>
        <div className={styles.ticket__transfers}>
          <span className={styles['ticket__up-side-text']}>2 пересадки</span>
          <span className={styles['ticket__down-side-text']}>HKG, JNB</span>
        </div>
      </div>
    </div>
  )
}

export default Ticket
