import { configureStore } from '@reduxjs/toolkit'
import inventarioSlice from '../features/inventarioSlice'
import actaSlice from '../features/actaSlice'
export const store = configureStore({
  reducer: {
    inventario: inventarioSlice,
    acta:actaSlice
  },
})