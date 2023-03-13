import { configureStore } from '@reduxjs/toolkit'

import transferReducer from './transferSlice'

const store = configureStore({
  reducer: {
    transfers: transferReducer,
  },
})

export default store
