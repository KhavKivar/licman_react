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
import ApiObjectCall from '../../services/callServices';
import ActaGeneral from './acta_general';
import "./invstyle.css";







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




  const editable = rows.map(o => ({ ...o }));



  const data = useSelector((state) => state.acta.data);
  const listOfInspecciones = data;


  const [openMessage, setOpenMessage] = React.useState(false);
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
            ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAltIcon sx={{ marginTop: 0.6 }} {...props} ref={ref} />),
          }}
          title={params.value != null ? TitleElement : "Inventario"}

          columns={[
            { title: 'Numero interno', field: 'idEquipo' },
            { title: 'Tipo', field: 'tipo' },
            { title: 'Marca', field: 'marca' },
            { title: 'Modelo', field: 'modelo' },
            { title: 'Serie', field: 'serie' },
            {
              title: 'Capacidad', field: 'capacidad', searchable: false, render: (row) => {
                return row.capacidad + " Kg";
              }
            },
            {
              title: 'Altura', field: 'altura', searchable: false, render: (row) => {
                return row.altura != null ? row.altura.toLocaleString('de-DE') + " mm" : ""
              }
            },
            { title: 'Mastil', field: 'mastil' },
            { title: 'Año', field: 'ano' },
            {
              title: 'Horometro', field: 'horometro', searchable: false, render: (row) => {
                return row.horometro != null ? row.horometro.toLocaleString('de-DE') : ""
              }
            },
            {
              title: 'Precio neto', field: 'precio_neto', hidden:true,searchable: false, render: (row) => {

                return row.precio_neto != null ? "$" + row.precio_neto.toLocaleString('de-DE') : ""
              }
            }


          ]}
          data={editable}
          onChangeColumnHidden={(column, hidden) => { console.log(column); }}
          options={{

            rowStyle: (data, index) => index % 2 == 0 ? { background: "#f5f5f5" } : null,
            searchFieldStyle: { color: "white", },

            headerStyle: {
              background: "var(--black)", color: "white", fontFamily: '"Poppins", sans-serif', fontSize: "1rem"
            },
            columnsButton: true,
            exportMenu: [{
              label: 'Exportar a PDF',
              style: {
              
              },
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName')
            }, {
              label: 'Exportar a CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName')
            }],
            actionsColumnIndex: -1,
            searchText: params.value != undefined ? params.value : ""
          }}

          actions={[

            {
              icon: () => <div style={{ paddingBottom: 5, width: 32 }}><AddBox sx={{ color: "white" }}></AddBox></div>,
              tooltip: 'Añadir equipo',
              isFreeAction: true,
              onClick: (event, rowData) => {
                navigate('/registro');
              }
            },

            {
              icon: () => <div style={{ paddingBottom: 5, width: 32 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
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
                      sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }}></Assignment> : <ContentPasteIcon sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }} ></ContentPasteIcon>}
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
              icon: () => <CreateIcon sx={{ color: "black !important" }}></CreateIcon>,
              tooltip: 'Editar Equipo',
              onClick: (event, rowData) => {

                navigate('/registro/' + rowData.idEquipo);
              }
            },
            rowData => ({
              icon: () => <ManageSearchIcon sx={{ color: "black !important" }} />,
              tooltip: 'Inspecionar',
              onClick: (event, rowData) => {
                navigate('/inventario/detalle/' + rowData.idEquipo);

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




