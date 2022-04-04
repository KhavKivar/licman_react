import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'loginState',
  initialState:{login:null,usuario:"",},
  reducers: {
    setLogin: (state,action) =>{
        state.login = action.payload;
    }, 
    setUsuario: (state,action) =>{
        state.usuario = action.payload;
    }, 
  },
});

// Action creators are generated for each case reducer function
export const { setLogin,setUsuario} = loginSlice.actions

export default loginSlice.reducer