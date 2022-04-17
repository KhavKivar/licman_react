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
import { updateClientRut } from '../../features/movimientoSlice';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import isAdmin, { isAdminOrVendedor } from '../../services/utils_role';

const options_normal = [
  { value: 'Clientes', label: 'Clientes' },
  { value: 'Imagenes', label: 'Imagenes' },


]

const options_admin = [
  { value: 'Clientes', label: 'Clientes' },
  { value: 'Imagenes', label: 'Imagenes' },
  { value: 'Usuarios', label: 'Usuarios' },

]

const TablaCliente = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const rows = useSelector((state) => state.cliente.data);

  const editable = rows.map(o => ({ ...o }));

  const [value, setValue] = React.useState('');



  const [openMessage, setOpenMessage] = React.useState({ show: false, error: false, message: '' });

  const updateState = () => {
    setOpenMessage({ show: true, error: false, message: '' });
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
            title: 'RUT Empresa', field: 'rut',
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
              if (isAdminOrVendedor()) {
                axios.post(API.baseURL + "/api/cliente/", {
                  rut: newData.rut.replaceAll(".", ""),
                  nombre: newData.nombre,
                  telefono: newData.telefono
                }).then((response) => {
                  console.log(response.data);
                  if (response.status == 200) {
                    // dispatch(addCliente(newData));
                    resolve();
                  }
                }).catch((error) => {
                  setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                  try {
                    if (error.message == 'Network Error') {
                      setOpenMessage({ error: true, message: "Servidor caido" });
                    } else if (error.request) {
                      if (error.request.response != undefined && error.request.response != null) {
                        const x = JSON.parse(error.request.response);
                        console.log(x.message);
                        if (x.error == true) {
                          setOpenMessage({ show: true, error: true, message: x.message.sqlMessage });
                        }
                      }
                    }
                  } catch (e) {
                    console.log(e);
                    setOpenMessage({ show: true, error: true, message: "Error 505" });
                  }

                  resolve();

                });
              } else {
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                setOpenMessage({ show: true, error: true, message: "No tienes permiso para realizar esta accion" });
                reject();
                //Show mensage
              }


            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              if (isAdminOrVendedor()) {
                axios.patch(API.baseURL + "/api/cliente/id/" + oldData.rut, {
                  rut: newData.rut.replaceAll(".", ""),
                  nombre: newData.nombre,
                  telefono: newData.telefono
                }).then((response) => {
                  console.log(response);
                  if (response.status == 200) {
                    // dispatch(editCliente({ data: newData, oldRut: oldData.rut }));
                    // dispatch(updateClientRut({ oldRut: oldData.rut, newRut: newData.rut }));
                    resolve();
                  }
                }).catch((error) => {
                  setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                  try {
                    if (error.message == 'Network Error') {
                      setOpenMessage({ error: true, message: "Servidor caido" });
                    } else if (error.request) {
                      if (error.request.response != undefined && error.request.response != null) {
                        const x = JSON.parse(error.request.response);
                        if (x.error == true) {
                          setOpenMessage({ show: true, error: true, message: x.message.sqlMessage });
                        }
                      }
                    }
                  } catch (e) {
                    console.log(e);
                    setOpenMessage({ show: true, error: true, message: "Error 505" });
                  }

                  resolve();
                });
              } else {
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                setOpenMessage({ show: true, error: true, message: "No tienes permiso para realizar esta accion" });
                reject();
              }

            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              if (isAdminOrVendedor()) {



                axios.delete(API.baseURL + "/api/cliente/id/" + oldData.rut).then((response) => {
                  console.log(response.data);
                  if (response.status == 200) {
                   // dispatch(removeCliente(oldData));
                    resolve();
                  }
                }).catch((error) => {
                  setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                  if (error.message == 'Network Error') {
                    setOpenMessage({ show: true, error: true, message: "Servidor caido" });
                  }
                  if (error.response.data != null) {
                    setOpenMessage({ show: true, error: true, message: error.response.data.message.sqlMessage });
                  }
                  resolve();
                });
              }
              else {
                setTimeout(() => { setOpenMessage({ show: false, error: false, message: '' }) }, 3000);
                setOpenMessage({ show: true, error: true, message: "No tienes permiso para realizar esta accion" });
                reject();
              }


            });


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
                    sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }}>

                    </PersonIcon> : 
                    
                    e.label == "Imagenes" ?
                    <ImageIcon sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }} ></ImageIcon>

                    :  
                    <AccountBoxIcon sx={{ color: "var(--black) !important", opacity: tabSelect.value == e.label ? 1 : 0.5 }} ></AccountBoxIcon>
                    
                    
                    }


                  <span style={{ marginLeft: 5, color: "var(--black)", opacity: tabSelect.value == e.label ? 1 : 0.5 }}>{e.label}</span>
                </div>
              )}

              value={tabSelect} onChange={handleChange} options={
                
                isAdmin() ? options_admin : options_normal
            } /></div>,
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



