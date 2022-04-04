
import { initState } from '../features/inventarioSlice'
import { initStateActa } from '../features/actaSlice'
import { initStateCliente } from '../features/clienteSlice'
import { initStateModelo } from '../features/modeloSlice'
import { initStateMovimiento } from '../features/movimientoSlice';

import { initDataUser } from '../features/usuarioSlice';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import API from './api';

const ApiObjectCall = (e) =>{
    const dispatch = e;
    
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

    axios.get(API.baseURL + "/api/usuario/").then((response) => {
      dispatch(initDataUser(response.data));
      console.log(response.data);
    });
  }
export default ApiObjectCall;