
import Sidebar from './components/sidebar'

import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { initState, updateAllState } from './features/inventarioSlice'
import { initStateActa, updateActaState } from './features/actaSlice'
import { initStateCliente, updateClienteState } from './features/clienteSlice'
import { initStateModelo, updateModeloState } from './features/modeloSlice'
import { initDataUser } from './features/usuarioSlice';

import { green, orange, blue, yellow, purple } from '@mui/material/colors';
import { initStateMovimiento, updateMovState } from './features/movimientoSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Login from './views/login';
import { setLogin } from './features/loginSlice';
import Box from '@mui/material/Box';

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
    axios.get(API.baseURL + "/api/usuario/").then((response) => {
      dispatch(initDataUser(response.data));
      console.log(response.data);
    });


    axios.get(API.baseURL + "/api/movimiento/").then((response) => {
      dispatch(initStateMovimiento(response.data));
      console.log(response.data);
    });
  }
  const updateState = x => {
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
  const login = useSelector((state) => state.loginState.login);;

  const loginByToken = () => {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('usuario');
    if (token != null) {
      axios.post(API.baseURL + '/api/usuario/login/', JSON.stringify({ nombre: nombre, token: token }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        if (response.status == 200) {
          const response_data = response.data;
          if (response_data.message == 'Login Success') {
            console.log("login");
            document.cookie = "role=" + response_data.role + "; Secure; SameSite=None;";
            dispatch(setLogin(true));
            return;
          }
          else {

            dispatch(setLogin(false));
          }
        }
      }).catch((e) => {

        dispatch(setLogin(false));
      });
    } else {

      dispatch(setLogin(false));
    }

  };

  useEffect(() => {
    getState();
    loginByToken();
    const intervalCall = setInterval(() => {
      updateState();
    }, 15000);


  }, []);


  return (

    <div className="App">
      {login == null ?
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}>
            <CircularProgress />


          </div> :
        login ?
          <Sidebar></Sidebar> :<Login></Login>

       }
    </div>

  );
}

export default App;

