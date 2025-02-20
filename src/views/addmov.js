import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import * as locales from '@mui/material/locale';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AWS from 'aws-sdk';
import axios from "axios";

import moment from 'moment';
import { forwardRef, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clean, format, validate } from 'rut.js';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { addCliente } from '../features/clienteSlice';
import { addMovimiento, editMovimiento } from '../features/movimientoSlice';
import { cleanInput, setActa, setActaList, setFechaMovimiento, setCambio, setCodigo, setFechaTermino, setGuiaDespacho, setObv, setRut, setRutInputValue, setSelectFile, setTipo, setTransporte } from '../features/movRegisterSlice';
import API from '../services/api';
import MotionHoc from "../services/motionhoc";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Card from '@mui/material/Card';
import { updateEstado } from '../features/inventarioSlice';
import esLocale from 'date-fns/locale/es';



const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})




const ButtonSend = styled(Button)`
    && {
        
        background-color: var(--black);
        color: white;
        :hover{
            background-color: var(--black);
        }
    }
`;

const ButtonLoading = styled(Button)`
    && {
        
        background-color: #e0e0e0;
        color: var(--black);
        :hover{
            background-color:#e0e0e0;
        }
    }
`;

const ButtonSuccess = styled(Button)`
    && {
        
        background-color: #4CAF50;
        color: white;
        :hover{
            background-color:#4CAF50;
        }
    }
`;


const ButtonError = styled(Button)`
    && {
        
        background-color: #FF5252;
        color: white;
        :hover{
            background-color:#FF5252;
        }
    }
`;


const Text = styled.div`
    font-size: 2rem;
    text-align: center;
`;

const RowTextField = styled.div`
display: flex;
flex-direction: row;
gap: 1.5rem;
justify-content: space-between;

`;
const TextWarning = styled.div`
    font-size: 1.4rem;
    padding:0.5rem;
    color:white;
`;




const ContainerRegistro = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap:1.5rem;
    padding:1.5rem;
    padding-bottom:2.5rem;
    margin-left: auto;
    margin-right: auto;

`;


const ColumnSpace = styled.div`
  
    flex-direction: column;
     display: flex;
     gap: 1rem;
`;

const ColumnElement = styled.div`
flex-direction: column;
 display: flex;
 gap: 1rem;
 width: 49%;
`;

const ColumnFullElement = styled.div`
flex-direction: column;
 display: flex;
 gap: 1rem;
 width: 100%;
`;

const ErrorDisplay = styled.div`
        ::before{
            content: "⚠ ";
        }
        color: #ff0000;   
`;

const BackButton = styled(Button)`
&& {

    background-color: var(--black);
    color: white;
    :hover{
        background-color:  var(--black);
    }
}
`;


const Container = styled.div`
border-style:dashed;
border-radius:5px;
border-color: ${(props) => (props.showError ? "red" : "rgb(23, 105, 170)")};


height:55px;
border-width:0.1rem;
width:100%;
padding:5px;

`;
const Row = styled.div`
position:relative;
height:inherative;

display:flex;
gap:0.3rem;
align-items:center;
`;
const TextFile = styled.div`
color:grey;
font-size:1.15rem;
`;

const Input = styled.input`
position:absolute;
width:100%;
height:53px;
cursor:pointer;
opacity:0;  
overflow:hidden;
`;

const InputEdit = styled.input`
position:absolute;
width:100%;
height:53px;
cursor:pointer;
opacity:0;  
overflow:hidden;
display:none;
`;

const TextVertical = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
`;
const NumberFormatCustomWithoutPrefix = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}

            isNumericString

            thousandSeparator={' '} decimalSeparator={false}
            allowNegative={false}
            allowLeadingZeros={false}
        />
    );
});

function obvToEstado(x) {
    let estado = 'DISPONIBLE';
    let ubicacion = 'Taller';
    switch (x) {
        case 'Venta':
            estado = 'VENDIDO';
            ubicacion = '-';
            break;
        case 'Nuevo Arriendo':
            estado = 'ARRENDADO';
            ubicacion = 'Actualizar';
            break;
        case 'Termino Arriendo':
            estado = 'DISPONIBLE';
            ubicacion = 'Taller';
            break;
        case 'Despacho Por Cambio':
            estado = 'ARRENDADO';
            ubicacion = 'Actualizar';
            break;
        case 'Despacho Por Reparacion':
            estado = 'ARRENDADO';
            ubicacion = 'Actualizar';
            break;
        case 'Retiro Por Cambio':
            estado = 'DISPONIBLE';
            ubicacion = 'Taller';
            break;
        case 'Retiro Por Reparacion':
            estado = 'DISPONIBLE';
            ubicacion = 'Taller';
            break;
        default:
            estado = 'NO UPDATE';
            break;
    }
    return [estado, ubicacion];
}


const AddMovComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const filter = createFilterOptions();
    const [value, setValue] = useState(null);
    var edit = false;
    if (params.id != null) {
        edit = true;
    }

    const [locale, setLocale] = useState('esES');

    const theme = useTheme();

    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );

    const clienteList = useSelector((state) => state.cliente.data);
    const equipoList = useSelector((state) => state.inventario.data);
    const movList = useSelector((state) => state.movimiento.data);
    const actaList = useSelector((state) => state.acta.data);


    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [openInput, setopenInput] = useState(false);
    const [buttonState, setButtonState] = useState({ state: "init" });
    const [errorServer, seterrorServer] = useState({ error: false, message: '' });

    const handleFileInput = (e) => {
        if (e.target.files[0] == null || e.target.files[0] == '') {
            setError({ ...error, file: { error: true, message: 'Este campo no puede ser vacio' } })
        } else {
            setError({ ...error, file: { error: false, message: '' } });
        }

        dispatch(setSelectFile(e.target.files[0]));

    }


    const idListEquipo = [];
    const idListActa = [];
    const OpcionesEmpresas = [];


    for (const cliente in clienteList) {
        OpcionesEmpresas.push(clienteList[cliente].nombre);
    }



    for (const id in equipoList) {
        idListEquipo.push(equipoList[id].idEquipo.toString())
    }




    const backFunc = () => {
        navigate('/movimientos');
    }



    const [error, setError] = useState({
        transporte: { error: false, message: '' }, tipo: { error: false, message: '' },
        rut: { error: false, message: '' }, codigo: { error: false, message: '' },
        cambio: { error: false, message: '' }, acta: { error: false, message: '' },
        fechaTermino: { error: false, message: '' }, observaciones: { error: false, message: '' },

        guiaDespacho: { error: false, message: '' },
        file: { error: false, message: '' },
        fechaMovimiento: { error: false, message: '' },
    });

    const selectedFile = useSelector((state) => state.movRegister.selectedFile);

    const transporte = useSelector((state) => state.movRegister.transporte);
    const tipo = useSelector((state) => state.movRegister.tipo);
    const cambio = useSelector((state) => state.movRegister.cambio);
    const fechaAux = useSelector((state) => state.movRegister.fechaTermino);

    const fechaMovimiento = useSelector((state) => state.movRegister.fechaMovimiento);


    const fechaTermino = fechaAux == null ? null : fechaAux;
    console.log(fechaMovimiento);

    const guiaDespacho = useSelector((state) => state.movRegister.guiaDespacho);
    const obv = useSelector((state) => state.movRegister.obv);
    const rut = useSelector((state) => state.movRegister.rut);
    const inputRut = useSelector((state) => state.movRegister.rutInputValue);

    const codigo = useSelector((state) => state.movRegister.codigo);
    const acta = useSelector((state) => state.movRegister.acta);
    const actaListState = useSelector((state) => state.movRegister.actaList);
    const [newName, setNewName] = useState('');

    const [telefono, setTelefono] = useState('');

    const handleNewName = (e) => {
        setNewName(e.target.value);
    }
    const handleTelefono = (e) => {
        setTelefono(e.target.value);
    }


    const handleChangeTransporte = (event) => {
        if (event.target.value == null || event.target.value == '') {
            setError({ ...error, transporte: { error: true, message: 'Este campo no puede ser vacio' } })
        } else {
            setError({ ...error, transporte: { error: false, message: '' } });
        }

        dispatch(setTransporte(event.target.value));

    };
    const handleChangeTipo = (event) => {
        if (event.target.value == null || event.target.value == '') {
            setError({ ...error, tipo: { error: true, message: 'Este campo no puede ser vacio' } })
        } else {
            setError({ ...error, tipo: { error: false, message: '' } });
        }

        dispatch(setTipo(event.target.value));

    };


    const handleChangeFecha = (newValue) => {

        if (newValue == "Invalid Date") {
            setError({ ...error, fechaTermino: { error: true, message: 'Fecha invalida' } })
        } else {
            setError({ ...error, fechaTermino: { error: false, message: '' } });
        }
        if (newValue == null) {
            dispatch(setFechaTermino(null));
        } else {
            dispatch(setFechaTermino(newValue.toString()));
        }

    };

    const handleChangeFechaMovimiento = (newValue) => {
        console.log(newValue);

        if (newValue == "Invalid Date" || newValue == null || newValue == '') {
            setError({ ...error, fechaMovimiento: { error: true, message: 'Fecha invalida' } })
        } else {
            setError({ ...error, fechaMovimiento: { error: false, message: '' } });
        }
        if (newValue == null) {
            dispatch(setFechaMovimiento(null));
        } else {
            dispatch(setFechaMovimiento(newValue.toString()));
        }

    };


    const uploadFile = (file, name) => {




        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {

            })
            .send((err) => {
                if (err) console.log(err)
            })

    }
    const handleErrors = () => {

        if (transporte == null || transporte == '') {
            error.transporte = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (tipo == null || tipo == '') {
            error.tipo = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (rut == null || rut == '') {
            error.rut = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (codigo == null || codigo == '') {
            error.codigo = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (acta == null || acta == '') {
            error.acta = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (guiaDespacho == null || guiaDespacho == '') {

            error.guiaDespacho = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (selectedFile == null || selectedFile == '') {
            if (!edit)
                error.file = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (fechaTermino == "Invalid Date") {
            error.fechaTermino = { error: true, message: 'Fecha invalida' };
        }
        if (fechaMovimiento == "Invalid Date" || fechaMovimiento == '' || fechaMovimiento == null) {
            error.fechaMovimiento = { error: true, message: 'Fecha invalida' };
        }

        if (obv == null || obv == '') {
            error.observaciones = { error: true, message: 'Este campo no puede ser vacio' };
        }






        setError({ ...error });
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const sendObjEdit = (obj) => {
        axios.patch(API.baseURL + '/api/movimiento/id/' + params.id, JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {

            if (response.status == 200) {
                setButtonState({ state: "done" });
                await delay(800);
                // dispatch(editMovimiento(response.data));
                // const [newEstado, newUbicacion] = obvToEstado(obj.observaciones);
                // if (newEstado != "NO UPDATE") {
                //     const acta = actaList.find(element => element.idInspeccion == obj.idInspeccion);
                //     if (acta != undefined) {
                //         dispatch(updateEstado({ idEquipo: acta.idEquipo, estado: newEstado, ubicacion: newUbicacion }));
                //     }
                // }
                dispatch(cleanInput());
                navigate("/movimientos");
            }

        }).catch(async (error) => {
            setButtonState({ state: "edicion" });
            console.log(error)

            if (error.message == 'Network Error') {
                seterrorServer({ error: true, message: "Servidor caido" });
            } else if (error.request) {
                if (error.request.response != undefined && error.request.response != null) {
                    const x = JSON.parse(error.request.response);
                    if (x.error == true) {
                        seterrorServer({ error: true, message: x.message.sqlMessage });
                    }
                }
            }
        });
    }

    function sendObj(obj) {
        axios.post(API.baseURL + '/api/movimiento/', JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.status == 200) {
                setButtonState({ state: "done" });
                await delay(800);

                // dispatch(addMovimiento(response.data));
                // const [newEstado, newUbicacion] = obvToEstado(obj.observaciones);
                // if (newEstado != "NO UPDATE") {
                //     const acta = actaList.find(element => element.idInspeccion == obj.idInspeccion);
                //     if (acta != undefined) {
                //         dispatch(updateEstado({ idEquipo: acta.idEquipo, estado: newEstado, ubicacion: newUbicacion }));
                //     }
                // }
                dispatch(cleanInput());
                navigate("/movimientos");

            }
        }).catch((error) => {
            setButtonState({ state: "fail" });

            try {
                if (error.message == 'Network Error') {
                    seterrorServer({ error: true, message: "Servidor caido" });
                } else if (error.request) {
                    if (error.request.response != undefined && error.request.response != null) {
                        const x = JSON.parse(error.request.response);
                        if (x.error == true) {
                            seterrorServer({ error: true, message: x.message.sqlMessage });
                        }
                    }
                }
            } catch (e) {
                console.log(e);
                seterrorServer({ error: true, message: "Error 505" });
            }

        });

    }
    const sendLogic = () => {
        var re = /(?:\.([^.]+))?$/;

        //Get rut;
        const index_cliente = clienteList.findIndex(x => x.nombre == rut);
        let realRut = "1111111-1";

        if (index_cliente != -1) {
            realRut = clienteList[index_cliente].rut;
        }



        const movimientoObject = {
            transporte: transporte == 10 ? "Marco" : "Externo",
            idInspeccion: acta.label,
            rut: realRut.replaceAll(".", ""),
            idGuiaDespacho: guiaDespacho,
            cambio: cambio == null ? null : !isNaN(parseInt(cambio.id)) ? parseInt(cambio.id) : !isNaN(parseInt(cambio)) ? parseInt(cambio) : null,
            tipo: tipo == 10 ? "ENVIO" : "RETIRO",
            observaciones: obv.id != null ? obv.id : obv,
            fechaRetiro: fechaTermino != "" && fechaTermino != 'Invalid date' && fechaTermino != null ? moment(fechaTermino).format('YYYY-MM-DD') : null,
            fechaMov: fechaMovimiento != "" && fechaMovimiento != 'Invalid date' && fechaMovimiento != null ? moment(fechaMovimiento).format('YYYY-MM-DD') : null,

        }
        console.log(movimientoObject);

        if (selectedFile != null) {
            const key = uuidv4() + "." + re.exec(selectedFile.name)[1];
            const url = "https://licman.s3.amazonaws.com/" + key.toString();
            movimientoObject.urlGuiaDespacho = url;
            const params = {
                ACL: 'public-read',
                Body: selectedFile,
                Bucket: S3_BUCKET,
                Key: key
            };

            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {

                })
                .send((err, data) => {

                    if (err) {
                        console.log(err);
                    }
                });
        }
        if (edit) {
            sendObjEdit(movimientoObject);
        } else {
            sendObj(movimientoObject);

        }

    }
    const Enviar = async () => {
        handleErrors();

        for (const x in error) {
            if (error[x].error) {
                return;
            }
        }
        setButtonState({ state: "loading" });
        await delay(400);
        sendLogic();


    };






    const fileTypes = ["pdf"];


    return (

        <Grid >
            <Paper elevation={3} >
                <div style={{ float: "left", position: "absolute", marginLeft: "1.5rem", marginTop: "1.4rem" }}>
                    <BackButton onClick={backFunc} variant="contained" startIcon={<ArrowBackIcon />}>
                        Volver
                    </BackButton>
                </div>
                <ContainerRegistro>
                    <Text> {edit ? "Edicion de movimiento" : "Registro de movimiento"}</Text>
                    {errorServer.error ? <Card sx={{ backgroundColor: "red", marginBottom: 1 }}
                    >

                        <div style={{ display: "flex", alignItems: "center", paddingLeft: 5 }}>
                            <ReportProblemIcon sx={{ color: "white" }}></ReportProblemIcon>
                            <TextWarning>{errorServer.message}</TextWarning> </div></Card > : <></>}
                  

                    <ColumnSpace>
                        <RowTextField>
                            <ColumnElement>
                                <FormControl fullWidth error={error.transporte.error}>
                                    <InputLabel >Transporte</InputLabel>
                                    <Select
                                        labelId="transporte-id"
                                        id="transporte"
                                        value={transporte}
                                        label="Transporte"
                                        onChange={handleChangeTransporte}
                                        error={error.transporte.error}
                                    >
                                        <MenuItem value={10}>Marco</MenuItem>
                                        <MenuItem value={20}>Externo</MenuItem>

                                    </Select>
                                </FormControl>

                                {error.transporte.error && <ErrorDisplay> <span>{error.transporte.message}</span></ErrorDisplay>}
                            </ColumnElement>
                            <ColumnElement>
                                <FormControl fullWidth error={error.tipo.error}>
                                    <InputLabel >Tipo</InputLabel>
                                    <Select
                                        labelId="transporte-id"
                                        id="transporte"
                                        value={tipo}
                                        label="Tipo"
                                        onChange={handleChangeTipo}
                                        error={error.tipo.error}
                                    >
                                        <MenuItem value={10}>Envio</MenuItem>
                                        <MenuItem value={20}>Retiro</MenuItem>

                                    </Select>
                                </FormControl>
                                {error.tipo.error && <ErrorDisplay> <span>{error.tipo.message}</span></ErrorDisplay>}
                            </ColumnElement>
                        </RowTextField>
                        <RowTextField>
                            <ColumnElement>
                                <Autocomplete
                                    disablePortal
                                    onChange={(event, newValue) => {
                                        if (newValue == null || newValue == '') {
                                            setError({ ...error, rut: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, rut: { error: false, message: '' } });
                                        }
                                        dispatch(setRut(newValue));
                                    }
                                    }
                                    value={rut}
                                    options={OpcionesEmpresas}
                                    renderInput={(params) => <TextField {...params} error={error.rut.error} label="Nombre empresa" />}
                                />

                                {error.rut.error && <ErrorDisplay> <span>{error.rut.message}</span></ErrorDisplay>}
                            </ColumnElement>
                            <ColumnElement>

                                <Autocomplete
                                    disablePortal
                                    onChange={(event, newValue) => {

                                        if (newValue == null || newValue == '') {
                                            setError({ ...error, codigo: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, codigo: { error: false, message: '' } });
                                        }

                                        const select = [];
                                        dispatch(setActa(''));

                                        for (const x in actaList) {
                                            if (actaList[x].idEquipo == newValue) {

                                                select.push({ label: actaList[x].idInspeccion.toString() })
                                            }
                                        }
                                        console.log(select);
                                        dispatch(setActaList(select));

                                        dispatch(setCodigo(newValue));

                                    }

                                    }
                                    value={codigo}
                                    options={idListEquipo}
                                    renderInput={(params) => <TextField {...params} error={error.codigo.error} label="Codigo interno" />}
                                />
                                {error.codigo.error && <ErrorDisplay> <span>{error.codigo.message}</span></ErrorDisplay>}
                            </ColumnElement>


                        </RowTextField>
                        <RowTextField>
                            <ColumnElement>

                                <Autocomplete
                                    disablePortal
                                    onChange={(event, newValue) => {
                                        dispatch(setCambio(newValue));
                                    }
                                    }
                                    value={cambio}
                                    options={idListEquipo}
                                    renderInput={(params) => <TextField {...params} label="Cambio" />}
                                />

                            </ColumnElement>
                            <ColumnElement>
                                <Autocomplete
                                    sx={{ color: "black" }}
                                    disablePortal
                                    disableClearable
                                    forcePopupIcon={false}
                                    onChange={(event, newValue, reason) => {

                                        if (newValue == null || newValue == '') {
                                            setError({ ...error, acta: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, acta: { error: false, message: '' } });
                                        }
                                        /*
                                       for(const x of movList){
                                           console.log(newValue.label);
                                           if(x.idInspeccion == newValue.label  && x.tipo == 'ENVIO' && tipo == 20 ){
                                               dispatch(setRut(x.rut));
                                               dispatch(setTransporte( x.transporte == "marco" ? 10:20));
                                              
                                               dispatch(setCambio(x.cambio));
                                              dispatch(setFechaTermino(x.fechaTermino));
                                              dispatch(setObv(x.observaciones));
                                              dispatch(setGuiaDespacho(x.idGuiaDespacho));
                                           }
                                           
                                       }*/
                                        dispatch(setActa(newValue));
                                    }}
                                    value={acta}
                                    options={actaListState}
                                    getOptionDisabled={(option) => {
                                        let contador = 0;
                                        for (const x of movList) {
                                            if (x.idInspeccion.toString() == option.label) {
                                                return true;

                                            }
                                        }
                                        return false;
                                    }
                                    }

                                    renderInput={(params) => <TextField  {...params}
                                        InputProps={{


                                            ...params.InputProps,
                                            endAdornment: <IconButton onClick={
                                                () => {
                                                    console.log(acta);
                                                    if (acta != '') {
                                                        navigate("/acta/" + acta.label);
                                                    }

                                                }

                                            }><VisibilityIcon></VisibilityIcon></IconButton>,
                                        }}
                                        error={error.acta.error}
                                        label="Acta ID" />}

                                    clearIcon={<VisibilityIcon />}
                                />
                                {error.acta.error && <ErrorDisplay> <span>{error.acta.message}</span></ErrorDisplay>}
                            </ColumnElement>
                        </RowTextField>
                        <RowTextField>
                            <ColumnElement>
                              
                                    <LocalizationProvider dateAdapter={AdapterDateFns }  locale={esLocale} >
                                        <DesktopDatePicker
                                       
                                            value={fechaMovimiento}

                                            label="Fecha Movimiento"
                                            inputFormat="dd/MM/yyyy"

                                            onChange={handleChangeFechaMovimiento}
                                            renderInput={(params) => <TextField
                                                {...params} error={error.fechaMovimiento.error} />}
                                        />

                                    </LocalizationProvider>
                          
                                {error.fechaMovimiento.error && <ErrorDisplay> <span>{error.fechaMovimiento.message}</span></ErrorDisplay>}
                            </ColumnElement>
                            <ColumnElement>
                                <ThemeProvider theme={themeWithLocale}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                                        <DesktopDatePicker
                                            value={fechaTermino}

                                            label="Fecha de termino"
                                            inputFormat="dd/MM/yyyy"

                                            onChange={handleChangeFecha}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>
                                </ThemeProvider>
                                {error.fechaTermino.error && <ErrorDisplay> <span>{error.fechaTermino.message}</span></ErrorDisplay>}
                            </ColumnElement>

                        </RowTextField>





                        <RowTextField>
                            <ColumnElement>
                                <TextField

                                    value={guiaDespacho}
                                    error={error.guiaDespacho.error}
                                    onChange={(e) => {
                                        if (e.target.value == null || e.target.value == '') {
                                            setError({ ...error, guiaDespacho: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, guiaDespacho: { error: false, message: '' } });
                                        }
                                        dispatch(setGuiaDespacho(e.target.value));

                                    }
                                    }
                                    InputProps={{

                                        inputComponent: NumberFormatCustomWithoutPrefix,
                                    }}
                                    id="guia-despacho" label="N° Guia de despacho" variant="outlined" />

                                {error.guiaDespacho.error && <ErrorDisplay> <span>{error.guiaDespacho.message}</span></ErrorDisplay>}


                            </ColumnElement>
                            <ColumnElement>
                                {edit ? <Container showError={error.file.error}>

                                    <Row>
                                        <div >
                                            <AddPhotoAlternateOutlinedIcon sx={{ color: "rgb(23, 105, 170)", textAlign: "center", height: "32px", width: "32px" }}></AddPhotoAlternateOutlinedIcon>
                                        </div>
                                        <TextVertical> {openInput ?
                                            selectedFile != null ?
                                                <TextFile> {selectedFile.name}
                                                </TextFile> :
                                                <TextFile> Seleccione o arrastre la guia de despacho</TextFile>

                                            : "Guia de despacho.pdf"}</TextVertical>

                                        {openInput ?
                                            <Input type="file" onChange={handleFileInput}>
                                            </Input> :
                                            <>
                                                <InputEdit type="file" onChange={handleFileInput}>
                                                </InputEdit>
                                                <IconButton onClick={() => setopenInput(true)} color="primary" aria-label="upload picture" component="span">
                                                    <ClearIcon sx={{ color: "black" }} />
                                                </IconButton>
                                            </>
                                        }

                                    </Row>
                                </Container> : <label htmlFor="file">
                                    <Container showError={error.file.error}>

                                        <Row>
                                            <div >
                                                <AddPhotoAlternateOutlinedIcon sx={{ color: "rgb(23, 105, 170)", textAlign: "center", height: "32px", width: "32px" }}></AddPhotoAlternateOutlinedIcon>
                                            </div>
                                            <TextVertical>{selectedFile != null ? <TextFile> {selectedFile.name}  </TextFile> : <TextFile> Seleccione o arrastre la guia de despacho</TextFile>}</TextVertical>

                                            <Input type="file" onChange={handleFileInput}>


                                            </Input>
                                        </Row>
                                    </Container>
                                </label>}

                                {error.file.error && <ErrorDisplay> <span>{error.file.message}</span></ErrorDisplay>}

                            </ColumnElement>

                        </RowTextField>


                        <RowTextField>
                            <ColumnFullElement>
                                <Autocomplete
                                    value={obv}

                                    onChange={(event, newValue) => {
                                        if (newValue == null || newValue == '') {
                                            setError({ ...error, observaciones: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, observaciones: { error: false, message: '' } });
                                        }


                                        if (typeof newValue === 'string') {
                                            dispatch(setObv({
                                                id: newValue,
                                            }));

                                        } else if (newValue && newValue.inputValue) {
                                            dispatch(setObv({
                                                id: newValue.inputValue,
                                            }));
                                        } else {

                                            dispatch(setObv(newValue));

                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;
                                        const isExisting = options.some((option) => inputValue === option.id);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                id: `Añadir ${inputValue}`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="Observaciones"
                                    options={[{ id: 'Venta' }, { id: 'Termino Arriendo' },
                                    { id: 'Nuevo Arriendo' }, { id: 'Despacho Por Cambio' }, { id: 'Retiro Por Cambio' },
                                    { id: 'Retiro Por Reparacion' },

                                    { id: 'Despacho Por Reparacion' },
                                    ]}
                                    getOptionLabel={(option) => {

                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        // Regular option
                                        return option.id;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.id}</li>}

                                    freeSolo
                                    renderInput={(params) => (

                                        <TextField  {...params} error={error.observaciones.error} label="Observaciones"


                                        />
                                    )}
                                />
                                {error.observaciones.error && <ErrorDisplay> <span>{error.observaciones.message}</span></ErrorDisplay>}

                            </ColumnFullElement>

                        </RowTextField>


                    </ColumnSpace>

                    {buttonState.state == 'init' ? <ButtonSend size='large'
                        onClick={Enviar} variant="contained" endIcon={<SendIcon></SendIcon>} >Enviar</ButtonSend> :
                        buttonState.state == 'loading' ?
                            <ButtonLoading variant="contained"
                                startIcon={<CircularProgress sx={{ color: "var(--black)" }}
                                    size={20} />}    >Cargando...</ButtonLoading>
                            : buttonState.state == 'done' ?
                                <ButtonSuccess size='large' variant="contained" startIcon={<CheckIcon></CheckIcon>}> Enviado </ButtonSuccess> :
                                <ButtonError size='large' onClick={Enviar} variant="contained" startIcon={<DangerousIcon></DangerousIcon>}> Error</ButtonError>
                    }

                </ContainerRegistro>
            </Paper>
        </Grid>

    );
};



const AddMov = MotionHoc(AddMovComponent);
export default AddMov;