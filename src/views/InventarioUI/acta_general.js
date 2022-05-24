import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import DeleteIconOutline from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { motion } from "framer-motion";
import * as React from 'react';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { format } from 'rut.js';
import { setInventarioValue } from '../../features/generalStateSlice';
import ApiObjectCall from '../../services/callServices';
import isAdmin from '../../services/utils_role';
import "./invstyle.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import API from '../../services/api';
import { deleteInspeccion } from '../../features/actaSlice';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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

  const [openMessageFail, setOpenMessageFail] = React.useState(false);
  const [openMessageOkdelete, setOpenMessageOkdelete] = React.useState(false);
  const [selectData, setselectData] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    setOpen(false);
    const rowData = selectData;
    console.log(rowData);

    axios.delete(API.baseURL + "/api/inspeccion/id/" + rowData.idInspeccion).then((response) => {
      console.log(response);
      if (response.status == 200) {
       
        setOpenMessageOkdelete(true);
        dispatch(deleteInspeccion({ id: rowData.idInspeccion }));

        setTimeout(() => { setOpenMessageOkdelete(false) }, 3000);
      }
    }).catch((e) => {
      console.log(e);
      setOpenMessageFail(true);
      setTimeout(() => { setOpenMessageFail(false) }, 3000);
    });




  };


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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro de eliminar la acta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Recuerde que para eliminar un acta, antes es necesario eliminar los movimientos asociados
            a la acta.

          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button sx={{
            background: "red", color: "white",
            ':hover': {
              bgcolor: 'red',
              opacity: 0.5, // theme.palette.primary.main
              color: 'white',
            },
          }}
            onClick={handleRemove} autoFocus>
            Si
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

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
        title="Actas"
        icons={{

          ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0 }}   {...props} ref={ref} />),

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
            title: 'Rut cliente', field: 'rut', hidden:true,render: x => {
              return format(x.rut);
            }
          },
        
          { title: 'Nombre cliente', field: 'nombre' },
          {
            title: 'Observaciones', field: 'observacion'
          },
          {
            title: 'Fecha', field: 'ts', render: x => {

              return x.ts.split("T")[0] + " " + x.ts.split("T")[1].substr(0, 5);


            }
          },
        ]}
        data={listOfInspecciones}
        onChangeColumnHidden={(column, hidden) => { console.log(column); }}
        options={{
          filtering: true,
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          rowStyle: (data, index) => index % 2 == 0 ? { background: "#f5f5f5" } : null,
          searchFieldStyle: {
            color: "white",
          },

          headerStyle: {

            background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif', fontSize: "1rem"
          },
          columnsButton: true,
          actionsColumnIndex: -1,
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

              ExportCsv(cols, listOfInspecciones, 'Actas')

            }
          },


          ],




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
            icon: () => <VisibilityIcon sx={{ color: "black !important" }}></VisibilityIcon>,

            tooltip: 'Ver acta',
            onClick: (event, rowData) => {
              navigate('/acta/' + rowData.idInspeccion);

            }
          },

          rowData => ({
            icon: () => <DeleteIconOutline sx={{ color: "black !important" }}></DeleteIconOutline>,
            tooltip: 'Eliminar',
            hidden: !isAdmin(),
            onClick: (event, rowData) => {
              setselectData(rowData);
              setOpen(true);
              //Call api

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
      {openMessageFail && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          No se pudo eliminar la <strong>acta!</strong>
        </Alert>
      </div>}
      {openMessageOkdelete && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
        <Alert severity="success">
          <AlertTitle>Exito</AlertTitle>
          Se ha  eliminado la acta — <strong> con exito!</strong>
        </Alert>
      </div>}
    </motion.div>)
}

