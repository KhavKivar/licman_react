
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



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


export default function Detalle() {
    const navigate = useNavigate();

const backFunc = () => {
    navigate('/inventario');
}
    
    return (

        <div>
            <div style={{ marginBottom: 15 }}>
                <ButtonBack startIcon={<ArrowBackIcon />} sx={{
                    backgroundColor: "var(--black)", fontFamily: '"Poppins", sans-serif'
                }} onClick={backFunc} size='medium' variant="contained">Volver</ButtonBack>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Fecha movimiento</StyledTableCell>
                            <StyledTableCell align="right">Transporte</StyledTableCell>
                            <StyledTableCell align="right">Empresa Envio</StyledTableCell>
                            <StyledTableCell align="right">Retiro</StyledTableCell>
                            <StyledTableCell align="right">Cambio</StyledTableCell>
                            <StyledTableCell align="right">Acta Insp.</StyledTableCell>
                            <StyledTableCell align="right">Nº Guía Despacho</StyledTableCell>
                            <StyledTableCell align="right">Fecha Solicitud Retiro</StyledTableCell>
                            <StyledTableCell align="right">Horómetro</StyledTableCell>
                            <StyledTableCell align="right">Observaciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.acta}>
                                <StyledTableCell component="th" scope="row">
                                    {row.fecha_entrada}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.transporte}</StyledTableCell>
                                <StyledTableCell align="right">{row.empresa_envio}</StyledTableCell>
                                <StyledTableCell align="right">{row.retiro}</StyledTableCell>
                                <StyledTableCell align="right">{row.cambio}</StyledTableCell>
                                <StyledTableCell align="right">{row.acta}</StyledTableCell>
                                <StyledTableCell align="right">{row.despacho}</StyledTableCell>
                                <StyledTableCell align="right">{row.fecha}</StyledTableCell>
                                <StyledTableCell align="right">{row.solicitud}</StyledTableCell>
                                <StyledTableCell align="right">{row.obv}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            );
}

