import { createSlice } from '@reduxjs/toolkit'


export const modeloSlice = createSlice({
  name: 'modelo',
  initialState:{data:[]},
  reducers: {
    initStateModelo: (state,action) =>{
        state.data = action.payload;
    },
    addModelo:(state,action)=>{
        state.data.unshift(action.payload);
    },
    editModelo:(state,action)=>{
        const indexModelo = state.data.findIndex(x=>x.modelo == action.payload.modelo);
        if(indexModelo >= 0){
          state.data[indexModelo] = action.payload;
        }
    },
    removeModelo:(state,action)=>{
        const indexModelo = state.data.findIndex(x=>x.modelo == action.payload.modelo);
        state.data.splice(indexModelo,1);
    }
   
    
  },
})

// Action creators are generated for each case reducer function
export const { initStateModelo,addModelo,editModelo,removeModelo} = modeloSlice.actions

export default modeloSlice.reducer