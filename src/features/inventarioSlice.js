import { createSlice } from '@reduxjs/toolkit'
import areEqual from './utils';
import { difference } from './utils';

export const inventarioSlice = createSlice({
  name: 'inventario',
  initialState: { data: [] },
  reducers: {
    initState: (state, action) => {
      state.data = action.payload;
    },
    updateAllState: (state, action) => {
      const data = action.payload;
      const dataPrev = state.data;
      const setA = new Set([]);
      const setB = new Set([]);
      dataPrev.forEach(x => setA.add(x.idEquipo));
      data.forEach(x => setB.add(x.idEquipo));
      for (let i = 0; i < dataPrev.length; i++) {
        const indexEquipo = data.findIndex(x => x.idEquipo.toString() == dataPrev[i].idEquipo.toString());
        if (indexEquipo != -1) {
          if (!areEqual(dataPrev[i], data[indexEquipo])) {
            state.data[i] = data[indexEquipo];
          }
        }
      }
      //Add
      const b_minus_a = difference(setB,setA);
      for(let elem of b_minus_a){
        const indexEquipo = data.findIndex(x => x.idEquipo.toString() == elem.toString());
        if(indexEquipo != -1){
          state.data.unshift(data[indexEquipo]);
        }
      }
      //Remove
      const a_minus_b = difference(setA,setB);
      for(let elem of a_minus_b){
        const indexEquipo = dataPrev.findIndex(x => x.idEquipo.toString() == elem.toString());
        state.data.splice(indexEquipo, 1);
      }
    },
    addEquipo: (state, action) => {
      state.data.unshift(action.payload);
    },
    editEquipo: (state, action) => {
      console.log(action.payload);
      const indexEquipo = state.data.findIndex(x => x.idEquipo == parseInt(action.payload.idEquipo));
      if (indexEquipo >= 0) {
        state.data[indexEquipo] = action.payload;
      }
    },
    deleteEquipo: (state, action) => {
      const indexEquipo = state.data.findIndex(x => x.idEquipo == parseInt(action.payload));
      if (indexEquipo >= 0) {
        state.data.splice(indexEquipo, 1);
      }
    },
    updateEstado: (state, action) => {
      const indexEquipo = state.data.findIndex(x => x.idEquipo == parseInt(action.payload.idEquipo));
      if (indexEquipo >= 0) {
        state.data[indexEquipo].estado = action.payload.estado;
        state.data[indexEquipo].ubicacion = action.payload.ubicacion;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { initState, addEquipo, editEquipo, deleteEquipo, updateEstado, updateAllState } = inventarioSlice.actions

export default inventarioSlice.reducer