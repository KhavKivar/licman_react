import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BiotechIcon from '@mui/icons-material/Biotech';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SpeedIcon from '@mui/icons-material/Speed';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { format } from 'rut.js';
import MotionHoc from "../services/motionhoc";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';

import excelExport from './excelActa';


const EndObject = styled.div`
display:flex;
justify-content:end;

`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: 0.5, paddingLeft: 3, paddingRight: 3, paddingBottom: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const ActaComponent = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate();

    const params = useParams();
    const actaList = useSelector((state) => state.acta.data);

    const acta = actaList.find((x) => x.idInspeccion == params.id);

    const downloadExcel = () => {

        excelExport(acta);
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'distancia.xlsx');
        // document.body.appendChild(link);
        // link.click();    
    }


    const handleChange = (event, newValue) => {
        if (newValue == 0) {
            console.log(newValue);
            navigate(-1);
        } else {


            setValue(newValue);
        }
    };

    const handleChangeIndex = (index) => {

        setValue(index);
    };
    const generateRow = (key, value, initial, param, obj) => {
        return (
            <>        <ListItem sx={{ key: key }} disablePadding>
                <ListItemText primary={key} />
                {param != undefined && <>Cantidad: {param} </>}
                {obj != undefined && <>{obj[0]} {obj[1]} </>}
                <FormControl component="fieldset" >
                    <FormGroup aria-label="position" row>

                        <FormControlLabel

                            value="top"
                            control={<Checkbox disableRipple={true} checked={value == 'bueno' ? true : false} />}
                            label={initial ? "Bueno" : ""}
                            labelPlacement="top"
                            sx={{ color: initial ? "black" : "white", paddingRight: initial ? 0 : 2 }}
                        />
                        <FormControlLabel

                            value="top"
                            control={<Checkbox disableRipple={true} checked={value == 'regular' ? true : false} />}
                            label={initial ? "Regular  " : ""}
                            labelPlacement="top"
                            sx={{ color: initial ? "black" : "white", paddingRight: initial ? 0 : 1.3 }}
                        />
                        <FormControlLabel

                            value="top"
                            control={<Checkbox disableRipple={true} checked={value == 'malo' ? true : false} />}
                            label={initial ? "Malo  " : ""}
                            labelPlacement="top"
                            sx={{ color: initial ? "black" : "white" }}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
                <Divider></Divider> </>
        );
    }
    const generatedItemList = (index) => {

        var itemMap;
        var newFieldsMap;
        var itemSpecial = {
            'Espejos': acta.cantidadEspejos,
            'Focos faeneros delanteros':
                acta.cantidadFocosFaenerosDelanteros,
            'Focos faeneros traseros':
                acta.cantidadFocosFaenerosTraseros,
            'LLave de contacto': acta.cantidadLlaveContacto,
            'Intermitentes delanteros':
                acta.cantidadIntermitentesDelanteros,
            'Intermitentes traseros':
                acta.cantidadIntermitentesTraseros,
            'Ruedas': acta.cantidadRueda,
        };

        if (acta.tipo == "acta_equipo") {
            newFieldsMap = {
                "Carro y su respaldo de carga": ["Respaldo de carga: ", acta.carga == 1 ? "SI" : "NO"],
                "Arnes de cilindro de gas": ["Cilindro de gas: ", acta.cilindroDeGas == 1 ? "SI" : "NO"],

            };
            itemMap = {
                1: {
                    "Alarma de retroceso": acta.alarmaRetroceso,
                    "Asiento operador": acta.asientoOperador,
                    "Baliza": acta.baliza,
                    'Bocina': acta.bocina,
                    'Extintor': acta.extintor,
                    'Espejos': acta.espejos,
                    'Focos faeneros delanteros':
                        acta.focosFaenerosDelanteros,
                    "Focos faeneros traseros":
                        acta.focosFaenerosTraseros,
                    "LLave de contacto":
                        acta.llaveContacto,
                    "Intermitentes delanteros":
                        acta.intermitentesDelanteros,
                    "Intermitentes traseros":
                        acta.intermitentesTraseros,
                    "Palanca freno mano":
                        acta.palancaFrenoMano,
                    "Pera de volante": acta.peraVolante,
                    "Arnes de cilindro de gas":
                        acta.arnesCilindroGas,
                    "Tablero instrumentos":
                        acta.tableroIntrumentos,
                },
                2: {
                    "Cilindro desplazador":
                        acta.cilindroDesplazador,
                    "Cilindro direccion":
                        acta.cilindroDireccion,
                    "Cilindro levante central":
                        acta.cilindroLevanteCentral,
                    "Cilindro inclinacion":
                        acta.cilindroInclinacion,
                    "Cilindro levante laterales":
                        acta.cilindroLevanteLateral,
                    "Flexibles hidraulicas":
                        acta.flexibleHidraulico,
                    "Fuga por conectores y mangueras":
                        acta.fugaConectores,
                },
                3: {
                    "Alternador": acta.alternador,
                    "Bateria": acta.bateria,
                    "Chapa de contacto":
                        acta.chapaContacto,
                    "Sistema electrico":
                        acta.sistemaElectrico,
                    "Horometro": acta.horometro,
                    "Motor de partida": acta.motorPartida,
                    "Palanca comandos":
                        acta.palancaComando,
                    "Switch de luces": acta.switchLuces,
                    "Switch de marchas":
                        acta.switchMarcha,
                },
                4: {
                    "Cadenas": acta.cadena,
                    "Carro y su respaldo de carga":
                        acta.carro,
                    "Horquillas y seguros":
                        acta.horquilla,
                    "Jaula de proteccion": acta.jaula,
                    "LLantas": acta.llantas,
                    "Mastil": acta.mastil,
                    "Pintura": acta.pintura,
                    "Ruedas": acta.rueda,
                },
                5: {
                    "Desplazador lateral":
                        acta.desplazadorLateral,
                    "Direccion": acta.direccion,
                    "Freno mano": acta.frenoMano,
                    "Freno pie": acta.frenoPie,
                    "Inclinacion": acta.inclinacion,
                    "Levante": acta.levante,
                    "Motor": acta.motor,
                    "Nivel aceite hidraulico":
                        acta.nivelAceiteHidraulico,
                    "Nivel aceite motor":
                        acta.nivelAceiteMotor,
                    "Nivel aceite transmision":
                        acta.nivelAceiteTransmision,
                    "Nivel liquido de freno":
                        acta.nivelLiquinoFreno,
                    "Tapa combustible":
                        acta.tapaCombustible,
                    "Tapa radiador": acta.tapaRadiador,
                    "Transmision": acta.transmision,
                }
            }
        } else {
            newFieldsMap = {
                "Carro y su respaldo de carga": ["Respaldo de carga: ", acta.carga == 1 ? "Si" : "NO"],
                "Serie cargador": ["Serie: ", acta.serieCargardorText],
                "Bateria": ["Observaciones: ", acta.bateriaObservaciones],
                "Cargador voltaje y amperaje": ["Voltaje: ", acta.cargadorVoltajeInfo + "V"],
                "Enchufes": ["Tipo enchufe: ", acta.enchufeInfo.split("-")[0] + "V " + "polo " + acta.enchufeInfo.split("-")[1]],
            };

            itemMap = {
                1: {
                    'Alarma retroceso':
                        acta.alarmaRetroceso,
                    'Asiento operdor':
                        acta.asientoOperador,
                    'Baliza': acta.baliza,
                    'Bocina': acta.bocina,
                    'Extintor': acta.extintor,
                    'Espejos': acta.espejos,
                    'Focos faeneros delanteros':
                        acta.focosFaenerosDelanteros,
                    "Focos faeneros traseros":
                        acta.focosFaenerosTraseros,
                    "LLave de contacto":
                        acta.llaveContacto,
                    "Intermitentes delanteros":
                        acta.intermitentesDelanteros,
                    "Intermitentes traseros":
                        acta.intermitentesTraseros,
                    "Palanca freno mano":
                        acta.palancaFrenoMano,
                    "Pera de volante": acta.peraVolante,

                    "Tablero instrumentos":
                        acta.tableroIntrumentos,
                },
                2: {
                    "Cilindro desplazador":
                        acta.cilindroDesplazador,
                    "Cilindro direccion cadena":
                        acta.cilindroDireccion,
                    "Cilindro levante central":
                        acta.cilindroLevanteCentral,
                    "Cilindro inclinacion":
                        acta.cilindroInclinacion,
                    "Cilindro levante laterales":
                        acta.cilindroLevanteLateral,
                    "Flexibles hidraulicas":
                        acta.flexibleHidraulico,
                    "Fuga por conectores y mangueras":
                        acta.fugaConectores,
                },
                3: {
                    "Bateria": acta.bateria,
                    "Chapa de contacto":
                        acta.chapaContacto,
                    "Sistema electrico":
                        acta.sistemaElectrico,
                    "Horometro": acta.horometro,

                    "Palanca comandos":
                        acta.palancaComando,
                    "Switch de luces": acta.switchLuces,
                    "Switch de marchas":
                        acta.switchMarcha,
                    "Joystick": acta.joystick,
                },
                4: {
                    "Cadenas": acta.cadena,
                    "Carro y su respaldo de carga":
                        acta.carro,
                    "Horquillas y seguros":
                        acta.horquilla,
                    "Jaula de proteccion": acta.jaula,
                    "LLantas": acta.llantas,
                    "Mastil": acta.mastil,
                    "Pintura": acta.pintura,
                    "Ruedas": acta.rueda,
                },
                5: {
                    "Desplazador lateral":
                        acta.desplazadorLateral,
                    "Direccion": acta.direccion,
                    "Freno mano": acta.frenoMano,
                    "Freno pie": acta.frenoPie,
                    "Inclinacion": acta.inclinacion,
                    "Levante": acta.levante,

                    "Nivel aceite hidraulico":
                        acta.nivelAceiteHidraulico,
                    "Serie cargador": acta.serieCargador,
                    "Nivel liquido de freno":
                        acta.nivelLiquinoFreno,
                    "Cargador voltaje y amperaje":
                        acta.cargadorVoltaje,
                    "Enchufes":
                        acta.enchufe,
                }
            }
        }

        let rows = [];


        var initial = true;

        for (var i in itemMap[index]) {

            let row = generateRow(i, itemMap[index][i], initial, i in itemSpecial ? itemSpecial[i] : undefined,
                i in newFieldsMap ? newFieldsMap[i] : undefined
            );

            rows.push(row);
            initial = false;



        }

        return (<List key={index}>
            {rows}

        </List>);
    };

    return (
        <Box sx={{ bgcolor: 'white' }}>
            <AppBar position="static">
                <Tabs TabIndicatorProps={{ style: { background: 'white' } }}
                    sx={{ bgcolor: "var(--black)" }}


                    value={value}
                    onChange={handleChange}

                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab icon={<ArrowBackIcon>   </ArrowBackIcon>} iconPosition="start" label="Volver" {...a11yProps(0)} />
                    <Tab icon={<AssignmentIcon>   </AssignmentIcon>} iconPosition="start" label="ACCESORIOS" {...a11yProps(1)} />
                    <Tab icon={<BiotechIcon>   </BiotechIcon>} iconPosition="start" label="SISTEMA HIDRAULICO" {...a11yProps(2)} />
                    <Tab icon={<ElectricalServicesIcon>   </ElectricalServicesIcon>} iconPosition="start" label="SISTEMA ELECTRICO" {...a11yProps(3)} />
                    <Tab icon={<DirectionsCarIcon>   </DirectionsCarIcon>} iconPosition="start" label="CHASIS ESTRUCTURA" {...a11yProps(4)} />
                    <Tab icon={<SpeedIcon>   </SpeedIcon>} iconPosition="start" label="PRUEBAS DE OPERACION" {...a11yProps(5)} />

                    <Tab icon={<EditIcon>   </EditIcon>} iconPosition="start" label="Firma y observaciones" {...a11yProps(6)} />
                </Tabs>
            </AppBar>

            {acta == undefined ? <></> :
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel key={0} value={value} index={0} dir={theme.direction}>
                    </TabPanel>
                    <TabPanel key={1} value={value} index={1} dir={theme.direction}>
                        {generatedItemList(1)}
                    </TabPanel>
                    <TabPanel key={2} value={value} index={2} dir={theme.direction}>
                        {generatedItemList(2)}
                    </TabPanel>
                    <TabPanel key={3} value={value} index={3} dir={theme.direction}>
                        {generatedItemList(3)}
                    </TabPanel>
                    <TabPanel key={4} value={value} index={4} dir={theme.direction}>
                        {generatedItemList(4)}
                    </TabPanel>
                    <TabPanel key={5} value={value} index={5} dir={theme.direction}>
                        {generatedItemList(5)}
                    </TabPanel>
                    <TabPanel key={6} value={value} index={6} dir={theme.direction}>
                        <EndObject>

                            <Button variant='contained' onClick={downloadExcel} startIcon={<PrintIcon />}>Exportar</Button>
                        </EndObject>

                        <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Box
                                component="img"
                                sx={{

                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Firma"
                                src={acta.firmaURL}
                            />
                        </div>
                        <List>
                            <ListItem disablePadding>
                                <ListItemText primary={"Rut recepcionista"} ></ListItemText>
                                {format(acta.rut)}
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemText primary={"Nombre recepcionista"} ></ListItemText>
                                {acta.nombre}
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemText primary={"Observaciones"} ></ListItemText>
                                {acta.observacion}
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemText primary={"Altura de levante"} ></ListItemText>
                                {acta.alturaLevante} mm
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemText primary={"Mastil"} ></ListItemText>
                                {acta.mastilEquipo}
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemText primary={"Horometro registrado"} ></ListItemText>
                                {acta.horometroActual}
                            </ListItem>

                        </List>


                    </TabPanel>
                </SwipeableViews>
            }
        </Box>
    );
}




const Acta = MotionHoc(ActaComponent);
export default Acta;