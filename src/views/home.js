import React, { PureComponent } from 'react';
import { useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MotionHoc from "../services/motionhoc";
import Box from '@mui/material/Box';



const data = [
    {
        name: 'Empresa 1',
        mov: 1000

    },
    {
        name: 'Empresa 2',
        mov: 2000
    },
    {
        name: 'Empresa 3',
        mov: 3000

    },
    {
        name: 'Empresa 4',
        mov: 1000

    },
];
const data2 = [
    { name: 'Empresa 1', value: 200 },
    { name: 'Empresa 2', value: 100 },
    { name: 'Empresa 3', value: 600 },
    { name: 'Empresa 4', value: 100 },
    { name: 'Empresa 5', value: 100 },
    { name: 'Empresa 6', value: 100 },
];

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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value} Pedidos`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const HomeComponent = () => {
    const [state_pie,setStatePie] = useState({activeIndex:0});

     const onPieEnter = (_, index) => {
        setStatePie({
          activeIndex: index,
        });
      };
    return (
        <Box sx={{ backgroundColor: "white" }}>
            <div style={{ display: "flex",flexWrap:"wrap" }}>
           
                <PieChart width={600} height={600}>
                    <Pie
                        activeIndex={state_pie.activeIndex}
                        activeShape={renderActiveShape}
                        data={data2}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            

                <BarChart
                    width={500}
                    height={500}
                    data={data}
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
                    <Bar dataKey="mov" fill="#8884d8" />

                </BarChart>
            </div>
        </Box>
    );


}

const Home = MotionHoc(HomeComponent);
export default Home;

