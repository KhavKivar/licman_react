import { createSlice } from '@reduxjs/toolkit'


export const clienteSlice = createSlice({
  name: 'cliente',
  initialState:{data:[]},
  reducers: {
    initStateCliente: (state,action) =>{
        state.data = action.payload;
    },
    addCliente:(state,action)=>{
        state.data.unshift(action.payload);
    },
    editCliente:(state,action)=>{
        const indexCliente = state.data.findIndex(x=>x.rut == action.payload.oldRut);
        console.log(action.payload);
        if(indexCliente >= 0){
          state.data[indexCliente] = action.payload.data;
          //editar las actas con ese rut broo
        }
    },
    removeCliente:(state,action)=>{
        const indexCliente = state.data.findIndex(x=>x.rut == action.payload.rut);
        state.data.splice(indexCliente,1);
    }
   
    
  },
})

// Action creators are generated for each case reducer function
export const { initStateCliente,addCliente,editCliente,removeCliente} = clienteSlice.actions

export default clienteSlice.reducer