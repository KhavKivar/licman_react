import MaterialTable from '@material-table/core';
import Assignment from '@mui/icons-material/Assignment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReplayIcon from '@mui/icons-material/Replay';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { motion } from "framer-motion";
import * as React from 'react';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import { format } from 'rut.js';
import { setInventarioValue } from '../../features/generalStateSlice';
import ApiObjectCall from '../../services/callServices';
import "./invstyle.css";








const options = [
  { value: 'Inventario', label: 'Inventario' },
  { value: 'Acta', label: 'Acta General' },

]
export default function ActaGeneral() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openRegistro = () => {
    navigate('/registro')
  };

  const tabSelect = useSelector((state) => state.generalState.inventarioValue);

  const handleChange = (e) => {
    dispatch(setInventarioValue(e));

  }


  const rows = useSelector((state) => state.inventario.data);



  const data = useSelector((state) => state.acta.data);
  const listOfInspecciones = data;


  const [openMessage, setOpenMessage] = React.useState(false);
  const updateState = () => {
    setOpenMessage(true);
    ApiObjectCall(dispatch);
    setTimeout(() => { setOpenMessage(false) }, 3000);
  }

  const handeClick = (e) => {
    navigate('/inventario/detalle/' + e);
  };

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
        title="Acta General"
        icons={{

          ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />),

        }}
        columns={[
          { title: 'Acta ID', field: 'idInspeccion' },
          {
            title: 'Tipo', field: 'tipo', render: x => {
              return x.tipo == "acta_equipo" ? "Acta de equipo" : "Acta electrica"
            }
          },
          {
            title: 'Codigo interno', field: 'idEquipo', render: x => {
              return <> <a data-tip="ver actas/movimientos" style={{ cursor: 'pointer', width: 30, display: "inline-block" }} onClick={() => handeClick(x.idEquipo)}> {x.idEquipo} </a>
                <ReactTooltip />
              </>
                ;
            }
          },
          {
            title: 'Rut cliente', field: 'rut', render: x => {
              return format(x.rut);
            }
          },
          { title: 'Nombre cliente', field: 'nombre' },

          {
            title: 'Fecha', field: 'ts', render: x => {

              return x.ts.split("T")[0] + " " + x.ts.split("T")[1].substr(0, 5);


            }
          },
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
                  {e.label == "Inventario" ? <Assignment
                    sx={{ color: "var(--black) !important", opacity: tabSelect.label == e.label ? 1 : 0.5 }}></Assignment> : <ContentPasteIcon sx={{ color: "var(--black) !important", opacity: tabSelect.label == e.label ? 1 : 0.5 }} ></ContentPasteIcon>}
                  <span style={{ marginLeft: 5, color: "var(--black)", opacity: tabSelect.label == e.label ? 1 : 0.5 }}>{e.label}</span>
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
    </motion.div>)
}

