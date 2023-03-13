import { createSlice } from '@reduxjs/toolkit'

const transferSlice = createSlice({
  name: 'transfers',
  initialState: {
    'all-trans': true,
    'without-trans': true,
    'one-trans': true,
    'two-trans': true,
    'three-trans': true,
  },
  reducers: {
    toogleTransfer(state, action) {
      const transferName = action.payload.name
      const transferStateValue = state[transferName]
      let counter = 0

      for (let key in state) {
        if (state[key]) counter++
      }

      if (transferName === 'all-trans') {
        for (let key in state) {
          state[key] = !transferStateValue
        }
        state[transferName] = !transferStateValue
        return
      }
      if (transferStateValue && transferName !== 'all-trans' && counter > 4) {
        for (let key in state) {
          state[key] = false
        }
      }
      if (!state[transferName] && counter === 3) {
        for (let key in state) {
          state[key] = true
        }
      } else {
        state[transferName] = !state[transferName]
      }
    },
  },
})

export const { toogleTransfer } = transferSlice.actions

export default transferSlice.reducer
