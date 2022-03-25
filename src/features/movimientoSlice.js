import { createSlice } from '@reduxjs/toolkit'

import areEqual from './utils';
import { difference } from './utils';


export const movimientoSlice = createSlice({
  name: 'movimiento',
  initialState:{data:[]},
  reducers: {
    initStateMovimiento: (state,action) =>{
        state.data = action.payload;
    },

    updateMovState: (state, action) => {
      const data = action.payload;
      const data_prev = state.data;
      const setA = new Set([]);
      const setB = new Set([]);
      data_prev.forEach(x => setA.add(x.idMovimiento));
      data.forEach(x => setB.add(x.idMovimiento));
      //update
      for (let i = 0; i < data_prev.length; i++) {
        const indexMov = data.findIndex(x => x.idMovimiento.toString() == data_prev[i].idMovimiento.toString());
        if (indexMov != -1) {
          if (!areEqual(data_prev[i], data[indexMov])) {
            data_prev[i] = data[indexMov];
          }
        }
      }
      //Add
      const b_minus_a = difference(setB,setA);
      for(let elem of b_minus_a){
        const indexMov = data.findIndex(x => x.idMovimiento.toString() == elem.toString());
        if(indexMov != -1){
          state.data.unshift(data[indexMov]);
        }
      }
      //Remove
      const a_minus_b = difference(setA,setB);
      for(let elem of a_minus_b){
        const indexMov = data_prev.findIndex(x => x.idMovimiento.toString() == elem.toString());
        state.data.splice(indexMov, 1);
      }
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
   updateClientidMovimiento:(state,action)=>{
    for (let i = 0; i < state.data.length; i++) {
      if(state.data[i].idMovimiento ==action.payload.oldidMovimiento ){
          state.data[i].idMovimiento = action.payload.newidMovimiento;
      }
    } 
   },
   updateClientRut:(state,action)=>{
    for (let i = 0; i < state.data.length; i++) {
      if(state.data[i].rut ==action.payload.oldRut ){
          state.data[i].rut = action.payload.newRut;
      }
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
export const { initStateMovimiento,addMovimiento,editMovimiento,deleteMov,updateClientRut,updateMovState,updateClientidMovimiento} = movimientoSlice.actions

export default movimientoSlice.reducer