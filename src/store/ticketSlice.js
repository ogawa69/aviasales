import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
  loading: false,
  error: false,
}

export const getTickets = createAsyncThunk('tickets/getTickets', async (searchId, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)

    if (!response.ok) {
      throw new Error('Get ticket list error', response.status)
    }

    const tickets = await response.json()
    dispatch(setTickets(tickets.tickets))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload
    },
  },
  extraReducers: {
    [getTickets.fulfilled]: (state) => {
      state.loading = false
    },
    [getTickets.pending]: (state) => {
      state.loading = true
    },
    [getTickets.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { setTickets } = ticketSlice.actions

export default ticketSlice.reducer
