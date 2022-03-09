import MaterialTable from '@material-table/core';
import AddBox from '@mui/icons-material/AddBox';
import CreateIcon from '@mui/icons-material/Create';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { format } from 'rut.js';
import { deleteMov } from '../features/movimientoSlice';
import { cleanInput, editValue } from '../features/movRegisterSlice';
import API from '../services/api';
import ApiObjectCall from '../services/callServices';
import MotionHoc from "../services/motionhoc";

import CircularProgress from '@mui/material/CircularProgress';

const rows = [{
    fecha_entrada: "03/01/2021", transporte: "MARCO", empresa_envio: "DVP", retiro: "X", cambio: "O",
    acta: "3061", despacho: "3318", fecha: "", solicitud: "6585", obv: "Despacho por cambio"
}]


const MovimientoComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rows = useSelector((state) => state.movimiento.data);

    const editable = rows.map(o => ({ ...o }));

    const cliente = useSelector((state) => state.cliente.data);
    const actas = useSelector((state) => state.acta.data);

    const rowsWithPower = [];



    for (var i in editable) {
        if (actas.length >0 && cliente.length > 0) {
            console.log(actas);
            console.log(cliente)
            editable[i].idEquipo = actas.find(x => x.idInspeccion == editable[i].idInspeccion).idEquipo;
            editable[i].empresa = cliente.find(x => x.rut == editable[i].rut).nombre;
            rowsWithPower.push(editable[i]);
        }else{
            editable[i].idEquipo = "";
            editable[i].empresa ="";
            rowsWithPower.push(editable[i]);
        }
    }

    const handeClick = (e) => {
        navigate('/acta/' + e);
    };
    const handeClickEquipo = (e) => {
        navigate('/inventario/search/' + e);
    };

    const [openMessage, setOpenMessage] = React.useState(false);
    const updateState = () => {
        setOpenMessage(true);
        ApiObjectCall(dispatch);
        setTimeout(() => { setOpenMessage(false) }, 3000);
    }


    return (<>

      


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
            title="Movimientos"
            columns={[
                {
                    title: 'Fecha Movimiento', field: 'fechaMov', render: x => {

                        return x.fechaMov.split("T")[0] + " " + x.fechaMov.split("T")[1].substr(0, 5);

                    }
                },
                { title: 'Movimiento ID', field: 'idMovimiento', hidden: true },
                { title: 'Transporte', field: 'transporte', render: x => x.transporte == "externo" ? "Externo" : "Marco" },
                {
                    title: 'Rut Empresa', field: 'rut', render: x => {
                        return <><p data-tip={cliente.find(y => y.rut == x.rut).nombre}>{format(x.rut)}
                        </p>
                            <ReactTooltip /></>
                    }
                },
                { title: 'Empresa', field: 'empresa' },
                { title: 'Tipo', field: 'tipo', render: x => x.tipo == "ENVIO" ? "Envio" : "Retiro" },
                { title: 'Cambio', field: 'cambio', hidden: true },
                {
                    title: 'Codigo equipo', field: 'idEquipo', render: x => {
                        return <> <a data-tip="Ver equipo"
                            style={{ cursor: 'pointer', width: 30, display: "inline-block" }} onClick={() => handeClickEquipo(x.idEquipo)}>
                            {x.idEquipo} </a>
                            <ReactTooltip />
                        </>
                            ;

                    }
                },
                {
                    title: 'Acta ID', field: 'idInspeccion', render: x => {
                        return <> <a data-tip="Ver acta"
                            style={{ cursor: 'pointer', width: 50, height: 30, display: "inline-block" }} onClick={() => handeClick(x.idInspeccion)}>
                            {x.idInspeccion} </a>
                            <ReactTooltip />
                        </>
                            ;

                    }
                },
                {
                    title: 'N° Guia de despacho', field: 'idGuiaDespacho', render: x => {
                        return <>

                            <a data-tip="Ver documento"
                                style={{ cursor: 'pointer', width: 30, display: "inline-block" }} onClick={() => {
                                    navigate('/movimientos/showPdf/' + x.idMovimiento);
                                }}>
                                {x.idGuiaDespacho} </a>
                            <ReactTooltip />







                        </>

                    }
                },
                {
                    title: 'Fecha de retiro', searchable: false,field: 'fechaRetiro', render: x => {
                        return x.fechaRetiro != null ? x.fechaRetiro.split("T")[0] : "    ";
                    }
                },
                { title: 'Observaciones', field: 'observaciones', hidden: true, searchable: false },

            ]}
            data={rowsWithPower}
            onChangeColumnHidden={(column, hidden) => { console.log(column); }}
            editable={{
                onRowDelete: (oldData) => {
                    return new Promise((resolve, reject) => {
                        axios.delete(API.baseURL + "/api/movimiento/id/" + oldData.idMovimiento).then((response) => {
                            console.log(response.data);
                        });
                        dispatch(deleteMov({ idMovimiento: oldData.idMovimiento }));

                        resolve();

                    })

                }


            }}
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
                filtering: true



            }}

            actions={[
                {
                    icon: () => <div style={{ paddingBottom: 5, width: 32 }}><AddBox sx={{ color: "white" }}></AddBox></div>,
                    tooltip: 'Añadir Movimiento',
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                        dispatch(cleanInput());
                        navigate('/movimientos/registro');
                    }
                },
                {
                    icon: () => <div style={{ paddingBottom: 5 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
                    tooltip: 'Actualizar',
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                        updateState();
                    }
                },
                {
                    icon: () => <CreateIcon sx={{ color: "black !important" }}></CreateIcon>,
                    tooltip: 'Editar Movimiento',
                    onClick: (event, rowData) => {
                        dispatch(editValue({ ...rowData, listOfActa: actas }));
                        navigate('/movimientos/registro/' + rowData.idMovimiento);


                    }
                },







            ]}

        >


        </MaterialTable>

        {openMessage && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
            <Alert severity="success">
                <AlertTitle>Exito</AlertTitle>
                Se han actualizado las variables — <strong>con exito!</strong>

            </Alert>
        </div>}

    </>
    
    );
}

const Movimiento = MotionHoc(MovimientoComponent);
export default Movimiento;



