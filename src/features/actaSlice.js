import { createSlice } from '@reduxjs/toolkit'


export const actaSlice = createSlice({
  name: 'acta',
  initialState:{data:[]},
  reducers: {
    initStateActa: (state,action) =>{
        state.data = action.payload;
    },
   
    
  },
})

// Action creators are generated for each case reducer function
export const { initStateActa} = actaSlice.actions

export default actaSlice.reducer