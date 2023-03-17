import React from 'react'
import { useDispatch } from 'react-redux'

import { setFilter } from '../../store/filterSlice'
import { filterItems } from '../../constants'

import styles from './Filters.module.scss'

const Filters = () => {
  const dispatch = useDispatch()

  const elements = filterItems.map((el) => {
    return (
      <button key={el.name} onClick={() => dispatch(setFilter(el.name))} className={styles.filters__button}>
        {el.label}
      </button>
    )
  })

  return <div className={styles.filters}>{elements}</div>
}

export default Filters
