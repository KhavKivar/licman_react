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
    },
    editEquipo:(state,action)=>{
      console.log(action.payload);
      const indexEquipo = state.data.findIndex(x=>x.id == parseInt(action.payload.id));
      if(indexEquipo >= 0){
  
        state.data[indexEquipo].id =  action.payload.id;
        state.data[indexEquipo] = action.payload;

     
      }
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { initState,addEquipo,editEquipo} = inventarioSlice.actions

export default inventarioSlice.reducer