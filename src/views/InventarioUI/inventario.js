import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddBox from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Assignment from '@mui/icons-material/Assignment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CreateIcon from '@mui/icons-material/Create';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
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
import { setInventarioValue } from '../../features/generalStateSlice';

import { deleteEquipo } from '../../features/inventarioSlice';
import ApiObjectCall from '../../services/callServices';
import ActaGeneral from './acta_general';
import "./invstyle.css";
import axios from "axios";
import API from '../../services/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { changeSearch,changeFiltro,changePage } from '../../features/tableSlice';






const options = [
  { value: 'Inventario', label: 'Inventario' },
  { value: 'Acta', label: 'Acta General' },

]

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


const customStyles = {

  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,

  }),

}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),

};



const InventarioComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();


  const openRegistro = () => {
    navigate('/registro')
  };

  const tabSelect = useSelector((state) => state.generalState.inventarioValue);

  const handleChange = (e) => {
    dispatch(setInventarioValue(e));

  }



  const rows = useSelector((state) => state.inventario.data);

  const tableState = useSelector((state) => state.tableState);


  const searchState = tableState.search;
  const filtroState = tableState.filtroOn;
  const pageState = tableState.page;


  const editable = rows.map(o => ({ ...o }));

  const data = useSelector((state) => state.acta.data);
  const listOfInspecciones = data;


  const [openMessage, setOpenMessage] = React.useState(false);
  const [openMessageFail, setOpenMessageFail] = React.useState(false);
  const [openMessageOkdelete, setOpenMessageOkdelete] = React.useState(false);

  const updateState = () => {
    setOpenMessage(true);
    ApiObjectCall(dispatch);
    setTimeout(() => { setOpenMessage(false) }, 3000);
  }


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  }
  const backFunc = () => {
    navigate(-1);
  }
  const TitleElement = <div style={{ fontSize: "1.25rem", paddingRight: 20 }}>
    <IconButton onClick={backFunc} aria-label="Volver" component="span">
      <ArrowBackIcon />
    </IconButton>
    Inventario

  </div>;




  if (tabSelect.value == 'Inventario') {
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
          onSearchChange = {x=> {dispatch(changeSearch(x))}}

          onPageChange = {x=>{
            
            dispatch(changePage(x))}}
          onRowsPerPageChange = {x=>{dispatch(changeFiltro(x))}}



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

          icons={{
            ...tableIcons,
            ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0 }}   {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAltIcon sx={{ marginTop: 0 }} {...props} ref={ref} />),
          }}
          title={params.value != null ? TitleElement : "Inventario"}

          columns={[
            { title: 'Codigo interno', field: 'idEquipo' },
            { title: 'Tipo', field: 'tipo' },
            { title: 'Marca', field: 'marca' },
            { title: 'Modelo', field: 'modelo' },
            { title: 'Serie', field: 'serie', hidden: true },
            {
              title: 'Capacidad', field: 'capacidad', searchable: false, render: (row) => {
                return row.capacidad + " Kg";
              }
            },
            {
              title: 'Altura', field: 'altura', hidden: true, searchable: false, render: (row) => {
                return row.altura != null ? row.altura.toLocaleString('de-DE') + " mm" : ""
              }
            },
            { title: 'Mastil', field: 'mastil', hidden: true, },
            { title: 'Año', field: 'ano', hidden: true, },
            {
              title: 'Horometro', field: 'horometro', searchable: false, render: (row) => {
                return row.horometro != null ? row.horometro.toLocaleString('de-DE') : ""
              }
            },

            {
              title: 'Estado', field: 'estado', render: (row) => {
                return capitalizeFirstLetter(row.estado.toLowerCase());
              }
            },
            {
              title: 'Ubicacion', field: 'ubicacion', render: (row) => {
                return capitalizeFirstLetter(row.ubicacion.toLowerCase());
              }
            },

            {
              title: 'Precio neto', field: 'precio_neto', hidden: true, searchable: false, render: (row) => {

                return row.precio_neto != null ? "$" + row.precio_neto.toLocaleString('de-DE') : ""
              }
            },

            {
              title: 'Ultima actualizacion', field: 'ts', hidden: true, searchable: false, render: (row) => {

                  return row.ts == null ?  "": row.ts.split("T")[0] + " " + row.ts.split("T")[1].substr(0, 5);
              }
            }



          ]}
          data={editable}
          onChangeColumnHidden={(column, hidden) => { console.log(column); }}
          editable={{


            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {

                axios.delete(API.baseURL + "/api/equipo/id/" + oldData.idEquipo).then((response) => {
                  if (response.status == 200) {
                    setOpenMessageOkdelete(true);
                    dispatch(deleteEquipo(oldData.idEquipo));

                    setTimeout(() => { setOpenMessageOkdelete(false) }, 3000);
                    resolve();
                  }
                }).catch((e) => {
                  setOpenMessageFail(true);
                  setTimeout(() => { setOpenMessageFail(false) }, 3000);
                  resolve();
                });

              })

            }


          }}
          options={{
            filtering: true,
            pageSize: filtroState,
            pageSizeOptions: [5, 10, 20, 50,100],
            initialPage:pageState,

            rowStyle: (data, index) =>    data.ubicacion == 'Actualizar' ? {background: "#ffff00"} :
            data.estado == 'POR LLEGAR' ? {background: "#00b0f0"}:
            data.estado == 'LISTO PARA ENVIAR' ? {background: "#76ff03"}:
            data.estado == 'VENDIDO' ? {background: "#ff5252"}:
            index % 2 == 0 ? { background: "#f5f5f5" } :
         
            null,
            searchFieldStyle: { color: "white", },
            headerStyle: {
              background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif', fontSize: "1rem"
            },
            columnsButton: true,
            exportMenu: [{
              label: 'Exportar a PDF',
              style: {

              },
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Inventario')
            }, {
              label: 'Exportar a CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Inventario')
            },
            {
              label: 'Exportar todo a CSV',
              exportFunc: (cols, datas) => {
                console.log(cols);

                const columnas = [
                  {
                    "title": "Codigo interno",
                    "field": "idEquipo",
                 
                  },
                  {
                    "title": "Tipo",
                    "field": "tipo",
                   
                  },
                  {
                    "title": "Marca",
                    "field": "marca",
                   
                  },
                  {
                    "title": "Modelo",
                    "field": "modelo",
                   
                  },
                  {
                    "title": "Serie",
                    "field": "serie",
                  
                  },
                  {
                    "title": "Capacidad",
                    "field": "capacidad",
                    
                  },
                  {
                    "title": "Altura",
                    "field": "altura",
                   
                  },
                  {
                    "title": "Mastil",
                    "field": "mastil",
                  
                  },
                  {
                    "title": "Año",
                    "field": "ano",
                   
                  },
                  {
                    "title": "Horometro",
                    "field": "horometro",
                   
                  
                  },
                  {
                    "title": "Estado",
                    "field": "estado",
                   
                  },
                  {
                    "title": "Ubicacion",
                    "field": "ubicacion",
                  
                  },
                  {
                    "title": "Precio neto",
                    "field": "precio_neto",
                 
                  }
                ];
               ExportCsv(columnas, editable, 'Inventario');

              }
            }


            ],
            actionsColumnIndex: -1,
            searchText: params.value != undefined ? params.value :
            
            searchState

          }}

          actions={[

            {
              icon: () => <div style={{ paddingBottom: 0, width: 32 }}><AddBox sx={{ color: "white" }}></AddBox></div>,
              tooltip: 'Añadir equipo',
              isFreeAction: true,
              onClick: (event, rowData) => {
                navigate('/registro');
              }
            },

            {
              icon: () => <div style={{ paddingBottom: 0, width: 32 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
              tooltip: 'Actualizar',
              isFreeAction: true,
              onClick: (event, rowData) => {
                updateState();


              }
            },

            {
              icon: () => <VisibilityIcon sx={{ color: "black !important" }} />,
              tooltip: 'Inspecionar',
              onClick: (event, rowData) => {
                navigate('/inventario/detalle/' + rowData.idEquipo);

              }
            },



            rowData => ({
              icon: () => <CreateIcon sx={{ color: "black !important" }}></CreateIcon>,
              tooltip: 'Editar Equipo',
              onClick: (event, rowData) => {

                navigate('/registro/' + rowData.idEquipo);
              }
            })



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
            Error al eliminar el <strong>equipo!</strong>
          </Alert>
        </div>}
        {openMessageOkdelete && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
          <Alert severity="success">
            <AlertTitle>Exito</AlertTitle>
            Se ha  eliminado el equipo — <strong> con exito!</strong>
          </Alert>
        </div>}

      </motion.div>
    );
  }
  else {
    return (
      <ActaGeneral></ActaGeneral>);
  }
}

const Inventario = InventarioComponent;
export default Inventario;




