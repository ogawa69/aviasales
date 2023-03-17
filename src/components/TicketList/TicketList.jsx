import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Spin } from 'antd'

import { getSearchID } from '../../store/searchIDSlice'
import { getTickets } from '../../store/ticketSlice'
import ErrorMessage from '../ErrorMessage'
import Ticket from '../Ticket'

import './TicketList.scss'

const TicketList = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.tickets.loading)
  const error = useSelector((state) => state.tickets.error)
  const tickets = useSelector((state) => state.tickets.tickets)
  const filter = useSelector((state) => state.filters.changedFilter)
  const transfers = useSelector((state) => state.transfers)

  useEffect(() => {
    const ID = async () => {
      return dispatch(getSearchID())
    }

    ID().then((res) => dispatch(getTickets(res.payload)))
  }, [])

  const createTickets = (array) => {
    return array.map((data) => {
      return <Ticket key={uuidv4()} {...data} />
    })
  }

  const filterTrans = (trans, tickets) => {
    return tickets.filter((el) => {
      for (let key in trans) {
        if (key && trans['all-trans']) {
          return el
        }
        if (key && trans['without-trans'] && !el.segments[0].stops.length && !el.segments[1].stops.length) {
          return el
        }
        if (key && trans['one-trans'] && el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1) {
          return el
        }
        if (key && trans['two-trans'] && el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2) {
          return el
        }
        if (key && trans['three-trans'] && el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3) {
          return el
        }
      }
    })
  }

  const filterSort = (filter, tickets) => {
    if (filter === 'cheapest') {
      return [...tickets].sort((prevItem, nextItem) => {
        return prevItem.price - nextItem.price
      })
    }
    if (filter === 'fastest') {
      return [...tickets].sort((prevItem, nextItem) => {
        const prevDuration = prevItem.segments[0].duration + prevItem.segments[1].duration
        const nextDuration = nextItem.segments[0].duration + nextItem.segments[1].duration
        return prevDuration - nextDuration
      })
    }
    if (filter === 'optimal') {
      return [...tickets].sort((prevItem, nextItem) => {
        const prevDuration = prevItem.segments[0].duration + prevItem.segments[1].duration + prevItem.price
        const nextDuration = nextItem.segments[0].duration + nextItem.segments[1].duration + nextItem.price
        return prevDuration - nextDuration
      })
    }
  }

  if (
    !transfers['all-trans'] &&
    !transfers['without-trans'] &&
    !transfers['one-trans'] &&
    !transfers['two-trans'] &&
    !transfers['three-trans']
  ) {
    return <span className="empty-list">Рейсов, подходящих под заданные фильтры, не найдено</span>
  }

  const loadingSpinner = loading ? <Spin className="spinner" /> : null
  const errorAlert = error ? <ErrorMessage /> : null
  const sortedTickets = filter ? createTickets(filterSort(filter, filterTrans(transfers, tickets))) : null
  const elements = !filter ? createTickets(filterTrans(transfers, tickets)) : null

  return (
    <>
      {loadingSpinner}
      {errorAlert}
      {elements}
      {sortedTickets}
    </>
  )
}

export default TicketList
