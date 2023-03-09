import React from 'react'

import logo from '../../assets/Logo.svg'
import Filters from '../Filters/Filters'
import TicketList from '../TicketList/TicketList'
import Transfer from '../Transfer'

import './App.scss'

const App = () => {
  return (
    <div className="container">
      <div className="header">
        <img className="header__logo" src={logo}></img>
      </div>
      <div className="main">
        <Transfer></Transfer>
        <div className="ticket-list">
          <Filters></Filters>
          <TicketList />
        </div>
      </div>
    </div>
  )
}

export default App
