import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { motion } from "framer-motion";
import { forwardRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addEquipo, editEquipo } from '../../features/inventarioSlice';
import API from '../../services/api';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';



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
const TextWarning = styled.div`
    font-size: 1.4rem;
    padding:0.5rem;
    color:white;
`;

const RowTextField = styled.div`
display: flex;
flex-direction: row;
gap: 1.5rem;
justify-content: space-between;
flex-wrap: wrap;
`;



const ContainerRegistro = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap:0.7rem;
    padding:1.5rem;
    
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
function formatNumber(number){
    return new Intl.NumberFormat("de-DE").format(number);
}

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
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
            prefix="$"
            thousandSeparator={'.'} decimalSeparator={false}
            allowNegative={false}
            allowLeadingZeros={false}
            isAllowed={(value)=>{
                console.log(value);
                if(value.value>2147483646){
                    return false;
                }
                return true;
            }}
        />
    );
});

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
            thousandSeparator={'.'} decimalSeparator={false}
            allowNegative={false}
            allowLeadingZeros={false}
            isAllowed={(value)=>{
                console.log(value);
                if(value.value>2147483646){
                    return false;
                }
                return true;
            }}
        />
    );
});

const NumberFormatCustomDecimal = forwardRef(function NumberFormatCustom(props, ref) {
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
            thousandSeparator={'.'} decimalSeparator={','}
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={2} 
            isAllowed={(value)=>{
                console.log(value);
                if(value.value>99999999999){
                    return false;
                }
                return true;
            }}
        />
    );
});





export default function Registro() {


    const inventarioList = useSelector((state) => state.inventario.data);




    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();





    const equipo = inventarioList.find(function (post, index) {
        if (post.idEquipo == params.id) {
            return true;
        }
    }
    );

    const delay = ms => new Promise(res => setTimeout(res, ms));



    const enviar = async () => {
        //Activar Errores
        

        if (codigo == null || codigo == '') {
            error.id = { error: true, message: 'Este campo no puede ser vacio' }
        } if (tipo == null || tipo == '') {
            error.tipo = { error: true, message: 'Este campo no puede ser vacio' };
        }
        if (marca == null || marca == '') {
            error.marca = { error: true, message: 'Este campo no puede ser vacio' }

        } if (modelo == null || modelo == '') {
            error.modelo = { error: true, message: 'Este campo no puede ser vacio' }
        } if (serie == null || serie == '') {
            error.serie = { error: true, message: 'Este campo no puede ser vacio' }
        }if(ano < 999){
            error.ano = { error: true, message: 'Año invalido' }
        }
        setError({ ...error })


        for (const x in error) {
            if (error[x].error) {
                return;
            }
        }
        setButtonState({state:"loading"});
        await delay(400);
       
       
       

        const postData = {
            tipo: tipo.id != null ? tipo.id : tipo,
            marca: marca.id != null ? marca.id : marca,
            modelo: modelo.id != null ? modelo.id : modelo,
            serie: serie,
            capacidad: capacidad != '' ? capacidad : '0',
            altura: altura != '' ? altura : '0',
            mastil: mastil.id != null ? mastil.id : mastil != null ? mastil : "",
            ano: ano != '' ? parseInt(ano) : 0,
            horometro: horometro != '' ? parseInt(horometro) : 0,
            precio_neto: precio != '' ? parseInt(precio) : 0,
        };



        if (params.id == null) {
            postData.idEquipo = parseInt(codigo.id);
            axios.post(API.baseURL + '/api/equipo/', JSON.stringify(postData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async(response) => {
                if (response.status == 200) {
                    setButtonState({state:"done"});
                    await delay(800);
                    dispatch(addEquipo(postData));
                    console.log(response.data);
                    navigate('/inventario');
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
        } else {
            axios.patch(API.baseURL + '/api/equipo/id/' + codigo, JSON.stringify(postData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async(response) => {
                if (response.status == 200) {
                    setButtonState({state:"done"});
                    await delay(800);
                    postData.idEquipo = parseInt(params.id);
                    dispatch(editEquipo(postData));
                    navigate('/inventario');
                }
            }).catch((error) => {
                setButtonState({state:"fail"});
                console.log(error.message);
                if (error.message == 'Network Error') {
                    seterrorServer({ error: true, message: "Servidor caido" });
                }
                if (error.response.data != null) {
                    console.log("Entro");
                    seterrorServer({ error: true, message: error.response.data.message.sqlMessage });
                }
            });



        }



    };







    const backFunc = () => {
        navigate('/inventario');
    }



    const filter = createFilterOptions();


    const codigoArray = inventarioList.map(x => x.idEquipo).map(String);

    const codigoOpciones = []

    const tipoArray = [...new Set(inventarioList.map(x => x.tipo))]
    const tipoOpciones = [];

    const marcaArray = [...new Set(inventarioList.map(x => x.marca))]
    const marcaOpciones = []

    const modeloArray = [...new Set(inventarioList.map(x => x.modelo))]
    const modeloOpciones = []


    const serieArray = [...new Set(inventarioList.map(x => x.serie))]
    const serieOpciones = []

    const mastilOpciones = [{ id: "Triple" }, { id: "Doble" }]

    for (const element of codigoArray) {
        codigoOpciones.push({ id: element });
    }

    for (const element of tipoArray) {
        tipoOpciones.push({ id: element });
    }
    for (const element of marcaArray) {
        marcaOpciones.push({ id: element });
    }
    for (const element of modeloArray) {
        modeloOpciones.push({ id: element });
    }
    for (const element of serieArray) {
        serieOpciones.push({ id: element });
    }



    const [codigo, setCodigo] = useState(params.id);

    const [errorServer, seterrorServer] = useState({ error: false, message: '' });

    const [error, setError] = useState({ id: { error: false, message: '' }, tipo: { error: false, message: '' }, marca: { error: false, message: '' }, modelo: { error: false, message: '' }, serie: { error: false, message: '' }
     ,ano: { error: false, message: '' }
    });

    const [tipo, setTipo] = useState(equipo != null ? equipo.tipo : '');
    const [marca, setMarca] = useState(equipo != null ? equipo.marca : '');
    const [modelo, setModelo] = useState(equipo != null ? equipo.modelo : '');
    const [serie, setSerie] = useState(equipo != null ? equipo.serie : '');


    const [capacidad, setCapacidad] = useState(equipo != null ? equipo.capacidad : '');
    const [altura, setAltura] = useState(equipo != null ? equipo.altura : '');
    const [mastil, setMastil] = useState(equipo != null ? equipo.mastil : '');
    const [ano, setAno] = useState(equipo != null ? equipo.ano : '');
    const [horometro, setHorometro] = useState(equipo != null ? equipo.horometro : '');
    const [precio, setPrecio] = useState(equipo != null ? equipo.precio_neto : '');

    const [buttonState,setButtonState] = useState({state:"init"});



    return (
        <motion.div
            initial={{ y: 800 }}
            animate={{
                y: 0,
                transition: { duration: 0.5, type: "spring" },
            }}
            exit    ={{
                y: -500,
                transition: { duration: 0.5, type: "spring", ease: "easeInOut" },
            }}
        >

            <Grid >
                <Paper elevation={3} >
                    <div style={{ float: "left", position: "absolute", marginLeft: "1.5rem", marginTop: "1.4rem" }}>
                        <BackButton onClick={backFunc} variant="contained" startIcon={<ArrowBackIcon />}>
                            Volver
                        </BackButton>
                    </div>
                    <ContainerRegistro>
                        <Text> Registro de equipo</Text>
                        {errorServer.error ? <Card sx={{ backgroundColor: "red", marginBottom: 1 }}
                        >
                            
                        <div style={{display:"flex",alignItems:"center",paddingLeft:5}}> <ReportProblemIcon sx={{color:"white"}}></ReportProblemIcon>   <TextWarning>{errorServer.message}</TextWarning> </div></Card >: <></>}
                        <ColumnSpace>
                            <RowTextField>
                                <ColumnElement>
                                    {params.id == null ? <Autocomplete
                                        value={codigo}
                                        onChange={(event, newValue) => {

                                            var isllchange = false;

                                            if (newValue === null || newValue === '') {
                                                isllchange = true;
                                                setError({ ...error, id: { error: true, message: 'Este campo no puede ser vacio' } })

                                            }
                                            if (!(newValue === null || newValue === '') && (String(newValue.inputValue).match(/^\d+$/) == null && String(newValue).match(/^\d+$/) == null)) {
                                                isllchange = true;
                                                setError({ ...error, id: { error: true, message: 'Este campo solo permite numeros enteros' } })
                                            }
                                            if (!(newValue === null || newValue === '') && codigoOpciones.filter(x => x.id === newValue).length > 0) {
                                                isllchange = true;
                                                setError({ ...error, id: { error: true, message: 'El codigo ya existe' } })
                                            }

                                            if (!isllchange) {
                                                setError({ ...error, id: { error: false, message: '' } });
                                            }


                                            if (typeof newValue === 'string') {
                                                setCodigo({
                                                    id: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                setCodigo({
                                                    id: newValue.inputValue,
                                                });
                                            } else {
                                                setCodigo(newValue);
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
                                        id="codigo"
                                        options={codigoOpciones}
                                        getOptionDisabled={(option) => {

                                            for (const x of codigoOpciones) {
                                                if (x.id === option.id) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        }
                                        }
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
                                            <TextField    {...params} error={error.id.error} label="Numero interno" />
                                        )}
                                    />

                                        : <TextField disabled defaultValue={params.id} label="Numero interno" />
                                    }
                                    {error.id.error && <ErrorDisplay> <span>{error.id.message}</span></ErrorDisplay>}
                                </ColumnElement>
                                <ColumnElement>

                                    <Autocomplete
                                        value={tipo}
                                        onChange={(event, newValue) => {



                                            if (newValue === null || newValue === '') {

                                                setError({ ...error, tipo: { error: true, message: 'Este campo no puede ser vacio' } })
                                            } else {
                                                setError({ ...error, tipo: { error: false, message: '' } });
                                            }


                                            if (typeof newValue === 'string') {
                                                setTipo({
                                                    id: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                setTipo({
                                                    id: newValue.inputValue,
                                                });
                                            } else {
                                                setTipo(newValue);
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
                                        id="tipo"
                                        options={tipoOpciones}

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
                                            <TextField {...params} error={error.tipo.error} label="Tipo" />
                                        )}
                                    />

                                    {error.tipo.error && <ErrorDisplay> <span>{error.tipo.message}</span></ErrorDisplay>}
                                </ColumnElement>
                            </RowTextField>
                            <RowTextField>
                                <ColumnElement>
                                    <Autocomplete
                                        value={marca}
                                        onChange={(event, newValue) => {



                                            if (newValue === null || newValue === '') {
                                                setError({ ...error, marca: { error: true, message: 'Este campo no puede ser vacio' } })
                                            } else {
                                                setError({ ...error, marca: { error: false, message: '' } });
                                            }


                                            if (typeof newValue === 'string') {
                                                setMarca({
                                                    id: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                setMarca({
                                                    id: newValue.inputValue,
                                                });
                                            } else {
                                                setMarca(newValue);
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
                                        id="marca"
                                        options={marcaOpciones}

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
                                            <TextField {...params} error={error.marca.error} label="Marca" />
                                        )}
                                    />

                                    {error.marca.error && <ErrorDisplay> <span>{error.marca.message}</span></ErrorDisplay>}


                                </ColumnElement>
                                <ColumnElement>

                                    <Autocomplete
                                        value={modelo}
                                        onChange={(event, newValue) => {

                                            if (newValue === null || newValue === '') {
                                                setError({ ...error, modelo: { error: true, message: 'Este campo no puede ser vacio' } })
                                            } else {
                                                setError({ ...error, modelo: { error: false, message: '' } });
                                            }


                                            if (typeof newValue === 'string') {
                                                setModelo({
                                                    id: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                setModelo({
                                                    id: newValue.inputValue,
                                                });
                                            } else {
                                                setModelo(newValue);
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
                                        id="modelo"
                                        options={modeloOpciones}

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
                                            <TextField {...params} error={error.modelo.error} label="Modelo" />
                                        )}
                                    />

                                    {error.modelo.error && <ErrorDisplay> <span>{error.modelo.message}</span></ErrorDisplay>}

                                </ColumnElement>



                            </RowTextField>


                            <RowTextField>
                                <ColumnElement>
                                    <TextField fullWidth id="outlined-basic" value={serie} onChange={(event) => {
                                        if (event.target.value == null || event.target.value == '') {
                                            setError({ ...error, serie: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, serie: { error: false, message: '' } });
                                        }
                                        setSerie(event.target.value)
                                    }}
                                        label="Serie" variant="outlined" error={error.serie.error} />

                                    {error.serie.error && <ErrorDisplay> <span>{error.serie.message}</span></ErrorDisplay>}

                                </ColumnElement>
                                <ColumnElement>
                                    <Autocomplete
                                        value={mastil}
                                        onChange={(event, newValue) => {

                                            if (typeof newValue === 'string') {
                                                setMastil({
                                                    id: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                setMastil({
                                                    id: newValue.inputValue,
                                                });
                                            } else {
                                                setMastil(newValue);
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
                                        id="mastil"
                                        options={mastilOpciones}

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
                                            <TextField {...params} label="Mastil" />
                                        )}
                                    />

                                </ColumnElement>
                            </RowTextField>
                            <RowTextField>
                                <ColumnElement>
                                    <TextField fullWidth id="outlined-basic"
                                        onChange={(event) => { 
                                          
                                            setAltura(event.target.value)
                                        }}
                                        value={altura}
                                        type="text"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">mm</InputAdornment>,
                                            inputComponent: NumberFormatCustomDecimal,
                                            
                                        }}
                                        
                                        label="Altura" variant="outlined" />

                                </ColumnElement>
                                <ColumnElement>
                                    <TextField value={capacidad} fullWidth
                                        onChange={(event) => {
                                            setCapacidad(event.target.value)
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                            inputComponent: NumberFormatCustomWithoutPrefix,
                                        }}
                                        id="outlined-basic"
                                        label="Capacidad" variant="outlined" />

                                </ColumnElement>

                            </RowTextField>

                            <RowTextField>
                                <ColumnElement>

                                    <TextField fullWidth value={horometro}
                                        label="Horometro"
                                        id="formatted-numberformat-input"
                                        variant="outlined"
                                        onChange={(event) => {
                                            setHorometro(event.target.value)
                                        }}
                                        InputProps={{
                                            inputComponent: NumberFormatCustomWithoutPrefix,
                                        }} />
                                </ColumnElement>
                                <ColumnElement>
                                    <TextField value={ano}
                                    error={error.ano.error}
                                    onChange={(event) => {
                                        const newValue=event.target.value;
                                         if (newValue<999) {
                                            setError({ ...error, ano: { error: true, message: 'Año invalido' } })
                                        } else {
                                            setError({ ...error, ano: { error: false, message: '' } });
                                        }

                                        
                                        if(event.target.value.length < 5){
                                            setAno(event.target.value);
                                        }
                                       
                                    }} fullWidth id="outlined-basic"
                                        label="Año" variant="outlined" />
                                   {error.ano.error && <ErrorDisplay> <span>{error.ano.message}</span></ErrorDisplay>}      
                                </ColumnElement>

                            </RowTextField>

                            <TextField
                                value={precio}
                                onChange={(event) => {
                                    setPrecio(event.target.value)
                                }}
                                label="Precio neto"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined"

                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}

                            />
                        </ColumnSpace>
                       
                      { buttonState.state=='init'?  <ButtonSend size='large' 
                      onClick={enviar} variant="contained" endIcon={<SendIcon></SendIcon>} >Enviar</ButtonSend>:
                            buttonState.state == 'loading'?
                            <ButtonLoading variant ="contained"
                            startIcon={<CircularProgress sx={{color:"var(--black)"}}
                           size={20  } />}    >Cargando...</ButtonLoading>
                            :  buttonState.state =='done' ?
                             <ButtonSuccess size='large'  variant="contained" startIcon ={<CheckIcon></CheckIcon>}> Enviado </ButtonSuccess>:
                             <ButtonError size='large' onClick={enviar}   variant="contained" startIcon ={<DangerousIcon></DangerousIcon>}> Error</ButtonError>
                      }
                    </ContainerRegistro>

                </Paper>
            </Grid>
        </motion.div>
    );


}

/*   <ButtonLoading variant ="contained"
                              startIcon={<CircularProgress sx={{color:"var(--black)"}}
                             size={20  } />}    >Cargando...</ButtonLoading>:
                             <ButtonSucess startIcon ={CheckIcon}> Success.. </ButtonSucess>*/
