import MaterialTable from '@material-table/core';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { addModelo, editModelo, removeModelo } from '../../features/modeloSlice';
import API from '../../services/api';
import ApiObjectCall from '../../services/callServices';
import AddBox from '@mui/icons-material/AddBox';
import { forwardRef } from 'react';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { setInventarioValue, setSettingValue } from '../../features/generalStateSlice';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Assignment from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';


const options = [
    { value: 'Clientes', label: 'Clientes' },
    { value: 'Imagenes', label: 'Imagenes' },
  
  ]



const TablaImg = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rows = useSelector((state) => state.modelo.data);

    const inventario = useSelector((state) => state.inventario.data);
    const modelList = []
    for (var i in inventario) {
        if (!rows.some(x => x.modelo == inventario[i].modelo) && !modelList.some(x => x.value == inventario[i].modelo)) {
            modelList.push(
                { value: inventario[i].modelo, label: inventario[i].modelo }
            );
        }

    }


    const editable = rows.map(o => ({ ...o }));
    const [openMessage, setOpenMessage] = React.useState(false);
    const updateState = () => {
        setOpenMessage(true);
        ApiObjectCall(dispatch);
        setTimeout(() => { setOpenMessage(false) }, 3000);
    }
    const handleChange = (e) => {
        dispatch(setSettingValue(e));
    
      }
      const tabSelect = useSelector((state) => state.generalState.settingValue);


    return (
        <>
            <MaterialTable
                title="Lista de imagenes"
                icons={{
                    Add: forwardRef((props, ref) => <AddBox sx={{ marginBottom: 1 }}{...props} ref={ref} />),
                    ViewColumn: forwardRef((props, ref) => <ViewColumnIcon sx={{ marginTop: 0.6 }}   {...props} ref={ref} />),
                }}
                columns={[
                    {
                        title: 'Modelo', field: 'modelo', editable: "onAdd",
                        editComponent: ({ value, onChange }) => (
                            <Select
                                options={modelList}
                                name="modelo opciones"
                                onChange={(selectedOption) => onChange(selectedOption.value)}
                                value={value ? value.value : value}
                                placeholder="Seleccione un modelo"
                            />
                        )

                    },
                    {
                        title: 'URL Imagen', field: 'url', render: (x) => {

                            return <a href={x.url} target="_blank">Link </a>
                        }
                    },


                ]}
                data={editable}

                editable={{
                    onRowAdd: (newData) => {
                        return new Promise((resolve, reject) => {

                            axios.post(API.baseURL + "/api/modelo/", newData).then((response) => {

                                console.log(response.data);
                            });
                            dispatch(addModelo(newData));
                            resolve();
                        });
                    },
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve, reject) => {
                            axios.patch(API.baseURL + "/api/modelo/id/" + oldData.modelo, {
                                url: newData.url

                            }).then((response) => {

                                console.log(response.data);
                            });
                            dispatch(editModelo(newData));
                            resolve();
                        });
                    },
                    onRowDelete: (oldData) => {
                        return new Promise((resolve, reject) => {
                            axios.delete(API.baseURL + "/api/modelo/id/" + oldData.modelo).then((response) => {

                                console.log(response.data);
                            });
                            dispatch(removeModelo(oldData));
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
                 
                    actionsColumnIndex: -1,
                }}
                actions={[
              
                
                    {
                        icon: () => <div style={{ width: 250, height: 45, margin: "auto",marginLeft:10 }} > <Select
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


            {openMessage && <div style={{ position: "absolute", right: "80px", bottom: "0px", paddingBottom: 20 }}>
                <Alert severity="success">
                    <AlertTitle>Exito</AlertTitle>
                    Se han actualizado las variables — <strong>con exito!</strong>

                </Alert>
            </div>}</>
    );
}

export default TablaImg;



