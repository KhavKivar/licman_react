import MaterialTable from '@material-table/core';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import axios from "axios";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'rut.js';
import { addCliente, editCliente, removeCliente } from '../../features/clienteSlice';
import API from '../../services/api';
import ApiObjectCall from '../../services/callServices';
import AddBox from '@mui/icons-material/AddBox';
import { forwardRef } from 'react';
import Select from 'react-select';
import { setInventarioValue, setSettingValue } from '../../features/generalStateSlice';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Assignment from '@mui/icons-material/Assignment';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';

const options = [
  { value: 'Clientes', label: 'Clientes' },
  { value: 'Imagenes', label: 'Imagenes' },

]

const TablaCliente = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const rows = useSelector((state) => state.cliente.data);

  const editable = rows.map(o => ({ ...o }));

  const [value, setValue] = React.useState('');



  const [openMessage, setOpenMessage] = React.useState({ show: false, error: false, message: '' });

  const updateState = () => {
    setOpenMessage({show:true,error:false,message:''});
    ApiObjectCall(dispatch);
    setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
  }


  const tabSelect = useSelector((state) => state.generalState.settingValue);


  const handleChange = (e) => {
    dispatch(setSettingValue(e));

  }



  return (
    <>
      <MaterialTable

        title="Lista de clientes"
        icons={{
          Add: forwardRef((props, ref) => <AddBox sx={{ marginBottom: 1 }}{...props} ref={ref} />),
          ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />)
        }}

        columns={[
          {
            title: 'RUT Empresa', field: 'rut', editable: "onAdd",
            editComponent: ({ value, onChange }) => (
              <TextField key="random1" value={value} autoFocus="autoFocus" fullWidth id="standard-basic" placeholder="Rut" variant="standard"
                onChange={(x) => {
                  if (x.target.value.length < 13) {
                    onChange(format(x.target.value));
                  }
                }
                }

              />
            )
            ,
            render: x => {
              return format(x.rut);
            }
          },
          { title: 'Nombre Empresa', field: 'nombre' },
          { title: 'Numero telefonico', field: 'telefono' },


        ]}
        data={editable}
        editable={{
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              axios.post(API.baseURL + "/api/cliente/", {
                rut: newData.rut.replaceAll(".", ""),
                nombre: newData.nombre,
                telefono: newData.telefono
              }).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                  dispatch(addCliente(newData));
                  resolve();
                }
              }).catch((error)=>{
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                if (error.message == 'Network Error') {
                  setOpenMessage({  show: true, error: true, message: "Servidor caido" });
                }
                if (error.response.data != null) {
                  setOpenMessage({  show: true,error: true, message: error.response.data.message.sqlMessage });
                }
                resolve();
              });

            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              axios.patch(API.baseURL + "/api/cliente/id/" + oldData.rut, {
                nombre: newData.nombre,
                telefono: newData.telefono
              }).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                  dispatch(editCliente(newData));
                  resolve();
                }
              }).catch((error)=>{
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                if (error.message == 'Network Error') {
                  setOpenMessage({  show: true, error: true, message: "Servidor caido" });
                }
                if (error.response.data != null) {
                  setOpenMessage({  show: true,error: true, message: error.response.data.message.sqlMessage });
                }
                resolve();
              });

            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
               
              axios.delete(API.baseURL + "/api/cliente/id/" + oldData.rut).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                  dispatch(removeCliente(oldData));
                  resolve();
                }
              }).catch((error) => {
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                if (error.message == 'Network Error') {
                  setOpenMessage({  show: true, error: true, message: "Servidor caido" });
                }
                if (error.response.data != null) {
                  setOpenMessage({  show: true,error: true, message: error.response.data.message.sqlMessage });
                }
                resolve();
              });


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

          actionsColumnIndex: -1,




        }}

        actions={[



          {
            icon: () => <div style={{ width: 250, height: 45, margin: "auto", marginLeft: 10 }} > <Select
              getOptionLabel={e => (

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {e.label == "Clientes" ? <PersonIcon
                    sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }}></PersonIcon> : <ImageIcon sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }} ></ImageIcon>}
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
            icon: () => <div style={{ paddingBottom: 5 }}><ReplayIcon sx={{ color: "white" }}></ReplayIcon></div>,
            tooltip: 'Actualizar',
            isFreeAction: true,
            onClick: (event, rowData) => {
              updateState();
            }
          }



        ]}

      >


      </MaterialTable>


      {openMessage.show == true ? openMessage.error ?
        <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {openMessage.message}
          </Alert>
        </div>

        :
        <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
          <Alert severity="success">
            <AlertTitle>Exito</AlertTitle>
            Se han actualizado las variables — <strong>con exito!</strong>

          </Alert>
        </div>
        : <></>}
    </>
  );
}

export default TablaCliente;



