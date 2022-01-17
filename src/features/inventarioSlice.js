import { createSlice } from '@reduxjs/toolkit'


export const inventarioSlice = createSlice({
  name: 'inventario',
  initialState:{data:[]},
  reducers: {
    initState: (state,action) =>{
        state.data = action.payload;
    },
    addEquipo:(state,action)=>{
        state.data.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { initState,addEquipo} = inventarioSlice.actions

export default inventarioSlice.reducer