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

import { motion } from "framer-motion";

import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux'
import MaterialTable from 'material-table';


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




export default function Inventario() {
 

  const navigate = useNavigate();
  const openRegistro = () => {
    navigate('/registro')
  };


  const rows = useSelector((state) => state.inventario.data);

 

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
        <div style={{marginBottom: 15}}>
      <ButtonRegistro startIcon={<CreateIcon />} sx={{
        
        
        backgroundColor:"var(--black)",fontFamily:'"Poppins", sans-serif'
    
    }} onClick={openRegistro} size ='medium' variant="contained">Registrar equipo</ButtonRegistro>
      </div>

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

      </div>
    </motion.div>
  );
}