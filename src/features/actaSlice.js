import { createSlice } from '@reduxjs/toolkit'

import areEqual from './utils';
import { difference } from './utils';
export const actaSlice = createSlice({
  name: 'acta',
  initialState: { data: [] },
  reducers: {
    initStateActa: (state, action) => {
      state.data = action.payload;
    },
    deleteInspeccion: (state, action) => {
      const { id } = action.payload;
      const index = state.data.findIndex((inspeccion) => inspeccion.idInspeccion === id);
      if(index != -1){
        state.data.splice(index, 1);
      }
     
    },
    updateActaState: (state, action) => {
      const data = action.payload;
      const data_prev = state.data;
      const setA = new Set([]);
      const setB = new Set([]);
      data_prev.forEach(x => setA.add(x.idInspeccion));
      data.forEach(x => setB.add(x.idInspeccion));
      //update
      for (let i = 0; i < data_prev.length; i++) {
        const indexMov = data.findIndex(x => x.idInspeccion.toString() == data_prev[i].idInspeccion.toString());
        if (indexMov != -1) {
          if (!areEqual(data_prev[i], data[indexMov])) {
            data_prev[i] = data[indexMov];
          }
        }
      }
      //Add
      const b_minus_a = difference(setB,setA);
      for(let elem of b_minus_a){
        const indexMov = data.findIndex(x => x.idInspeccion.toString() == elem.toString());
        if(indexMov != -1){
          state.data.unshift(data[indexMov]);
        }
      }
      //Remove
      const a_minus_b = difference(setA,setB);
      for(let elem of a_minus_b){
        const indexMov = data_prev.findIndex(x => x.idInspeccion.toString() == elem.toString());
        state.data.splice(indexMov, 1);
      }
    }


  },
})

// Action creators are generated for each case reducer function
export const { initStateActa,updateActaState,deleteInspeccion } = actaSlice.actions

export default actaSlice.reducer