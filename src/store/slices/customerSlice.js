import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customers: [],
  selecting: {},
  editmode: false,
}

export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState: initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers = [...state.customers, { ...action.payload }]
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.cust_id !== action.payload.cust_id
      )

      state.editmode = false
      state.selecting = {}
    },
    editCustomer: (state, action) => {
      state.customers = state.customers.map((customer) => {
        if (customer.cust_id === action.payload.cust_id) {
          return { ...customer, ...action.payload }
        }
        return customer
      })

      state.editmode = false
      state.selecting = {}
    },
    setEditMode: (state, action) => {
      if (!action.payload) state.selecting = {}
      state.editmode = action.payload
    },
    selectCustomer: (state, action) => {
      state.selecting = action.payload
      state.editmode = true
    },
  },
})

export const {
  addCustomer,
  deleteCustomer,
  editCustomer,
  selectCustomer,
  setEditMode,
} = customerSlice.actions

export default customerSlice.reducer
