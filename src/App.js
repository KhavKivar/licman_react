
import Sidebar from './components/sidebar'

import styled from 'styled-components';

import axios from "axios";
import API from './services/api'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { initState } from './features/inventarioSlice'



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
