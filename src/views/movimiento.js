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


import MotionHoc from "../services/motionhoc";



const rows = [{
    fecha_entrada: "03/01/2021", transporte: "MARCO", empresa_envio: "DVP", retiro: "X", cambio: "O",
    acta: "3061", despacho: "3318", fecha: "", solicitud: "6585", obv: "Despacho por cambio"
}]


const MovimientoComponent = () => {
    const navigate = useNavigate();


        
    return (
        <MaterialTable
        title="Lista de movimientos" 
        columns={[
            { title: 'Acta ID', field: 'acta' },
            { title: 'Despacho ID', field: 'despacho' },

            { title: 'Fecha entrada', field: 'fecha_entrada' },
            { title: 'Transporte', field: 'transporte' },
            { title: 'Empresa envio', field: 'empresa_envio' },
           { title: 'Observaciones', field: 'obv' },
         
        ]}
        data={rows}
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
                icon: () => <ManageSearchIcon sx ={{color:"black !important"}}></ManageSearchIcon>,
               
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
     
            );
}

const Movimiento = MotionHoc(MovimientoComponent);
export default Movimiento;



