import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import MotionHoc from "../services/motionhoc";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import logo from '../logo.svg';
import Button from '@mui/material/Button';
import axios from "axios";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import API from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../features/loginSlice';

const Column = styled.div`
    display:flex;
    flex-direction: column;
    width: 40vw;
`;
const Divider = styled.div`
margin-top: 5px;
margin-bottom: 5px;
`;


const DividerTop = styled.div`
margin-top: 20px;
margin-bottom: 10px;
`;




const Row = styled.div`
display:flex;
align-items:center;
`;




const CenterHorizontal = styled.div`
display: grid;
height: 100%;
`;
const Center = styled.div`
  margin: auto; 
  padding-bottom: 50px;

`;

const TextTitle = styled.h1`
color:var(--black);
text-align: center;

`;
const TextWarning = styled.div`
    font-size: 1.4rem;
    padding:0.5rem;
    color:red;
`;

const LoginComponent = () => {
    const [values, setValues] = React.useState({
        nombre: '',
        password: '',
        showPassword: false,
    });
    const dispatch = useDispatch();
    const CallApi = (x) => {

        const postData = {
            nombre: values.nombre,
            password: values.password,
        }
        axios.post(API.baseURL + '/api/usuario/login/', JSON.stringify(postData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.status == 200) {
                const response_data = response.data;
                console.log(response.data);
                if (response_data.message == 'Login Success') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('usuario', postData.nombre);
                    document.cookie = "role=" + response_data.role+"; Secure; SameSite=None;";
                    
                    dispatch(setLogin(true));
                } else {
                    seterrorServer({ error: true, message: "Contraseña invalida" });
                    setTimeout(function () {
                        seterrorServer({ error: false, message: "" })
                    }, 2000);
                }

            }
        }).catch((error) => {

            try {
                if (error.message == 'Network Error') {
                    seterrorServer({ error: true, message: "Sin conexion" })
                } else if (error.request) {
                    seterrorServer({ error: true, message: "Usuario invalido" })
                }
            } catch (e) {
                console.log(e);
                seterrorServer({ error: true, message: "Error desconocido" })

            }
            setTimeout(function () {
                seterrorServer({ error: false, message: "" })
            }, 2000);

        });

    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const [errorServer, seterrorServer] = React.useState({ error: false, message: '' });

    return <Box sx={{ backgroundColor: "#EEEEEE", height: '100vh' }}>

        <CenterHorizontal>
            <Center>
                <Column>
                    <DividerTop>
                        <img width="100%" height="100%" src={logo}></img>
                    </DividerTop>
                    <Row>
                        <TextWarning>{errorServer.message}</TextWarning> </Row>
                    <Divider>
                        <TextField fullWidth
                            id="input-with-icon-textfield"
                            label="Nombre de usuario"
                            value={values.nombre}
                            onChange={handleChange('nombre')}
                            error={errorServer.error}

                            variant="outlined"
                        />
                    </Divider>
                    <Divider>
                        <FormControl fullWidth variant="outlined" error={errorServer.error}>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                error={errorServer.error}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Divider>
                    <Divider>
                        <Button onClick={CallApi} fullWidth variant="contained">Iniciar sesion</Button>
                    </Divider>

                </Column>
            </Center>
        </CenterHorizontal>


    </Box>

};


const Login = MotionHoc(LoginComponent);
export default Login;

