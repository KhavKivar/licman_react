import MaterialTable from '@material-table/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ReplayIcon from '@mui/icons-material/Replay';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select, { components } from "react-select";
import ReactTooltip from 'react-tooltip';
import { format } from 'rut.js';
import { setDetalleValue } from '../../features/generalStateSlice';
import ApiObjectCall from '../../services/callServices';
import MotionHoc from "../../services/motionhoc";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

const options = [
  { value: 'Actas', label: 'Actas' },
  { value: 'Movimientos', label: 'Movimientos' },

]
const rows = [{
  fecha_entrada: "03/01/2021", transporte: "MARCO", empresa_envio: "DVP", retiro: "X", cambio: "O",
  acta: "3061", despacho: "3318", fecha: "", solicitud: "6585", obv: "Despacho por cambio"
}]
const customStyles = {
  menu: (provided, state) => ({
    ...provided,

    color: "red",
    padding: 20,
  }),


  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const MovimientoDetalleComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Option } = components;
  const rows = useSelector((state) => state.movimiento.data);
  const actas = useSelector((state) => state.acta.data);
  
  const rows_editable = rows.map(o => ({ ...o }));

  const CustomOption = props => (
    <Option {...props}>
      <SwapVertIcon sx={{ color: "var(--black) !important" }}></SwapVertIcon>
      {props.data.label}
    </Option>
  );

  const tabSelect = useSelector((state) => state.generalState.detalleEquipoValue);

  const handleChange = (e) => {
    dispatch(setDetalleValue(e));

  }
  const backFunc = () => {
    navigate('/inventario');
  }
  const params = useParams();
  const cliente = useSelector((state) => state.cliente.data);

  const editable = [];
  const rowsWithPower = [];

  for (var i in rows_editable) {
    if (actas.find(x => x.idInspeccion == rows_editable[i].idInspeccion).idEquipo == params.id) {
      editable.push(rows_editable[i]);
    }
  }
  
  for (var i in editable) {
    if (cliente.length > 0) {
      
        const client = cliente.find(x =>  x.rut.replaceAll(".", "") == editable[i].rut.replaceAll(".", ""));
        if (client != undefined) {
            editable[i].empresa = client.nombre;
        } else {
            editable[i].empresa = "";
        }
        rowsWithPower.push(editable[i]);
    }
}
console.log(rowsWithPower);


  const IconOption = props => (
    <Option {...props}>
      <img
        src={require('./' + props.data.icon)}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );



  

  const handeClick = (e) => {
    navigate('/acta/' + e);
  };

  const handeClickMov = (e) => {
    navigate('/movimientos/showPdf/' + e);
  };

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
      title={TitleElement}
      icons={{

        ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAltIcon sx={{ marginTop: 0.6 }} {...props} ref={ref} />),

      }}
      columns={[
        {
          title: 'Fecha Movimiento', field: 'fechaMov', render: x => {

            return x.fechaMov.split("T")[0] + " " + x.fechaMov.split("T")[1].substr(0, 5);

          }
        },
        { title: 'Movimiento ID', field: 'idMovimiento' },
        { title: 'Transporte', field: 'transporte', render: x => x.transporte == "externo" ? "Externo" : "Marco" },
        { title: 'Empresa', field: 'empresa' },
        {
          title: 'Rut Empresa', hidden:true,field: 'rut', render: x => {
            return <><p data-tip={cliente.find(y => y.rut == x.rut).nombre}>{format(x.rut)}
            </p>
              <ReactTooltip /></>
          }
        },
        { title: 'Tipo', field: 'tipo', render: x => x.tipo == "ENVIO" ? "Envio" : "Retiro" },
        { title: 'Cambio', field: 'cambio' },
        {
          title: 'Acta ID', field: 'idInspeccion', render: x => {
            return <> <a data-tip="ver acta" style={{ cursor: 'pointer', width: 30, display: "inline-block" }}
              onClick={() => handeClick(x.idInspeccion)}> {x.idInspeccion} </a>
              <ReactTooltip />
            </>
              ;

          }
        },
        {
          title: 'N° Guia de despacho', field: 'idGuiaDespacho', render: x => {
            return <> <a data-tip="Ver guia de despacho"
              style={{ cursor: 'pointer', width: 30, display: "inline-block" }} onClick={() => handeClickMov(x.idMovimiento)}>
              {x.idGuiaDespacho} </a>
              <ReactTooltip />
            </>
              ;

          }
        },
        {
          title: 'Fecha de retiro', field: 'fechaRetiro', render: x => {
            return x.fechaRetiro != null ? x.fechaRetiro.split("T")[0] : "";
          }
        },
        { title: 'Observaciones', field: 'observaciones' },

      ]}
      data={rowsWithPower}
      onChangeColumnHidden={(column, hidden) => { console.log(column); }}
      options={{
        filtering: true,
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
         
          ExportCsv(cols, editable, 'Movimientos_id_'+params.id.toString())
        
        }},
      ],

        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 50],
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

const MovimientoDetalle = MotionHoc(MovimientoDetalleComponent);
export default MovimientoDetalle;



