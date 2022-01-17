import { AnimatePresence } from "framer-motion";
import logo from './logo.svg'
import Sidebar from './components/sidebar'
import { Routes ,Route } from 'react-router-dom';
import Home from './views/home'
import Inventario from './views/inventario'
import Movimiento from './views/movimientos'
import Alerta from './views/alertas'
import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { initState } from './features/inventarioSlice'


const Pages = styled.div`
  width: 100%;  
`;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(API.baseURL + "/api/equipo/").then((response) => {
      dispatch(initState(response.data));
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
          <Sidebar></Sidebar>
    </div>
  );
}

export default App;
