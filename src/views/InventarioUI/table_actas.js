
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MaterialTable from '@material-table/core';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import IconButton from '@mui/material/IconButton';
import { autocompleteClasses } from '@mui/material';
import { motion } from "framer-motion";

import MotionHoc from "../../services/motionhoc";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "var(--black)",
        color: theme.palette.common.white,
        fontFamily: '"Poppins", sans-serif',
    },
    [`&.${tableCellClasses.body}`]: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ButtonBack = styled(Button)`
    && {
        
        background-color: var(--black);
        color: white;
        :hover{
            background-color: var(--black);
        }
    }
`;



const rows = [{
    fecha_entrada: "03/01/2021", transporte: "MARCO", empresa_envio: "DVP", retiro: "X", cambio: "O",
    acta: "3061", despacho: "3318", fecha: "", solicitud: "6585", obv: "Despacho por cambio"
}]

const TablaActaComponent = ()=> {
    const navigate = useNavigate();

    const backFunc = () => {
        navigate('/inventario');
    }

    const params = useParams();
    console.log(params.id);

    const data = useSelector((state) => state.acta.data);
    const listOfInspecciones = data.filter(x => x.idEquipo == params.id);
    console.log(listOfInspecciones);

    const TitleElement = <div style={{fontSize:"1.25rem",paddingRight:20}}>
        <IconButton onClick={backFunc} aria-label="Volver" component="span">
    <ArrowBackIcon /> 
  </IconButton>
    Lista de actas
    </div>;


    return (
       

        <div>
            
            <MaterialTable
                title={TitleElement } 
                columns={[
                    { title: 'Acta ID', field: 'idInspeccion' },
                    { title: 'Tipo', field: 'tipo',render:x=>{
                            return x.tipo =="acta_equipo" ? "Acta de equipo": "Acta electrica"

                    } },
                    { title: 'Rut cliente', field: 'rut' },
                    { title: 'Nombre cliente', field: 'nombre' },
                    { title: 'Fecha', field: 'ts',render:x=>{
                      
                        return x.ts.split("T")[0]+" "+x.ts.split("T")[1].substr(0,5);
                      
                    
                    }},
                ]}
                data={listOfInspecciones}
                onChangeColumnHidden={(column, hidden) => { console.log(column); }}
                options={{
                    rowStyle: (data, index) => index % 2 == 0 ? { background: "#f5f5f5" } : null,
                    searchFieldStyle: {
                        color: "white",
                    },

                    headerStyle: {

                        background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif', fontSize: "1rem"
                    },
                    columnsButton: true,
                    actionsColumnIndex: -1,
                 
                   

        
                }}

                actions={[

                    {
                        icon: () => <div style={{ paddingTop: 4 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
                        tooltip: 'Actualizar',
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            
                        }
                    },
                 
                    {
                        icon: () => <ManageSearchIcon sx ={{color:"black"}}></ManageSearchIcon>,
                       
                        tooltip: 'Inspeccionar',
                        onClick: (event,rowData) => {

                          
                        }
                      },
                      rowData=> ({
                        icon: () =><div style={{paddingLeft:10}}></div>,
                        tooltip: '',
                        onClick: (event,rowData) => {

                          
                        }}),
                    
                

                ]}

            >


            </MaterialTable>
        </div>
  
    );
}



const TablaActa = MotionHoc(TablaActaComponent);
export default TablaActa;
