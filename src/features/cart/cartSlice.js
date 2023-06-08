import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  item: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart += 1
    },
    cart: (state) => {
      state.cart -= 1
    },
    incrementByAmount: (state, action) => {
      state.cart += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, cart, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer