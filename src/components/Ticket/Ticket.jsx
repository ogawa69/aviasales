import React from 'react'

import TicketInfo from '../TicketInfo'

import styles from './Ticket.module.scss'

const Ticket = ({ price, carrier, segments: [upSector, downSector] }) => {
  const formatPrice = price.toLocaleString('ru-RU') + ' Р'

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <span className={styles.ticket__price}>{formatPrice}</span>
        <img src={`//pics.avs.io/99/36/$${carrier}.png`} className={styles.ticket__logo}></img>
      </div>
      <div className={styles.ticket__main}>
        <TicketInfo info={upSector} />
        <TicketInfo info={downSector} />
      </div>
    </div>
  )
}

export default Ticket
