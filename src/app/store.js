import { configureStore } from '@reduxjs/toolkit'
import inventarioSlice from '../features/inventarioSlice'
import actaSlice from '../features/actaSlice'
import clienteSlice from '../features/clienteSlice'
import modeloSlice from '../features/modeloSlice'
import movimientoSlice from '../features/movimientoSlice'
import generalStateSlice from '../features/generalStateSlice'
import movRegisterSlice from '../features/movRegisterSlice'

import tableSlice from '../features/tableSlice'

export const store = configureStore({
  reducer: {
    inventario: inventarioSlice,
    acta:actaSlice,
    cliente:clienteSlice,
    modelo:modeloSlice,
    movimiento:movimientoSlice,
    generalState:generalStateSlice,
    movRegister:movRegisterSlice,
    tableState:tableSlice
  },
})