import { createSlice } from '@reduxjs/toolkit'


export const movimientoSlice = createSlice({
  name: 'movimiento',
  initialState:{data:[]},
  reducers: {
    initStateMovimiento: (state,action) =>{
        state.data = action.payload;
    },
   addMovimiento:(state,action)=>{
    state.data.unshift(action.payload);
   },
   editMovimiento:(state,action)=>{
     console.log(action.payload);
    const indexMov = state.data.findIndex(x=>x.idMovimiento == parseInt(action.payload.idMovimiento));
    if(indexMov >= 0){        
      state.data[indexMov] = action.payload;
    }
   },
   deleteMov:(state,action)=>{
    const indexMov = state.data.findIndex(x=>x.idMovimiento == parseInt(action.payload.idMovimiento));
    if(indexMov >= 0){        
      state.data.splice(indexMov,1);
    }
   }

    
  },
})

// Action creators are generated for each case reducer function
export const { initStateMovimiento,addMovimiento,editMovimiento,deleteMov} = movimientoSlice.actions

export default movimientoSlice.reducer