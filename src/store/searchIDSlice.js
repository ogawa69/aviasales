import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  searchID: null,
}

export const getSearchID = createAsyncThunk('searchID/getSearchID', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')

    if (!response.ok) {
      throw new Error('Search ID error', response.status)
    }

    const res = await response.json()

    dispatch(setSearchID(res.searchId))

    return res.searchId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const searchIDSlice = createSlice({
  name: 'searchID',
  initialState,
  reducers: {
    setSearchID: (state, action) => {
      state.searchID = action.payload
    },
  },
  extraReducers: {
    [getSearchID.fulfilled]: () => console.log('fulfilled'),
    [getSearchID.pending]: () => console.log('pending'),
    [getSearchID.rejected]: () => console.log('rejected'),
  },
})

export const { setSearchID } = searchIDSlice.actions

export default searchIDSlice.reducer
