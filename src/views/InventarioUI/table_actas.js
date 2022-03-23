
import MaterialTable from '@material-table/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReplayIcon from '@mui/icons-material/Replay';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { motion } from "framer-motion";
import * as React from 'react';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { format } from 'rut.js';
import { setDetalleValue } from '../../features/generalStateSlice';
import ApiObjectCall from '../../services/callServices';
import MotionHoc from "../../services/motionhoc";
import MovimientoDetalle from "./mov_table";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import SaveAltIcon from '@mui/icons-material/SaveAlt';



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


const options = [
    { value: 'Actas', label: 'Actas' },
    { value: 'Movimientos', label: 'Movimientos' },

]
const rows = [{
    fecha_entrada: "03/01/2021", transporte: "MARCO", empresa_envio: "DVP", retiro: "X", cambio: "O",
    acta: "3061", despacho: "3318", fecha: "", solicitud: "6585", obv: "Despacho por cambio"
}]

const TablaActaComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const backFunc = () => {
        navigate('/inventario');
    }

    const params = useParams();
    console.log(params.id);

    const data = useSelector((state) => state.acta.data);
    const listOfInspecciones = data.filter(x => x.idEquipo == params.id);
    console.log(listOfInspecciones);

    const tabSelect = useSelector((state) => state.generalState.detalleEquipoValue);

    const handleChange = (e) => {
        dispatch(setDetalleValue(e));

    }

    const TitleElement = <div style={{ fontSize: "1.25rem", paddingRight: 20 }}>
        <IconButton onClick={backFunc} aria-label="Volver" component="span">
            <ArrowBackIcon />
        </IconButton>
        Codigo interno {params.id}
    </div>;
    const [openMessage, setOpenMessage] = React.useState(false);
    const updateState = () => {
        setOpenMessage(true);
        ApiObjectCall(dispatch);
        setTimeout(() => { setOpenMessage(false) }, 3000);
    }




    if (tabSelect.value == 'Actas') {
        return (
            <motion.div
                initial={{ y: 500 }}
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
                        localization={{
                            pagination: {
                                labelDisplayedRows: '{from}-{to} de {count}',
                                labelRowsPerPage: 'Filas por pagina:',
                                labelRowsSelect: 'filas'
                            },
                            toolbar: {
                                showColumnsTitle: 'Mostrar Columnas',
                                exportTitle: "Exportar",
                                searchPlaceholder: "Buscar",
                                addRemoveColumns: "Añadir o remover Columnas"
                            },

                            header: {
                                actions: 'Acciones'
                            },
                            body: {
                                emptyDataSourceMessage: 'No hay informacion para mostrar',

                            }
                        }}
                        title={TitleElement}
                        icons={{

                            ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />),
                            Export: forwardRef((props, ref) => <SaveAltIcon sx={{ marginTop: 0.6 }} {...props} ref={ref} />),

                        }}
                        columns={[
                            { title: 'Acta ID', field: 'idInspeccion' },
                            {
                                title: 'Tipo', field: 'tipo', render: x => {
                                    return x.tipo == "acta_equipo" ? "Acta de equipo" : "Acta electrica"

                                }
                            },
                            {
                                title: 'Rut cliente', field: 'rut', render: x => {
                                    return format(x.rut);
                                }
                            },
                            { title: 'Nombre cliente', field: 'nombre' },
                            {
                                title: 'Altura de levante', field: 'alturaLevante', render: x =>
                                    x.alturaLevante + " mm"
                            },
                            { title: 'Horometro registrado', field: 'horometroActual' },

                            {
                                title: 'Fecha', field: 'ts', render: x => {

                                    return x.ts.split("T")[0] + " " + x.ts.split("T")[1].substr(0, 5);


                                }
                            },
                        ]}
                        data={listOfInspecciones}
                        onChangeColumnHidden={(column, hidden) => { console.log(column); }}
                        options={{
                            exportMenu: [{
                                label: 'Exportar a PDF',
                                style: {
                                
                                },
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Actas')
                              }, {
                                label: 'Exportar a CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Actas')
                              },
                              {
                                label: 'Exportar todo a CSV',
                                exportFunc: (cols, datas) => {
                               
                                    ExportCsv(cols, listOfInspecciones, 'actas_id_'+params.id.toString())
                              
                              }},
                            ],

                              pageSize: 5,
                              pageSizeOptions: [5, 10, 20, { value:70, label: '70' }],
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
                                icon: () => <div style={{ paddingBottom: 5 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
                                tooltip: 'Actualizar',
                                isFreeAction: true,
                                onClick: (event, rowData) => {

                                    updateState();



                                }
                            },
                            {
                                icon: () => <div style={{ width: 250, height: 45, margin: "auto" }} > <Select

                                    getOptionLabel={e => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {e.label == "Movimientos" ? <SwapVertIcon
                                                sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }}></SwapVertIcon> : <ContentPasteIcon sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }} ></ContentPasteIcon>}
                                            <span style={{ marginLeft: 5, color: "var(--black)", opacity: tabSelect.value == e.label ? 1 : 0.5 }}>{e.label}</span>
                                        </div>
                                    )}

                                    value={tabSelect} onChange={handleChange} options={options} /></div>,
                                tooltip: '',
                                isFreeAction: true,
                                onClick: (event, rowData) => {

                                }
                            },


                            {
                                icon: () => <ManageSearchIcon sx={{ color: "black !important" }}></ManageSearchIcon>,

                                tooltip: 'Ver acta',
                                onClick: (event, rowData) => {
                                    navigate('/acta/' + rowData.idInspeccion);

                                }
                            },
                            rowData => ({
                                icon: () => <div style={{ paddingLeft: 10 }}></div>,
                                tooltip: '',
                                onClick: (event, rowData) => {


                                }
                            }),



                        ]}

                    >


                    </MaterialTable>




                    {openMessage && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
                        <Alert severity="success">
                            <AlertTitle>Exito</AlertTitle>
                            Se han actualizado las variables — <strong>con exito!</strong>

                        </Alert>
                    </div>}
                </div>
            </motion.div>

        );

    }
    else {
        return (<MovimientoDetalle></MovimientoDetalle>)
    }

}



const TablaActa = MotionHoc(TablaActaComponent);
export default TablaActa;
