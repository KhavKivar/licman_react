
import Assignment from '@mui/icons-material/Assignment';
import Home from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useEffect, useState } from 'react';
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
import { BarChart, Inventory } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import Login from '../views/login';
import PowerOff from './power-off-solid.svg';

import Avatar from './avatar.png';
import { setLogin } from '../features/loginSlice';
const Container = styled.div`

  .active {
    border-right: 4px solid var(--white);
   
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  img {
    width: 100% !important;
    height: auto !important;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;
  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};
  background-color: var(--black);
  color: var(--white);
  transition: all 0.3s ease;
  z-index: 200;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
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
top:  ${(props => props.clicked ? "5rem" : "5rem")};
left:0;
width: ${(props => props.clicked ? "17rem" : "3.5rem")};
transition: all 0.35 ease;
border-radius: 0 30px 30px 0;
position:${(props => props.clicked ? "absolute" : "absolute")};
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

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    display: inline-block;
    overflow: hidden;
  }
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);
    &:hover {
      text-decoration: underline;
    }
  }
`;


export default function SideBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => { setClick(!click) };
  const dispatch = useDispatch();

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);
  

  const [userName, setUsername] = useState("");
  useEffect(() => {
    setUsername(getUserName());
  },[]);

  const getUserName = () => {
    const user = localStorage.getItem('usuario');
    return user;
  };


  const logoutAction = () =>{
    localStorage.clear();
    dispatch(setLogin(false));

  }
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
                to="/home">
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

            <Profile clicked={profileClick}>
              <img
                onClick={() => handleProfileClick()}
                src={Avatar}
                alt="Profile"
              />
              <Details clicked={profileClick}>
                <Name>
                  <h4>{userName}</h4>

                </Name>

                <Logout>
                  <img src={PowerOff} onClick={logoutAction} alt="logout" />
                </Logout>
              </Details>
            </Profile>
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

