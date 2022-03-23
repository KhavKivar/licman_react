import { createSlice } from '@reduxjs/toolkit'


export const tableSlice = createSlice({
  name: 'table_state',
  initialState:{search:"",filtroOn:5,page:0},
  reducers: {
    changeSearch: (state,action) =>{
        state.search = action.payload;
    },
    changeFiltro: (state,action) =>{
        state.filtroOn = action.payload;
    },
    changePage: (state,action) =>{
        state.page = action.payload;
    },
   
    
  },
})

// Action creators are generated for each case reducer function
export const { changeSearch,changeFiltro,changePage} = tableSlice.actions

export default tableSlice.reducer