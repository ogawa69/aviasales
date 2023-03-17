import { format } from 'date-fns'
import React from 'react'

import styles from './TicketInfo.module.scss'

const TicketInfo = (info) => {
  const { date, destination, duration, origin, stops } = info.info

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return (
      (String(hours).length > 1 ? hours : `0${hours}`) + ':' + (String(minutes).length > 1 ? minutes : `0${minutes}`)
    )
  }

  const formatDuration = getTimeFromMins(duration)
  const formatRoadDate = format(new Date(date), 'HH:mm') + ' - ' + format(new Date(date).setMinutes(duration), 'HH:mm')
  const formatTrans = (stops) => {
    if (stops.length === 1) {
      return stops.length + ' пересадка'
    }
    if (stops.length > 1) {
      return stops.length + ' пересадки'
    }
    return 'Без пересадок'
  }

  const road = [destination, origin].join(' - ')

  const stopList = stops.join(', ')

  return (
    <div className={styles.ticket__info}>
      <div className={styles.ticket__way}>
        <span className={styles['ticket__up-side-text']}>{road}</span>
        <span className={styles['ticket__down-side-text']}>{formatRoadDate}</span>
      </div>
      <div className={styles.ticket__time}>
        <span className={styles['ticket__up-side-text']}>В пути</span>
        <span className={styles['ticket__down-side-text']}>{formatDuration}</span>
      </div>
      <div className={styles.ticket__transfers}>
        <span className={styles['ticket__up-side-text']}>{formatTrans(stops)}</span>
        <span className={styles['ticket__down-side-text']}>{stopList}</span>
      </div>
    </div>
  )
}

export default TicketInfo
