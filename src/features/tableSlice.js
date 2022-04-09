import { createSlice } from '@reduxjs/toolkit'


export const tableSlice = createSlice({
  name: 'table_state',
  initialState: {
    search: "", filtroOn: 5, page: 0, search_mov: "", filtroOn_mov: 5, page_mov: 0
    , columnsFilterMov: {
      fechaMov: "",
      idMovimiento: "",
      transporte: "",
      rut: "",
      empresa: "",
      tipo: "",
      cambio: "",
      idEquipo: "",
      idInspeccion: "",
      idGuiaDespacho: "",
      fechaRetiro: "",
      observaciones: "",
    },
    columnsFilterInventario:{
      idEquipo:"",
      tipo:"",
      marca:"",
      modelo:"",
      serie:"",
      capacidad:"",
      altura:"",
      mastil:"",
      ano:"",
      horometro:"",
      estado:"",
      ubicacion:"",
      precio_neto:"",
      ts : "",

    }
  },


  reducers: {

    columnsFilterInventario: (state, action) => {
      const listFiltro = action.payload;
       if (listFiltro.length == 0) {
          state.columnsFilterInventario.idEquipo = "";
          state.columnsFilterInventario.tipo = "";
          state.columnsFilterInventario.marca = "";
          state.columnsFilterInventario.modelo = "";
          state.columnsFilterInventario.serie = "";
          state.columnsFilterInventario.capacidad = "";
          state.columnsFilterInventario.altura = "";
          state.columnsFilterInventario.mastil = "";
          state.columnsFilterInventario.ano = "";
          state.columnsFilterInventario.horometro = "";
          state.columnsFilterInventario.estado = "";
          state.columnsFilterInventario.ubicacion = "";
          state.columnsFilterInventario.precio_neto = "";
          state.columnsFilterInventario.ts = "";


       } else {
         for (const i of listFiltro) {
           state.columnsFilterInventario[i.columns] =i.value;
         }
       }
     },
 


    columnsFilterMov: (state, action) => {
     const listFiltro = action.payload;
     console.log(listFiltro);
      if (listFiltro.length == 0) {
        state.columnsFilterMov.fechaMov = "";
        state.columnsFilterMov.idMovimiento = "";
        state.columnsFilterMov.transporte = "";
        state.columnsFilterMov.rut = "";
        state.columnsFilterMov.empresa = "";
        state.columnsFilterMov.tipo = "";
        state.columnsFilterMov.cambio = "";
        state.columnsFilterMov.idEquipo = "";
        state.columnsFilterMov.idInspeccion = "";
        state.columnsFilterMov.idGuiaDespacho = "";
        state.columnsFilterMov.fechaRetiro = "";
        state.columnsFilterMov.observaciones = "";
      } else {
    
        for (const i of listFiltro) {
         
          state.columnsFilterMov[i.columns] =i.value;
        }
      }
    },

    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeFiltro: (state, action) => {
      state.filtroOn = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },


    changeSearch_mov: (state, action) => {
      state.search_mov = action.payload;
    },
    changeFiltro_mov: (state, action) => {
      state.filtroOn_mov = action.payload;
    },
    changePage_mov: (state, action) => {
      state.page_mov = action.payload;
    },



  },
})

// Action creators are generated for each case reducer function
export const { changeSearch, changeFiltro, changePage, changeSearch_mov, changeFiltro_mov, changePage_mov,
  columnsFilterMov,columnsFilterInventario
} = tableSlice.actions

export default tableSlice.reducer