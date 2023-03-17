import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  changedFilter: null,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.changedFilter = action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
