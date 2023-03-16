import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import transferReducer from './transferSlice'
import ticketSlice from './ticketSlice'
import searchIDSlice from './searchIDSlice'

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
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
