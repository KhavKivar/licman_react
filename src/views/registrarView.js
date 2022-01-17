import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import InputAdornment from '@mui/material/InputAdornment';

import { forwardRef, useState } from 'react';
import axios from "axios";


import { useNavigate } from 'react-router-dom';

import NumberFormat from 'react-number-format';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import API from '../services/api'

import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux'


import { addEquipo } from '../features/inventarioSlice'


const ButtonSend = styled(Button)`
    && {
        
        background-color: var(--black);
        color: white;
        :hover{
            background-color: var(--black);
        }
    }
`;
const Text = styled.div`
    font-size: 2.5rem;
    text-align: center;
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
    gap:2rem;
    padding:1.5rem;
    padding-bottom: 3rem;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    max-height: 80vh;
 
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
 width: 48%;
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
        />
    );
});





export default function Registro() {


    const inventarioList = useSelector((state) => state.inventario.data);




    const navigate = useNavigate();
    const dispatch = useDispatch();






    const enviar = () => {
        //Activar Errores
       
        if(codigo == null){
            error.id = { error: true, message: 'Este campo no puede ser vacio' }
        }if(tipo == null){
            error.tipo =  { error: true, message: 'Este campo no puede ser vacio' };
        }
        if(marca ==null){
            error.marca = { error: true, message: 'Este campo no puede ser vacio' }
            
        }if(modelo ==null){
            error.modelo = { error: true, message: 'Este campo no puede ser vacio' }
        }if(serie == null){
            error.serie = { error: true, message: 'Este campo no puede ser vacio' }
        }
        setError({ ...error })
        console.log({ ...error});

        for(const x in error){
            if(error[x].error){
                return;
            } 
        }

       
        
        const postData = {
            id:  parseInt(codigo.id),
            tipo: tipo.id,
            marca: marca.id,
            modelo: modelo.id,
            serie: serie.id,
            capacidad: capacidad,
            altura: altura,
            mastil: mastil,
            ano: parseInt(ano),
            horometro: parseInt(horometro),
            precio_neto: parseInt(precio),
        };

        console.log(postData);


        dispatch(addEquipo(postData));
        

        
        axios.post(API.baseURL + '/api/equipo/', JSON.stringify(postData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data);
        });
        navigate('/inventario');
        
    };



  



    const backFunc = () => {
        navigate('/inventario');
    }

    const filter = createFilterOptions();

    const codigoArray = inventarioList.map(x => x.id).map(String);
    const codigoOpciones = []

    const tipoArray = [...new Set(inventarioList.map(x => x.tipo))]
    const tipoOpciones = [];

    const marcaArray = [...new Set(inventarioList.map(x => x.marca))]
    const marcaOpciones = []

    const modeloArray = [...new Set(inventarioList.map(x => x.modelo))]
    const modeloOpciones = []


    const serieArray = [...new Set(inventarioList.map(x => x.serie))]
    const serieOpciones = []



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



    const [codigo, setCodigo] = useState(null);
    const [error, setError] = useState({ id: { error: false, message: '' }, tipo: { error: false, message: '' }, marca: { error: false, message: '' }, modelo: { error: false, message: '' }, serie: { error: false, message: '' } });

    const [tipo, setTipo] = useState(null);
    const [marca, setMarca] = useState(null);
    const [modelo, setModelo] = useState(null);
    const [serie, setSerie] = useState(null);


    const [capacidad, setCapacidad] = useState('');
    const [altura, setAltura] = useState('');
    const [mastil, setMastil] = useState('');
    const [ano, setAno] = useState('');
    const [horometro, setHorometro] = useState('');
    const [precio, setPrecio] = useState('');


    return (
        <motion.div
        initial={{ y: 800 }}
        animate={{
          y: 0,
          transition: { duration: 0.5, type: "spring" },
        }}
        exit={{
          y: -500,
          transition: { duration: 0.5, type: "spring", ease: "easeInOut" },
        }}
      >

        <Grid >
            <Paper elevation={3} >
                <div style={{ float: "left", position: "absolute", margin: "0.9rem" }}>
                    <BackButton onClick={backFunc} variant="contained" startIcon={<ArrowBackIcon />}>
                        Volver
                    </BackButton>
                </div>
                <ContainerRegistro>
                    <Text> Registro</Text>
                    <ColumnSpace>
                        <RowTextField>
                            <ColumnElement>
                                <Autocomplete
                                    value={codigo}
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                        var isllchange = false;

                                        if (newValue === null || newValue === '') {
                                            isllchange = true;
                                            setError({ ...error, id: { error: true, message: 'Este campo no puede ser vacio' } })
                                            console.log({ ...error, id: { error: true, message: 'Este campo no puede ser vacio' } });
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

                                        console.log(error);
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
                                        <TextField {...params} error={error.id.error} label="Codigo" />
                                    )}
                                />

                                {error.id.error && <ErrorDisplay> <span>{error.id.message}</span></ErrorDisplay>}

                            </ColumnElement>
                            <ColumnElement>

                                <Autocomplete
                                    value={tipo}
                                    onChange={(event, newValue) => {
                                        console.log(newValue);


                                        if (newValue === null || newValue === '') {

                                            setError({ ...error, tipo: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, tipo: { error: false, message: '' } });
                                        }

                                        console.log(error);
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
                                        console.log(newValue);


                                        if (newValue === null || newValue === '') {
                                            setError({ ...error, marca: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, marca: { error: false, message: '' } });
                                        }

                                        console.log(error);
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
                                        console.log(newValue);
                                        if (newValue === null || newValue === '') {
                                            setError({ ...error, modelo: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, modelo: { error: false, message: '' } });
                                        }

                                        console.log(error);
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
                                <Autocomplete
                                    value={serie}
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                        if (newValue === null || newValue === '') {
                                            setError({ ...error, serie: { error: true, message: 'Este campo no puede ser vacio' } })
                                        } else {
                                            setError({ ...error, serie: { error: false, message: '' } });
                                        }

                                        console.log(error);
                                        if (typeof newValue === 'string') {
                                            setSerie({
                                                id: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            setSerie({
                                                id: newValue.inputValue,
                                            });
                                        } else {
                                            setSerie(newValue);
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
                                    options={serieOpciones}

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
                                        <TextField {...params} error={error.serie.error} label="Serie" />
                                    )}
                                />

                                {error.serie.error && <ErrorDisplay> <span>{error.serie.message}</span></ErrorDisplay>}

                            </ColumnElement>
                            <ColumnElement>
                                <TextField fullWidth id="outlined-basic" value={mastil} onChange={(event) => {
                                    setMastil(event.target.value)
                                }}
                                    label="Mastil" variant="outlined" />
                            </ColumnElement>
                        </RowTextField>
                        <RowTextField>
                            <ColumnElement>
                                <TextField fullWidth id="outlined-basic"
                                    onChange={(event) => {
                                        setAltura(event.target.value)
                                    }}
                                    value={altura}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">m</InputAdornment>,
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
                                        inputComponent: NumberFormatCustomDecimal,
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
                                <TextField value={ano} onChange={(event) => {
                                    setAno(event.target.value)
                                }} fullWidth id="outlined-basic"
                                    label="Año" variant="outlined" />
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
                    <ButtonSend size='large' onClick={enviar} variant="contained" endIcon={<SendIcon />} >Enviar</ButtonSend>
                </ContainerRegistro>

            </Paper>
        </Grid>
        </motion.div>
    );

}

/*

   <form >
                        <ColumnSpace>
                            <RowTextField>
                                <ColumnElement>
                                    <Controller
                                        name="id"
                                        control={control}
                                        rules={{
                                            required: true,
                                            pattern: {
                                                value: /^\d+$/,
                                            },
                                            validate:(value)=>{
                                                return !codigoOpciones.includes(value) 
                                            },
                                        }}

                                        render={({ field, fieldState }) =>
                                            <Autocomplete
                                                {...field}
                                                freeSolo
                                                value = {codigo}
                                                handleHomeEndKeys
                                                clearOnBlur
                                                selectOnFocus
                                                options={codigoOpciones}
                                                onChange={(event, newValue) => {
                                                   if(newValue != null && newValue.includes("Añadir")){
                                                        console.log(newValue);
                                                        setCodigo( newValue.replace("Añadir ", ""));

                                                   }else{
                                                    setCodigo( newValue);
                                                   }
                                                  }}
                                                filterOptions={(options, params) => {
                                                const filtered = filter(options , params);
                                        
                                                const { inputValue } = params;
                                                // Suggest the creation of a new value
                                                const isExisting = options.some((option) => inputValue === option);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push(
                                                         "Añadir "+inputValue,
                                                    );
                                                }
                                        
                                                return filtered;
                                                }}

                                                getOptionDisabled={(option) =>
                                                    codigoOpciones.includes(option)
                                                }
                                               
                                                renderInput={(params) => <TextField     {...params} error={!!fieldState.error}
                                                    label="Codigo" />}
                                               
                                            />

                                        }
                                    />

                                    {errors.id && errors.id.type === "required" && <ErrorDisplay> <span>Este campo no puede ser vacio</span></ErrorDisplay>}
                                    {errors.id && errors.id.type === "pattern" && <ErrorDisplay> <span>Este campo solo permite numeros enteros</span></ErrorDisplay>}

                                    {errors.id && errors.id.type === "validate" && <ErrorDisplay> <span>EL codigo ya existe</span></ErrorDisplay>}
                                </ColumnElement>
                                <ColumnElement>
                                    <Controller
                                        name="tipo"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) =>
                                            <Autocomplete
                                                {...field}
                                                freeSolo
                                                options={tipoOpciones}
                                                renderInput={(params) => <TextField     {...params} error={!!fieldState.error}
                                                    label="Tipo" />}
                                                onChange={(_, data) => field.onChange(data)}
                                            />

                                        }
                                    />



                                </ColumnElement>
                            </RowTextField>
                            <RowTextField>

                                <ColumnElement>
                                    <Controller
                                        name="marca"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) =>
                                            <Autocomplete
                                                {...field}
                                                freeSolo
                                                options={marcaOpciones}
                                                renderInput={(params) => <TextField     {...params} error={!!fieldState.error}
                                                    label="Marca" />}
                                                onChange={(_, data) => field.onChange(data)}
                                            />

                                        }
                                    />

                                    {errors.marca && errors.marca.type === "required" && <ErrorDisplay> <span>Este campo no puede ser vacio</span></ErrorDisplay>}
                                </ColumnElement>

                                <ColumnElement>

                                    <Controller
                                        name="modelo"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) =>
                                            <Autocomplete
                                                {...field}
                                                freeSolo
                                                options={modeloOpciones}
                                                renderInput={(params) => <TextField     {...params} error={!!fieldState.error}
                                                    label="Modelo" />}
                                                onChange={(_, data) => field.onChange(data)}
                                            />

                                        }
                                    />


                                    {errors.modelo && errors.modelo.type === "required" && <ErrorDisplay> <span>Este campo no puede ser vacio</span></ErrorDisplay>}
                                </ColumnElement>
                            </RowTextField>

                            <RowTextField>

                                <ColumnElement>
                                    <Controller
                                        name="serie"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) =>
                                            <Autocomplete
                                                {...field}
                                                freeSolo
                                                options={serieOpciones}
                                                renderInput={(params) => <TextField     {...params} error={!!fieldState.error}
                                                    label="Serie" />}
                                                onChange={(_, data) => field.onChange(data)}
                                            />

                                        }
                                    />
                                    {errors.serie && errors.serie.type === "required" && <ErrorDisplay> <span>Este campo no puede ser vacio</span></ErrorDisplay>}
                                </ColumnElement>

                                <ColumnElement>
                                    <Controller
                                        name="capacidad"
                                        control={control}
                                        rules={{

                                        }}
                                        render={({ field }) =>
                                            <TextField fullWidth

                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                                    inputComponent: NumberFormatCustomDecimal,
                                                }}

                                                id="outlined-basic"
                                                label="Capacidad" variant="outlined" {...field} />
                                        }
                                    />

                                </ColumnElement>
                            </RowTextField>

                            <RowTextField>
                                <ColumnElement>
                                    <Controller
                                        name="altura"
                                        control={control}
                                        rules={{

                                        }}
                                        render={({ field }) =>
                                            <TextField fullWidth id="outlined-basic"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">m</InputAdornment>,
                                                    inputComponent: NumberFormatCustomDecimal,
                                                }}
                                                label="Altura" variant="outlined" {...field} />
                                        }
                                    />

                                </ColumnElement>

                                <ColumnElement>
                                    <Controller
                                        name="mastil"
                                        control={control}
                                        rules={{}}
                                        render={({ field }) =>
                                            <TextField fullWidth id="outlined-basic"



                                                label="Mastil" variant="outlined" {...field} />
                                        }


                                    />
                                </ColumnElement>
                            </RowTextField>


                            <RowTextField>
                                <ColumnElement>
                                    <Controller
                                        name="horometro"
                                        control={control}
                                        rules={{

                                        }}
                                        render={({ field }) =>
                                            <TextField fullWidth
                                                label="Horometro" variant="outlined"
                                                id="formatted-numberformat-input"
                                                variant="outlined"

                                                InputProps={{
                                                    inputComponent: NumberFormatCustomWithoutPrefix,
                                                }} {...field} />
                                        }
                                    />

                                </ColumnElement>
                                <ColumnElement>
                                    <Controller
                                        name="ano"
                                        control={control}
                                        rules={{

                                            pattern: {
                                                value: /^\d+$/,

                                            }

                                        }}
                                        render={({ field }) =>
                                            <TextField fullWidth id="outlined-basic"
                                                label="Año" variant="outlined" {...field} />
                                        }
                                    />
                                    {errors.ano && errors.ano.type === "pattern" && <ErrorDisplay> <span>Este campo solo permite numeros enteros</span></ErrorDisplay>}
                                </ColumnElement>
                            </RowTextField>



                            <Controller

                                name="precio_neto"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^\d+$/,

                                    }

                                }}

                                render={({ field }) =>
                                    <TextField
                                        label="Precio neto"
                                        name="numberformat"
                                        id="formatted-numberformat-input"
                                        variant="outlined"
                                        {...field}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}

                                    />
                                }
                            />




                        </ColumnSpace>

                    </form>


*/