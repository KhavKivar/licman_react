
import Sidebar from './components/sidebar'

import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { initState } from './features/inventarioSlice'
import { initStateActa } from './features/actaSlice'
import { initStateCliente } from './features/clienteSlice'
import { initStateModelo } from './features/modeloSlice'

import { green, orange,blue,yellow,purple } from '@mui/material/colors';
import { initStateMovimiento } from './features/movimientoSlice';


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

  
 
  useEffect(() => {
    getState();

  }, []);

  return (
  
      <div className="App">
            <Sidebar></Sidebar>
      </div>

  );
}

export default App;
