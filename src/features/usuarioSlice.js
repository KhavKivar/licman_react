import { createSlice } from '@reduxjs/toolkit'


export const usuarioSlice = createSlice({
  name: 'usuarioSlice',
  initialState:{data:[]},
  reducers: {
    initDataUser: (state,action) =>{
        state.data = action.payload;
    }, 
    addUser: (state,action) =>{
        state.data.unshift(action.payload);
    },
    editUser: (state,action) =>{
        let index = state.data.findIndex(x => x.id == action.payload.id);
        if (index >= 0) {
            state.data[index] = action.payload;
        }
    },
    removeUser: (state,action) =>{
        let index = state.data.findIndex(x => x.id == action.payload.id);
        if(index != -1){
            state.data.splice(index, 1);
        }
    }

    
  },
});

// Action creators are generated for each case reducer function
export const { initDataUser,addUser,editUser,removeUser} = usuarioSlice.actions

export default usuarioSlice.reducer