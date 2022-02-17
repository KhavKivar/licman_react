import { createSlice } from '@reduxjs/toolkit'


export const generalStateSlice = createSlice({
  name: 'generalState',
  initialState:{inventarioValue:{ value: 'Inventario', label: 'Inventario' },detalleEquipoValue:{ value: 'Actas', label: 'Actas' }},
  reducers: {
    setInventarioValue: (state,action) =>{
        state.inventarioValue = action.payload;
    },
    setDetalleValue:(state,action)=>{
        state.detalleEquipoValue = action.payload;
    }
   
    
  },
})

// Action creators are generated for each case reducer function
export const { setInventarioValue,setDetalleValue} = generalStateSlice.actions

export default generalStateSlice.reducer