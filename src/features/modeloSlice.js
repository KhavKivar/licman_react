import { createSlice } from '@reduxjs/toolkit'

import areEqual from './utils';
import { difference } from './utils';

export const modeloSlice = createSlice({
  name: 'modelo',
  initialState: { data: [] },
  reducers: {
    initStateModelo: (state, action) => {
      state.data = action.payload;
    },
    addModelo: (state, action) => {
      state.data.unshift(action.payload);
    },
    updateModeloState: (state, action) => {
      const data = action.payload;
      const data_prev = state.data;
      const setA = new Set([]);
      const setB = new Set([]);
      data_prev.forEach(x => setA.add(x.modelo));
      data.forEach(x => setB.add(x.modelo));
      //update
      for (let i = 0; i < data_prev.length; i++) {
        const indexModelo = data.findIndex(x => x.modelo.toString() == data_prev[i].modelo.toString());
        if (indexModelo != -1) {
          if (!areEqual(data_prev[i], data[indexModelo])) {
            data_prev[i] = data[indexModelo];
          }
        }
      }
      //Add
      const b_minus_a = difference(setB,setA);
      for(let elem of b_minus_a){
        const indexModelo = data.findIndex(x => x.modelo.toString() == elem.toString());
        if(indexModelo != -1){
          state.data.unshift(data[indexModelo]);
        }
      }
      //Remove
      const a_minus_b = difference(setA,setB);
      for(let elem of a_minus_b){
        const indexModelo = data_prev.findIndex(x => x.modelo.toString() == elem.toString());
        state.data.splice(indexModelo, 1);
      }
    },
    editModelo: (state, action) => {
      const indexModelo = state.data.findIndex(x => x.modelo == action.payload.modelo);
      if (indexModelo >= 0) {
        state.data[indexModelo] = action.payload;
      }
    },
    removeModelo: (state, action) => {
      const indexModelo = state.data.findIndex(x => x.modelo == action.payload.modelo);
      state.data.splice(indexModelo, 1);
    }


  },
})

// Action creators are generated for each case reducer function
export const { initStateModelo, addModelo, editModelo, removeModelo,updateModeloState } = modeloSlice.actions

export default modeloSlice.reducer