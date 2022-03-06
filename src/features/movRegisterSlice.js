import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux';

export const movRegisterSlice = createSlice({
  name: 'movRegister',
  initialState: { rut: "", codigo: "", acta: "", actaList: [], guiaDespacho: "", obv: "", transporte: "", tipo: "", cambio: "",
   fechaTermino: null,selectedFile:null,rutInputValue:"" },
  reducers: {
    editValue:(state,action)=>{
      const listOfActa= action.payload.listOfActa;
      const idEquipo = listOfActa.find(x =>x.idInspeccion==action.payload.idInspeccion).idEquipo;
      const actaList =[];
      for(const x of listOfActa){
        if(x.idEquipo == idEquipo){
          actaList.push({label:x.idInspeccion.toString()});
        }
      }
      state.rut= action.payload.rut;
      state.codigo=action.payload.idEquipo.toString();
      state.acta = {label:action.payload.idInspeccion.toString()};
      state.actaList =actaList;
      state.guiaDespacho = action.payload.idGuiaDespacho.toString();
      state.obv =  action.payload.observaciones;
      state.transporte =action.payload.transporte =='marco' ? '10':'20';
      state.tipo = action.payload.tipo =='ENVIO' ? '10':'20';
      state.cambio =  action.payload.cambio == null ? "": action.payload.cambio.toString();
      state.fechaTermino= action.payload.fechaRetiro == null ? null:action.payload.fechaRetiro;
      state.selectedFile=null;

    },

    cleanInput:(state,action)=>{
      state.rut= "";
      state.codigo="";
      state.acta = "";
      state.rutInputValue="";
      state.actaList =[];
      state.guiaDespacho = "";
      state.obv = "";
      state.transporte = "";
      state.tipo = "";
      state.cambio = "";
      state.fechaTermino=null;
      state.selectedFile=null;

    },
    setRutInputValue:(state,action)=>{
      state.rutInputValue=action.payload;
    },
    setSelectFile:(state,action)=>{
      state.selectedFile = action.payload;
    },
    setRut: (state, action) => {
      state.rut = action.payload;
    },
    setCodigo: (state, action) => {
      state.codigo = action.payload;
    },
    setActaList: (state, action) => {
      state.actaList = action.payload;
    },

    setActa: (state, action) => {
      state.acta = action.payload;
    },
    setGuiaDespacho: (state, action) => {
      state.guiaDespacho = action.payload;
    },
    setObv: (state, action) => {
      state.obv = action.payload;
    },
    setTransporte: (state, action) => {
      state.transporte = action.payload;
    },

    setTipo: (state, action) => {
      state.tipo = action.payload;
    },

    setCambio: (state, action) => {
      state.cambio = action.payload;
    },

    setFechaTermino: (state, action) => {
      state.fechaTermino = action.payload;
    },


  },
})

// Action creators are generated for each case reducer function
export const { setRut, setCodigo, setActa, setActaList, setGuiaDespacho, setObv
,setTransporte,setTipo,setCambio,setFechaTermino,setSelectFile,cleanInput,editValue,
setRutInputValue
} = movRegisterSlice.actions

export default movRegisterSlice.reducer