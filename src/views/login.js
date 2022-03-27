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
margin-bottom: 20px;
`;



const PaddindBottom = styled.div`

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

const LoginComponent = () => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

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
    return <Box sx={{ backgroundColor: "#EEEEEE",  height: '100vh' }}>

        <CenterHorizontal>
            <Center>
                <Column>
                    <DividerTop>
                        <img width="100%" height="100%" src={logo}></img>
                    </DividerTop>
                    <Divider>
                        <TextField fullWidth
                            id="input-with-icon-textfield"
                            label="Nombre de usuario"

                            variant="outlined"
                        />
                    </Divider>
                    <Divider>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
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
                        <Button fullWidth variant="contained">Iniciar sesion</Button>
                    </Divider>
                    <PaddindBottom></PaddindBottom>
                </Column>
            </Center>
        </CenterHorizontal>


    </Box>

};


const Login = MotionHoc(LoginComponent);
export default Login;

