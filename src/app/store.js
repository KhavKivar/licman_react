import { configureStore } from '@reduxjs/toolkit'
import inventarioSlice from '../features/inventarioSlice'
export const store = configureStore({
  reducer: {
    inventario: inventarioSlice
  },
})