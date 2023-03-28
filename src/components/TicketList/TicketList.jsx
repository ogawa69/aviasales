import React, { useEffect, useState } from 'react'
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
  const [ticketOnPage, setTicketOnPage] = useState(5)
  const { loading, error, tickets } = useSelector((state) => state.tickets)
  const filter = useSelector((state) => state.filters.changedFilter)
  const transfers = useSelector((state) => state.transfers)

  useEffect(() => {
    const ID = async () => {
      return dispatch(getSearchID())
    }

    ID().then((res) => dispatch(getTickets(res.payload)))
  }, [])

  const createTickets = (array) => {
    let count = 0
    let tickets = []
    array.forEach((data) => {
      if (count < ticketOnPage) {
        count = count + 1
        tickets.push(<Ticket key={uuidv4()} {...data} />)
      }
    })
    return tickets
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
  const sortedTickets = filter ? createTickets(filterSort(filter, filterTrans(transfers, tickets))) : ''
  const elements = !filter ? createTickets(filterTrans(transfers, tickets)) : ''
  const moreBtn =
    (sortedTickets.length || elements.length) && !loading && !error ? (
      <button className="more-button" onClick={() => setTicketOnPage((ticketOnPage) => ticketOnPage + 5)}>
        Показать еще 5 билетов!
      </button>
    ) : null

  return (
    <>
      {loadingSpinner}
      {errorAlert}
      {elements}
      {sortedTickets}
      {moreBtn}
    </>
  )
}

export default TicketList
