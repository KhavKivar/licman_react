
import Sidebar from './components/sidebar'

import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { initState, updateAllState } from './features/inventarioSlice'
import { initStateActa,updateActaState } from './features/actaSlice'
import { initStateCliente,updateClienteState } from './features/clienteSlice'
import { initStateModelo,updateModeloState } from './features/modeloSlice'

import { green, orange, blue, yellow, purple } from '@mui/material/colors';
import { initStateMovimiento, updateMovState } from './features/movimientoSlice';

import Login from './views/login';

function App() {
  const dispatch = useDispatch();
  const getState = x => {

    axios.get(API.baseURL + "/api/equipo/").then((response) => {
      dispatch(initState(response.data));
      console.log(response.data);
    });
    axios.get(API.baseURL + "/api/inspeccion/").then((response) => {
      dispatch(initStateActa(response.data));
      console.log(response.data);
    });

    axios.get(API.baseURL + "/api/cliente/").then((response) => {
      dispatch(initStateCliente(response.data));
      console.log(response.data);
    });
    axios.get(API.baseURL + "/api/modelo/").then((response) => {
      dispatch(initStateModelo(response.data));
      console.log(response.data);
    });
    axios.get(API.baseURL + "/api/movimiento/").then((response) => {
      dispatch(initStateMovimiento(response.data));
      console.log(response.data);
    });
  }
  const updateState =  x => {
     axios.get(API.baseURL + "/api/equipo/").then((response) => {
      dispatch(updateAllState(response.data));
  
    });
    axios.get(API.baseURL + "/api/modelo/").then((response) => {
      dispatch(updateModeloState(response.data));
    
    });
     axios.get(API.baseURL + "/api/cliente/").then((response) => {
      dispatch(updateClienteState(response.data));
    
    });
     axios.get(API.baseURL + "/api/inspeccion/").then((response) => {
      dispatch(updateActaState(response.data));
    
    });
     axios.get(API.baseURL + "/api/movimiento/").then((response) => {
      dispatch(updateMovState(response.data));
     
    });

  }
  const login = true;

  useEffect(() => {
    getState();
    const intervalCall = setInterval(() => {
       updateState();
    }, 15000);
  }, []);


  return (
 
    <div className="App">
       { login ? <Sidebar></Sidebar> : <Login></Login>}
    </div>

  );
}

export default App;

