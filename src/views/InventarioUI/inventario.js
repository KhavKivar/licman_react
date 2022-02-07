import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddBox from '@mui/icons-material/AddBox';
import ReplayIcon from '@mui/icons-material/Replay';
import { motion } from "framer-motion";
import { forwardRef } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux'
import MaterialTable from '@material-table/core';
import "./invstyle.css";

import MotionHoc from "../../services/motionhoc";

import { initState } from '../../features/inventarioSlice';
import { initStateActa } from '../../features/actaSlice';
import API from '../../services/api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#343333",
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


const RegisterButton = styled(Button)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },


}));




const ButtonRegistro = styled(Button)`
    && {
        
        background-color: var(--black);
        color: white;
        :hover{
            background-color: var(--black);
        }
    }
`;





const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),

};

const InventarioComponent= ()=> {
  const navigate = useNavigate();
  const openRegistro = () => {
    navigate('/registro')
  };


  const rows = useSelector((state) => state.inventario.data);

  const editable = rows.map(o => ({ ...o }));
  const dispatch = useDispatch();
  const showAlert = React.useState(false);

  const updateState = () => {
    axios.get(API.baseURL + "/api/equipo/").then((response) => {
      dispatch(initState(response.data));
      console.log(response.data);
    });
    axios.get(API.baseURL + "/api/inspeccion/").then((response) => {
      dispatch(initStateActa(response.data));
      console.log(response.data);
    });

  } 
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}
  return (


      <div>
      
        <MaterialTable
          title="Lista de equipos"
          columns={[
            { title: 'Numero interno', field: 'idEquipo' },
            { title: 'Tipo', field: 'tipo' },
            { title: 'Marca', field: 'marca' },
            { title: 'Modelo', field: 'modelo' },
            { title: 'Serie', field: 'serie',hidden:true },
            { title: 'Capacidad', field: 'capacidad', searchable: false,hidden:true,render:(row)=>{
              return row.capacidad.replace(".",",")
            }  },
            { title: 'Altura', field: 'altura', searchable: false,render:(row)=>{
              return row.altura.replace(".",",");
            }  },
            { title: 'Mastil', field: 'mastil' },
            { title: 'Año', field: 'ano', searchable: false },
            { title: 'Horometro', field: 'horometro',  searchable: false ,render:(row)=>{
              return row.horometro.toLocaleString('de-DE')
            }},
            { title: 'Precio neto', field: 'precio_neto', type: "numeric",render:(row) =>{

              return "$"+row.precio_neto.toLocaleString('de-DE')
            } }


          ]}
          data={editable}
          onChangeColumnHidden={(column,hidden) => {console.log(column);}}
          options={{
            rowStyle: (data, index) => index % 2 == 0 ? { background: "#f5f5f5" } : null,
            searchFieldStyle: {color:"white"
            
          },
              
            headerStyle: { 
        
              background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif',fontSize: "1rem" },
            columnsButton: true,
            exportMenu: [{
              label: 'Exportar a PDF',
             
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName')
            }, {
              label: 'Exportar a CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName')
            }],
            actionsColumnIndex: -1
          }}
          
          actions={[

            {
              icon: ()=> <div style={{paddingTop:4}}><AddBox sx={{color:"white"}}></AddBox></div>,
              tooltip: 'Añadir equipo',
              isFreeAction: true,
              onClick: (event,rowData) => {
                navigate('/registro');
              }
            },
            {
              icon: ()=> <div style={{paddingTop:4}}><ReplayIcon sx={{color:"white"}}></ReplayIcon></div>,
              tooltip: 'Actualizar',
              isFreeAction: true,
              onClick: (event,rowData) => {
                updateState();
              }
            },

            {
              icon: ()=> <CreateIcon sx ={{color:"black !important"}}></CreateIcon>,
              tooltip: 'Editar Equipo',
              onClick: (event,rowData) => {
                
                navigate('/registro/'+rowData.idEquipo);
              }
            },
            rowData => ({
              icon: () => <ManageSearchIcon sx ={{color:"black !important"}}/>,
              tooltip: 'Inspecionar',
              onClick: (event, rowData) => {
                navigate('/inventario/detalle/'+rowData.idEquipo);
            
              }
            })


          ]}

           >


        </MaterialTable>
          

      </div>

  );
}

const Inventario = MotionHoc(InventarioComponent);
export default Inventario;




