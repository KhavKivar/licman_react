
import Sidebar from './components/sidebar'

import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { initState } from './features/inventarioSlice'
import { initStateActa } from './features/actaSlice'

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
