import React, { useState, useContext, useEffect } from 'react'
import * as st from './LineChartComponent.styles'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Legend, Bar } from 'recharts';


export const LineChartComponent = (props) => {

    return (
        <st.GraphicMainContainer>
            <LineChart width={600} height={250} data={props.data}>
                <Line type="monotone" dataKey="Cantidad" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="Fecha" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </st.GraphicMainContainer>
    )
}