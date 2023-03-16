import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { getSearchID } from '../../store/searchIDSlice'
import { getTickets } from '../../store/ticketSlice'
import Ticket from '../Ticket'

const TicketList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const ID = async () => {
      return dispatch(getSearchID())
    }

    ID().then((res) => dispatch(getTickets(res.payload)))
  }, [])

  const tickets = useSelector((state) => state.tickets.tickets)

  const elements = tickets.map((data) => {
    return <Ticket key={uuidv4()} {...data} />
  })

  return <>{elements}</>
}

export default TicketList
