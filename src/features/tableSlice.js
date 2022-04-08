import { createSlice } from '@reduxjs/toolkit'


export const tableSlice = createSlice({
  name: 'table_state',
  initialState: { search: "", filtroOn: 5, page: 0, search_mov: "", filtroOn_mov: 5, page_mov: 0 },
  reducers: {
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
export const { changeSearch, changeFiltro, changePage,changeSearch_mov,changeFiltro_mov,changePage_mov } = tableSlice.actions

export default tableSlice.reducer