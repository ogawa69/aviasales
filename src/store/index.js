import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import transferReducer from './transferSlice'
import ticketSlice from './ticketSlice'
import searchIDSlice from './searchIDSlice'
import filterSlice from './filterSlice'

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
})

const store = configureStore({
  reducer: {
    transfers: transferReducer,
    searchID: searchIDSlice,
    tickets: ticketSlice,
    filters: filterSlice,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
