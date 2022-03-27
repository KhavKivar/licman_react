import React, { PureComponent, useState } from 'react';

import {
    PieChart, Pie, Sector, Line, LineChart, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
    , ResponsiveContainer
} from 'recharts';


import MotionHoc from "../services/motionhoc";
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const TextTitle = styled.h2`
    margin-bottom:15px;
    color:var(--black);
   
`;

const Row = styled.div`
    display:flex;
    gap:1.5rem;
 
    
`;

const Column = styled.div`
    display:flex;
    gap:1.5rem;
    flex-wrap: wrap;
    flex-direction:column;
    
`;
const ContainerGraph = styled.div`
    width: 100%;
    height: 55vh;
`;
const ContainerGraphModelo = styled.div`
    width: 79vw; 
`;
const ContainerHeight = styled.div`
   height: 60vh;
`;


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value} Envios`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

function numberToMonth(x) {
    if (x < 10) {
        return "0" + x.toString();
    }
    return x.toString();
}

function dataYear(data, year) {
    var data_parse = [];
    if (year == "" || year == null) {
        return [];
    }

    for (let i = 1; i < 13; i++) {
        let year_month = year.toString() + "-" + numberToMonth(i);
        const monthData = data.filter(x => x.fechaMov.includes(year_month));
        const enviados = monthData.filter(x => x.tipo == 'ENVIO').length;
        const retiros = monthData.filter(x => x.tipo == 'RETIRO').length;
        data_parse.push({ name: "2022-" + i < 10 ? "0" + i : i, envios: enviados, retiros: retiros })
    }
    return data_parse;
}

function getClientes(data_mov, data_clientes) {
    var data_parse = [];
    let dic = {};
    for (let i = 0; i < data_mov.length; i++) {
        const index_cliente = data_clientes.findIndex(x => x.rut == data_mov[i].rut);
        if (index_cliente != -1) {
            const nombre_cliente = data_clientes[index_cliente].nombre;
            if (!(nombre_cliente in dic)) {
                dic[nombre_cliente] = 1;
            } else {
                dic[nombre_cliente] += 1;
            }
        }

    }
    for (const [key, value] of Object.entries(dic)) {
        data_parse.push({ name: key, value: value });
    }
    data_parse.sort(function (x, y) {
        return y.value - x.value;
    });

    var data_final = []
    for (let i = 0; i < 10; i++) {
        if (data_parse[i] != undefined) {
            data_final.push(data_parse[i]);
        }


    }


    return data_final;
}

function getModelos(data, data_equipo, data_acta) {
    var data_parse = [];
    let dic = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i].tipo == 'ENVIO') {
            const index_acta = data_acta.findIndex(x => x.idInspeccion == data[i].idInspeccion);

            if (index_acta != -1) {
                const index_equipo = data_equipo.findIndex(x => x.idEquipo == data_acta[index_acta].idEquipo);

                if (index_equipo != -1) {
                    const equipo = data_equipo[index_equipo];
                    if (!(equipo.modelo in dic)) {
                        dic[equipo.modelo] = 1;
                    } else {
                        dic[equipo.modelo] += 1;
                    }
                }
            }
        }
    }
    for (const [key, value] of Object.entries(dic)) {
        data_parse.push({ name: key, value: value });
    }
    data_parse.sort(function (x, y) {
        return y.value - x.value;
    });
    var data_final = []
    for (let i = 0; i < 10; i++) {
        if (data_parse[i] != undefined) {
            console.log(data_final);
            data_final.push(data_parse[i]);
        }

    }
    return data_final;
}

const HomeComponent = () => {
    const [state_pie, setStatePie] = useState({ activeIndex: 0 });
    const inventario = useSelector((state) => state.inventario.data);
    const actas = useSelector((state) => state.acta.data);
    const clientes = useSelector((state) => state.cliente.data);
    const [value, setValue] = React.useState(new Date());


    const disponible = inventario.filter(x => x.estado == 'DISPONIBLE').length;
    const listos = inventario.filter(x => x.estado == 'LISTO PARA ENVIAR').length;
    const arrendados = inventario.filter(x => x.estado == 'ARRENDADO').length;
    const porLLegar = inventario.filter(x => x.estado == 'POR LLEGAR').length;

    const tipoRetract = inventario.filter(x => x.tipo == 'Retrac');
    const tipoRetractDisponible = tipoRetract.filter(x => x.estado == 'DISPONIBLE').length;
    const tipoRetractArrendado = tipoRetract.filter(x => x.estado == 'ARRENDADO').length;

    const tipoElectrica = inventario.filter(x => x.tipo.includes('Grúa Eléct'));
    const tipoElectDisponible = tipoElectrica.filter(x => x.estado == 'DISPONIBLE').length;
    const tipoElectArrendado = tipoElectrica.filter(x => x.estado == 'ARRENDADO').length;

    const tipoGas = inventario.filter(x => x.tipo.includes('Grúa gas'));
    const tipoGasDisponible = tipoGas.filter(x => x.estado == 'DISPONIBLE').length;
    const tipoGastArrendado = tipoGas.filter(x => x.estado == 'ARRENDADO').length;


    const tipoTrans = inventario.filter(x => x.tipo.includes('Transpaleta'));
    const tipoTransDisponible = tipoTrans.filter(x => x.estado == 'DISPONIBLE').length;
    const tipoTransArrendado = tipoTrans.filter(x => x.estado == 'ARRENDADO').length;


    const tipoApilador = inventario.filter(x => x.tipo.includes('Apilador'));
    const tipoApiladorDisponible = tipoApilador.filter(x => x.estado == 'DISPONIBLE').length;
    const tipoApiladorArrendado = tipoApilador.filter(x => x.estado == 'ARRENDADO').length;

    const movimientos = useSelector((state) => state.movimiento.data);

    var linea_tiempo = [];
    try {
        linea_tiempo = dataYear(movimientos, value.getFullYear());
    } catch (e) {
        linea_tiempo = dataYear(movimientos, null);
    }
    const data_modelos = getModelos(movimientos, inventario, actas)

    const data_clientes = getClientes(movimientos, clientes);

    const inventarioData = [{ name: 'Disponibles', value: disponible },
    { name: 'Listos para enviar', value: listos },
    { name: 'Arrendados', value: arrendados },
    { name: 'Por LLegar', value: porLLegar }
    ];

    const tipoData = [{
        name: 'Retrac',
        disponible: tipoRetractDisponible,
        arrendados: tipoRetractArrendado,
    },
    {
        name: 'Gruas Electrica',
        disponible: tipoElectDisponible,
        arrendados: tipoElectArrendado,
    },
    {
        name: 'Gruas A gas',
        disponible: tipoGasDisponible,
        arrendados: tipoGastArrendado,
    }
        ,
    {
        name: 'Transpaleta',
        disponible: tipoTransDisponible,
        arrendados: tipoTransArrendado,
    }
        ,
    {
        name: 'Apilador',
        disponible: tipoApiladorDisponible,
        arrendados: tipoApiladorArrendado,
    }


    ]


    const onPieEnter = (_, index) => {
        setStatePie({
            activeIndex: index,
        });
    };
    return (

        <Box sx={{ backgroundColor: "#EEEEEE", borderRadius: '1%', padding: "30px" }}>

            <Column>

                <ContainerGraphModelo>
                    <Row>
                        <Box sx={{ backgroundColor: "white", borderRadius: '1%', padding: "10px", width: "49%" }}>

                            <TextTitle>Estado del inventario</TextTitle>
                            <ContainerGraph>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={400}
                                        data={tipoData}
                                        margin={{

                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="4 4" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend
                                            formatter={(value, entry, index) => <span style={{ color: "var(--black)" }}>{value}</span>}


                                            payload={[{ value: 'Disponibles ' + disponible, type: 'square', id: 'ID01', color: "#448aff" },
                                            { value: 'Listo para enviar ' + listos, type: 'square', id: 'ID01', color: "green" },
                                            { value: 'Arrendados ' + arrendados, type: 'square', id: 'ID01', color: "#ff5252" },
                                            { value: 'Por llegar ' + porLLegar, type: 'square', id: 'ID01', color: "blue" }
                                            ]}

                                            verticalAlign="top" height={60} />
                                        <Bar dataKey="disponible" stackId="a" fill="#448aff" />
                                        <Bar dataKey="arrendados" stackId="a" fill="#ff5252" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ContainerGraph>


                        </Box>
                        <Box sx={{ backgroundColor: "white", borderRadius: '1%', padding: "10px", width: "49%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <TextTitle>Linea de tiempo</TextTitle>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        label="Año"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <ContainerGraph>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        width={500}
                                        height={400}
                                        data={linea_tiempo}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="envios" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="retiros" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ContainerGraph>

                        </Box>
                    </Row>
                </ContainerGraphModelo>

                <ContainerGraphModelo>
                    <ContainerHeight>
                        <Box sx={{ backgroundColor: "white", borderRadius: '1%', padding: "10px", width: "100%", height: "60vh" }}>
                            <TextTitle>Top 10 modelos mas solicitados</TextTitle>

                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart
                                    width={600}
                                    height={500}
                                    data={data_modelos}
                                    margin={{

                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />

                                </BarChart>
                            </ResponsiveContainer>

                        </Box>
                    </ContainerHeight>
                </ContainerGraphModelo>
                <ContainerGraphModelo>
                    <Box sx={{ backgroundColor: "white", borderRadius: '1%', padding: "10px", width: "100%", height: "60vh" }}>
                        <TextTitle>Top 10 clientes</TextTitle>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart width={630} height={400}>
                                <Pie
                                    activeIndex={state_pie.activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data_clientes}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart></ResponsiveContainer>

                    </Box>
                </ContainerGraphModelo>

            </Column >
        </Box >
    );


}

const Home = MotionHoc(HomeComponent);
export default Home;

