import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toogleTransfer } from '../../store/transferSlice'
import { transferItems } from '../../constants'

import styles from './Transfers.module.scss'

const Transfer = () => {
  const dispatch = useDispatch()
  const transfers = (name) => useSelector((state) => state.transfers[name])

  const filterList = transferItems.map(({ name, label }) => {
    return (
      <label key={name} className={styles['transfer__filter-item']}>
        <input
          name={name}
          type="checkbox"
          onChange={() => dispatch(toogleTransfer({ name }))}
          checked={transfers(name)}
          className={styles['transfer__check-box']}
        />
        <span className={styles['transfer__custom-checkbox']}></span>
        <span className={styles.transfer__text}>{label}</span>
      </label>
    )
  })

  return (
    <div className={styles.transfer}>
      <span className={styles.transfer__title}>Количество пересадок</span>
      {filterList}
    </div>
  )
}

export default Transfer
