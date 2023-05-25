import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/customerSlice'

export const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
})
