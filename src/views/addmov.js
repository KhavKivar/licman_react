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
import esLocale from "date-fns/locale/es";
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
import { cleanInput, setActa, setActaList, setCambio, setCodigo, setFechaTermino, setGuiaDespacho, setObv, setRut, setRutInputValue, setSelectFile, setTipo, setTransporte } from '../features/movRegisterSlice';
import API from '../services/api';
import MotionHoc from "../services/motionhoc";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Card from '@mui/material/Card';









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
flex-wrap: wrap;
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
    const [buttonState,setButtonState] = useState({state:"init"});
    const [errorServer, seterrorServer] = useState({ error: false, message: '' });

    const handleFileInput = (e) => {
        if (e.target.files[0] == null || e.target.files[0] == '') {
            setError({ ...error, file: { error: true, message: 'Este campo no puede ser vacio' } })
        } else {
            setError({ ...error, file: { error: false, message: '' } });
        }

        dispatch(setSelectFile(e.target.files[0]));

    }

    const OpcionesRut = [];
    const idListEquipo = [];
    const idListActa = [];

    for (const cliente in clienteList) {
        OpcionesRut.push({ id: format(clienteList[cliente].rut, { dots: false }) })
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
        file: { error: false, message: '' }
    });

    const selectedFile = useSelector((state) => state.movRegister.selectedFile);

    const transporte = useSelector((state) => state.movRegister.transporte);
    const tipo = useSelector((state) => state.movRegister.tipo);
    const cambio = useSelector((state) => state.movRegister.cambio);
    const fechaTermino = useSelector((state) => state.movRegister.fechaTermino);

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
        dispatch(setFechaTermino(newValue));
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





        setError({ ...error });
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(newName); 
        //Create
        const rut_input =  rut.id != null ? rut.id : rut;
        const objCliente = {
            rut:rut_input,
            nombre:newName,
            telefono:telefono
        }
        axios.post(API.baseURL + "/api/cliente/",objCliente ).then((response) => {
            if(response.status==200){
                console.log(response.data);
                sendLogic();
                dispatch(addCliente(objCliente));
            }
           
        });

       
     
    };

    function sendObjEdit(obj) {
        axios.patch(API.baseURL + '/api/movimiento/id/' + params.id, JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response)  => {
            if(response.status == 200){
                setButtonState({state:"done"});
                await delay(800);
                dispatch(editMovimiento(response.data));
                dispatch(cleanInput());
                navigate("/movimientos");
                console.log(response.data);
            }
           
        }).catch(async(error) => {
            setButtonState({state:"fail"});
            console.log(error.message);
            if (error.message == 'Network Error') {
                seterrorServer({ error: true, message: "Servidor caido" });
            }
            if (error.response.data != null) {
                seterrorServer({ error: true, message: error.response.data.message.sqlMessage });
            }
        });
    }
     function sendObj(obj) {
        axios.post(API.baseURL + '/api/movimiento/', JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async(response) => {
            if(response.status ==200){
                setButtonState({state:"done"});
                await delay(800);
                dispatch(addMovimiento(response.data));
                dispatch(cleanInput());
                navigate("/movimientos");
                console.log(response.data);
            }
        }).catch((error) => {
                setButtonState({state:"fail"});
                console.log(error.message);
                if (error.message == 'Network Error') {
                    seterrorServer({ error: true, message: "Servidor caido" });
                }
                if (error.response.data != null) {
                    seterrorServer({ error: true, message: error.response.data.message.sqlMessage });
                }
            });

    }
    const sendLogic = () => {
        var re = /(?:\.([^.]+))?$/;


        const movimientoObject = {
            transporte: transporte == 10 ? "Marco" : "Externo",
            idInspeccion: acta.label,
            rut: rut.id != null ? rut.id : rut,
            idGuiaDespacho: guiaDespacho,
            cambio: cambio != "" ? cambio : null,
            tipo: tipo == 10 ? "ENVIO" : "RETIRO",
            observaciones: obv,
            fechaRetiro: fechaTermino != "" && fechaTermino != 'Invalid date' && fechaTermino != null ? moment(fechaTermino).format('YYYY-MM-DD') : null
        }

        if (selectedFile != null) {
            const key = uuidv4() + "." + re.exec(selectedFile.name)[1];
            const url = "https://licman.s3.amazonaws.com/" + key.toString();
            uploadFile(selectedFile, key);
            movimientoObject.urlGuiaDespacho = url;
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

        //check if rut exist
        const rutCh = rut.id != null ? rut.id : rut;
        setButtonState({state:"loading"});
        await delay(400);

        if (OpcionesRut.find(x => x.id == rutCh) == undefined) {
            handleClickOpen();
        } else {

            sendLogic();
        }

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
                            
                        <div style={{display:"flex",alignItems:"center",paddingLeft:5}}> <ReportProblemIcon sx={{color:"white"}}></ReportProblemIcon> 
                          <TextWarning>{errorServer.message}</TextWarning> </div></Card >: <></>}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Rut empresa"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                El rut ingresado no existe el la base de datos. Por lo tanto, es necesario
                                que ingrese el nombre de la empresa asociado al rut.

                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre empresa"
                                value={newName}
                                onChange={handleNewName}
                                fullWidth
                                variant="standard"
                            />
                                 <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Telefono"
                                value={telefono}
                                onChange={handleTelefono}
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} autoFocus>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                                    value={rut}
                                    inputValue={inputRut}
                                    onInputChange={(event, value) => {


                                        if (value.length < 11) {
                                            if (value.length > 7) {
                                                dispatch(setRutInputValue(
                                                    format(value, { dots: false }),
                                                ));
                                            } else {
                                                dispatch(setRutInputValue(
                                                    clean(value)
                                                ));
                                            }
                                        }


                                    }}
                                    onChange={(event, newValue) => {

                                        //InputValue
                                        //id
                                        //newValue
                                        if (newValue == null || newValue == '') {
                                            setError({ ...error, rut: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, rut: { error: false, message: '' } });
                                        }


                                        if (typeof newValue === 'string') {
                                            console.log("1");
                                            if (!validate(newValue)) {
                                                setError({ ...error, rut: { error: true, message: 'rut invalido' } })
                                            }
                                            dispatch(setRut({
                                                id: newValue,
                                            }));

                                        } else if (newValue && newValue.inputValue) {
                                            console.log("2");
                                            if (!validate(newValue.inputValue)) {
                                                setError({ ...error, rut: { error: true, message: 'rut invalido' } })
                                            }
                                            dispatch(setRut({
                                                id: newValue.inputValue,
                                            }));


                                        } else {
                                            console.log("3");
                                            if (!validate(newValue.id)) {
                                                setError({ ...error, rut: { error: true, message: 'Rut invalido' } })
                                            }
                                            dispatch(setRut(newValue));

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
                                    id="rut"
                                    options={OpcionesRut}
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

                                        <TextField {...params} error={error.rut.error} label="Rut Empresa"


                                        />
                                    )}
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
                                <TextField
                                    value={cambio}
                                    onChange={(e) => {

                                        dispatch(setCambio(e.target.value));
                                    }}
                                    InputProps={{

                                        inputComponent: NumberFormatCustomWithoutPrefix,
                                    }}

                                    id="outlined-basic" label="Cambio" variant="outlined" />
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
                                        dispatch(setActa(newValue));
                                    }}
                                    value={acta}
                                    options={actaListState}


                                    getOptionDisabled={(option) => {

                                        for (const x of movList) {

                                            if (x.idInspeccion.toString() == option.label) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    }

                                    renderInput={(params) => <TextField {...params}
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
                                <ThemeProvider theme={themeWithLocale}>
                                    <LocalizationProvider locale={esLocale} dateAdapter={AdapterDateFns}>
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

                            <ColumnElement>
                                <TextField
                                    value={obv}
                                    onChange={(e) => dispatch(setObv(e.target.value))}
                                    id="outlined-basic" label="Observaciones" variant="outlined" />
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


                    </ColumnSpace>
                            
                    { buttonState.state=='init'?  <ButtonSend size='large' 
                      onClick={Enviar} variant="contained" endIcon={<SendIcon></SendIcon>} >Enviar</ButtonSend>:
                            buttonState.state == 'loading'?
                            <ButtonLoading variant ="contained"
                            startIcon={<CircularProgress sx={{color:"var(--black)"}}
                           size={20  } />}    >Cargando...</ButtonLoading>
                            :  buttonState.state =='done' ?
                             <ButtonSuccess size='large'  variant="contained" startIcon ={<CheckIcon></CheckIcon>}> Enviado </ButtonSuccess>:
                             <ButtonError size='large' onClick={Enviar}   variant="contained" startIcon ={<DangerousIcon></DangerousIcon>}> Error</ButtonError>
                      }
                   
                </ContainerRegistro>
            </Paper>
        </Grid>

    );
};



const AddMov = MotionHoc(AddMovComponent);
export default AddMov;