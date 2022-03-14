
import Assignment from '@mui/icons-material/Assignment';
import Home from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import Acta from '../views/acta';
import AddMov from '../views/addmov';
import Homef from '../views/home';
import Inventario from '../views/InventarioUI/inventario';
import ActaGeneral from '../views/InventarioUI/acta_general';
import Registro from '../views/InventarioUI/registrarView';
import TablaActa from '../views/InventarioUI/table_actas';
import Movimiento from '../views/movimiento';
import TabConfig from '../views/Settings/TabTabla';
import ShowPdf from '../views/showpdf';
import "./content.css";
import SideBarTop from './sidebartop';

import PersonIcon from '@mui/icons-material/Person';
import { BarChart,Inventory } from '@mui/icons-material';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';





const Container = styled.div`

  .active {
    border-right: 4px solid var(--white);
   
  }
`;




const SideBarContainer = styled.div`
background-color: var(--black);
width: 3.5rem;
height: 85vh;
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

top:  ${(props => props.clicked ? "6rem" : "5rem")};
left:0;
width: ${(props => props.clicked ? "17rem" : "3.5rem")};
transition: all 0.35 ease;
border-radius: 0 30px 30px 0;
position:${(props=>props.clicked ?"absolute":"relative")};
z-index: 10;
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
                <BarChart>  </BarChart>
                <Text clicked={click} >Estadisticas</Text>



              </Item>
              <Item onClick={() => setClick(false)}
                exact="true"
                activeclassname="active"
                to="/inventario">
                <Assignment />
                <Text clicked={click} >Inventario</Text>
              </Item>
              <Item onClick={() => setClick(false)}
                exact="true"
                activeclassname="active"
                to="/actas">
                <ContentPasteIcon />
                <Text clicked={click} >Actas</Text>
              </Item>
              <Item onClick={() => setClick(false)} exact="true" activeclassname="active" to="/movimientos">
                <SwapVertIcon />
                <Text clicked={click} >Movimientos</Text>
              </Item >

              <Item onClick={() => setClick(false)} exact="true" activeclassname="active" to="/config">
                <PersonIcon />
                <Text clicked={click} >Clientes</Text>
              </Item>
            </SlickBar>
          </SideBarContainer>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Homef></Homef>} />
              <Route path="/home" element={<Homef></Homef>} />
              <Route path="/actas" element={<ActaGeneral />}> </Route>


              <Route path="/inventario" element={<Inventario />}> </Route>

              <Route path="/inventario/search/:value" element={<Inventario />}> </Route>
             
              <Route path="/inventario/detalle/:id" element={<TablaActa />}> </Route>

              <Route path="/registro" element={<Registro />}> </Route>
              <Route path="/registro/:id" element={<Registro />}> </Route>
              <Route path="/acta/:id" element={<Acta />} />

              <Route path="/movimientos/registro" element={<AddMov />} />
              <Route path="/movimientos/registro/:id" element={<AddMov />} />


              <Route path="/movimientos/showPdf/:id" element={<ShowPdf />} />


              <Route path="/movimientos" element={<Movimiento />} />
              <Route path="/config" element={<TabConfig />} />


            </Routes>

          </div>
        </div>
      </Container>
    </>
  );
}

