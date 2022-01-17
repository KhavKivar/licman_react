
import styled from 'styled-components';
import React, { useState } from 'react';



import Home from '@mui/icons-material/Home';
import Assignment from '@mui/icons-material/Assignment'
import CampaignIcon from '@mui/icons-material/Campaign';
import SwapVertIcon from '@mui/icons-material/SwapVert';



import logo from '../logo.svg'

import { Routes, Route } from 'react-router-dom';
import Homef from '../views/home'
import Inventario from '../views/inventario'
import Movimiento from '../views/movimientos'
import Alerta from '../views/alertas'


import { NavLink, Link } from "react-router-dom";
import SideBarTop from './sidebartop';
import "./content.css";

import Registro from '../views/registrarView';

const Container = styled.div`

  .active {
    border-right: 4px solid var(--white);
   
  }
`;




const SideBarContainer = styled.div`
background-color: var(--black);
width: 3.5rem;
height: 88vh;
margin-top: 1rem;
border-radius:  0 30px 30px 0;
padding: 1rem 0;
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

`;

const SlickBar = styled.ul`
color:var(--white);
list-style: none;
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--black);
padding: 2rem 0;
position: absolute;
top:5rem;
left:0;
width: ${(props => props.clicked ? "17rem" : "3.5rem")};
transition: all 0.35 ease;
border-radius: 0 30px 30px 0;

`;


const Item = styled(NavLink)`
 text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  
  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);
  }
  

`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Logo = styled.div`
   display: ${(props) => (props.clicked ? "" : "none")};;
    

`;

export default function SideBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => { setClick(!click) };
  return (
    <>

      <Container>
        <div style={{ display: "flex" }}>
          <SideBarTop click={click} onclick={handleClick} ></SideBarTop>
          <div style={{ paddingLeft: "50px" }}>
            <img src={logo}></img>

          </div>
        </div>


        <div style={{ display: "flex", marginTop: "5px" }}>

          <SideBarContainer>

            <SlickBar clicked={click}>



              <Item onClick={() => setClick(false)}
                exact="true"
                activeclassname="active"
                to="/">
                <Home>  </Home>
                <Text clicked={click} >Home</Text>



              </Item>
              <Item onClick={() => setClick(false)}
                exact="true"
                activeclassname="active"
                to="/inventario">
                <Assignment />
                <Text clicked={click} >Inventario</Text>
              </Item>
              <Item onClick={() => setClick(false)} exact="true" activeclassname="active" to="/movimientos">
                <SwapVertIcon />
                <Text clicked={click} >Movimientos</Text>
              </Item >

              <Item onClick={() => setClick(false)} exact="true" activeclassname="active" to="/alerta">
                <CampaignIcon />
                <Text clicked={click} >Alertas</Text>
              </Item>
            </SlickBar>
          </SideBarContainer>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Homef></Homef>} />
              <Route path="/home" element={<Homef></Homef>} />
              <Route path="/inventario" element={<Inventario />}> </Route>
              <Route path="/registro" element={<Registro />}> </Route>
              <Route path="/movimientos" element={<Movimiento />} />
              <Route path="/alerta" element={<Alerta />} />

            </Routes>

          </div>
        </div>
      </Container>
    </>
  );
}

