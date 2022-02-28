import { createSlice } from '@reduxjs/toolkit'


export const generalStateSlice = createSlice({
  name: 'generalState',
  initialState:{inventarioValue:{ value: 'Inventario', label: 'Inventario' },
  detalleEquipoValue:{ value: 'Actas', label: 'Actas' },
  settingValue:{ value: 'Clientes', label: 'Clientes' },  

},
  reducers: {
    setInventarioValue: (state,action) =>{
        state.inventarioValue = action.payload;
    },
    setDetalleValue:(state,action)=>{
        state.detalleEquipoValue = action.payload;
    },
   setSettingValue:(state,action)=>{
     state.settingValue = action.payload;
   }
    
  },
})

// Action creators are generated for each case reducer function
export const { setInventarioValue,setDetalleValue,setSettingValue} = generalStateSlice.actions

export default generalStateSlice.reducer