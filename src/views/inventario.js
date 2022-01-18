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

import { motion } from "framer-motion";
import { forwardRef } from 'react';

import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux'
import MaterialTable from '@material-table/core';
import "./invstyle.css";

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

export default function Inventario() {


  const navigate = useNavigate();
  const openRegistro = () => {
    navigate('/registro')
  };


  const rows = useSelector((state) => state.inventario.data);

  const editable = rows.map(o => ({ ...o }));


  return (

    <motion.div
      initial={{ y: 800 }}
      animate={{
        y: 0,
        transition: { duration: 0.5, type: "spring" },
      }}
      exit={{
        y: -500,
        transition: { duration: 0.5, type: "spring", ease: "easeInOut" },
      }}
    >

      <div>
      
        <MaterialTable
          title="Tabla de inventario"
          columns={[
            { title: 'Numero interno', field: 'id' },
            { title: 'Tipo', field: 'tipo' },
            { title: 'Marca', field: 'marca' },
            { title: 'Modelo', field: 'modelo' },
            { title: 'Serie', field: 'serie',hidden:true },
            { title: 'Capacidad', field: 'capacidad', searchable: false,hidden:true  },
            { title: 'Altura', field: 'altura', searchable: false,hidden:true  },
            { title: 'Mastil', field: 'mastil' },
            { title: 'Año', field: 'ano', searchable: false },
            { title: 'Horometro', field: 'horometro',  searchable: false },
            { title: 'Precio neto', field: 'precio_neto', type: "currency" }


          ]}
          data={editable}
          onChangeColumnHidden={(column,hidden) => {console.log(column);}}
          options={{
            rowStyle: (data, index) => index % 2 == 0 ? { background: "#f5f5f5" } : null,
            searchFieldStyle: {},
            headerStyle: { background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif',fontSize: "1rem" },
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
              icon: ()=> <div style={{paddingTop:4}}><AddBox></AddBox></div>,
              tooltip: 'Añadir equipo',
              isFreeAction: true,
              onClick: (event,rowData) => {
                navigate('/registro');
              }
            },

            {
              icon: ()=> <CreateIcon></CreateIcon>,
              tooltip: 'Editar Equipo',
              onClick: (event,rowData) => {
                
                navigate('/registro/'+rowData.id);
              }
            },
            rowData => ({
              icon: () => <ManageSearchIcon />,
              tooltip: 'Inspecionar',
              onClick: (event, rowData) => {
                navigate('/inventario/detalle');
            
              }
            })


          ]}

           >


        </MaterialTable>


      </div>
    </motion.div>
  );
}

/*
 <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Codigo</StyledTableCell>
              <StyledTableCell align="right">Tipo</StyledTableCell>
              <StyledTableCell align="right">Marca</StyledTableCell>
              <StyledTableCell align="right">Modelo</StyledTableCell>
              <StyledTableCell align="right">Serie</StyledTableCell>
              <StyledTableCell align="right">Capacidad(Kg)</StyledTableCell>
              <StyledTableCell align="right">Altura(m)</StyledTableCell>
              <StyledTableCell align="right">Mastil</StyledTableCell>
              <StyledTableCell align="right">Año</StyledTableCell>
              <StyledTableCell align="right">Horometro</StyledTableCell>
              <StyledTableCell align="right">Precio neto</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.tipo}</StyledTableCell>
                <StyledTableCell align="right">{row.marca}</StyledTableCell>
                <StyledTableCell align="right">{row.modelo}</StyledTableCell>
                <StyledTableCell align="right">{row.serie}</StyledTableCell>
                <StyledTableCell align="right">{row.capacidad.replace('.', ',')}</StyledTableCell>
                <StyledTableCell align="right">{row.altura.replace('.', ',')}</StyledTableCell>
                <StyledTableCell align="right">{row.mastil}</StyledTableCell>
                <StyledTableCell align="right">{row.ano}</StyledTableCell>
                <StyledTableCell align="right">{row.horometro.toLocaleString('de-DE')}</StyledTableCell>
                <StyledTableCell align="right">{row.precio_neto.toLocaleString('de-DE')}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

*/