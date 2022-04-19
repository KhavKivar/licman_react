import { createSlice } from '@reduxjs/toolkit'

import areEqual from './utils';
import { difference } from './utils';


export const clienteSlice = createSlice({
  name: 'cliente',
  initialState: { data: [] },
  reducers: {
    initStateCliente: (state, action) => {
      state.data = action.payload;
    },
    addCliente: (state, action) => {
      state.data.unshift(action.payload);
    },
    changeRut: (state, action) => {
      const indexCliente = state.data.findIndex(x => x.rut == action.payload.oldRut);
      if (indexCliente >= 0) {
        state.data[indexCliente] = action.payload.cliente;
      }
    },
    updateClienteState: (state, action) => {
      const data = action.payload;
      const data_prev = state.data;
      const setA = new Set([]);
      const setB = new Set([]);
      data_prev.forEach(x => setA.add(x.rut));
      data.forEach(x => setB.add(x.rut));
      //update
      for (let i = 0; i < data_prev.length; i++) {
        const indexCliente = data.findIndex(x => x.rut.toString() == data_prev[i].rut.toString());
        if (indexCliente != -1) {
          if (!areEqual(data_prev[i], data[indexCliente])) {
            data_prev[i] = data[indexCliente];
          }
        }
      }
      //Add
      const b_minus_a = difference(setB,setA);
      for(let elem of b_minus_a){
        const indexCliente = data.findIndex(x => x.rut.toString() == elem.toString());
        if(indexCliente != -1){
          state.data.unshift(data[indexCliente]);
        }
      }
      //Remove
      const a_minus_b = difference(setA,setB);
      for(let elem of a_minus_b){
        const indexCliente = data_prev.findIndex(x => x.rut.toString() == elem.toString());
        state.data.splice(indexCliente, 1);
      }
    },


    editCliente: (state, action) => {
      const indexCliente = state.data.findIndex(x => x.rut == action.payload.oldRut);
      console.log(action.payload);
      if (indexCliente >= 0) {
        state.data[indexCliente] = action.payload.data;
        //editar las actas con ese rut broo
      }
    },
   
    removeCliente: (state, action) => {
      const indexCliente = state.data.findIndex(x => x.rut == action.payload.rut);
      state.data.splice(indexCliente, 1);
    }


  },
})

// Action creators are generated for each case reducer function
export const { initStateCliente, addCliente, editCliente, removeCliente,editNewCliente,updateClienteState,changeRut } = clienteSlice.actions

export default clienteSlice.reducer