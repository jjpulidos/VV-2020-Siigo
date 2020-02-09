import React, { useState, useContext, useEffect } from 'react'
import * as st from './Analitics.styles'
import { LineChartComponent } from './LineChart/LineChartComponent'
import { Storage } from 'aws-amplify'
import Axios from 'axios'


export const Analitics = () => {
    const [RawData] = useState()
    const [Data1, setData1] = useState([])
    const [Data2, setData2] = useState([])
    const [Data3, setData3] = useState([])
    const [Data4, setData4] = useState([])
    const [URL] = useState("https://dr4y7jc0d4.execute-api.us-west-2.amazonaws.com/dev/analytics")
    const [ShowGraphic, setShowGraphic] = useState(false)
    useEffect(() => {
        Bd1()
        setTimeout(() => Bd5(), 200)
        setTimeout(() => Bd2(), 500)
        setTimeout(() => Bd3(), 1000)
        setTimeout(() => Bd4(), 1500)
        
    }, [])

    const Bd1 = () => {
        Storage.get('Numero_Facturas_Mensual.csv')
            .then(link => {
                console.log(link)
                Axios({
                    method: "get",
                    url: link,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => csvJSON(res.data, "data1"))
                .then(() => setShowGraphic(true))
            })
            .catch(err => console.error(err))
    }

    const Bd2 = () => {
        Storage.get('Tasa_clientes_Mensual.csv')
            .then(link => {
                console.log(link)
                Axios({
                    method: "get",
                    url: link,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => csvJSON(res.data, "data2"))
                .then(() => setShowGraphic(true))
            })
            .catch(err => console.error(err))
    }

    const Bd3 = () => {
        Storage.get('Valor_Factura_Promedio_Anual.csv')
            .then(link => {
                console.log(link)
                Axios({
                    method: "get",
                    url: link,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => csvJSON(res.data, "data3"))
                .then(() => setShowGraphic(true))
            })
            .catch(err => console.error(err))
    }

    const Bd4 = () => {
        Storage.get('Valor_Factura_Promedio_Mensual.csv')
            .then(link => {
                console.log(link)
                Axios({
                    method: "get",
                    url: link,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => csvJSON(res.data, "data4"))
                .then(() => setShowGraphic(true))
            })
            .catch(err => console.error(err))
    }

    const Bd5 = () => 
        Axios({
            method: "post",
            url: URL,
            data: {"tenant_id": "hola"},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(res => console.log("FINAL COOUNTDOWN => ", JSON.parse(res.data)))
        .catch(err => console.error(err))


    

    const csvJSON = (data, option) => {
        data.replace(/,/g, ', ')
        let rows = data.split("\n")
        let separed = rows.map(x => x.split(","))
        //console.log(separed)
        let all = []
        separed.map((x, i) => {
            if (i > 1 && x.length > 1) {
                x[0].includes("-") ?
                all.push({ "Fecha": x[0], "Cantidad": x[1] })
                :
                all.push({ "Fecha": x[1], "Cantidad": x[0] })
            }
                
        })
        console.log(all)
        option === "data1" ?
            setData1(all)
            : option === "data2" ?
                setData2(all)
                    : option === "data3" ?
                        setData3(all)
                            : option === "data4" && setData4(all)

    }
    
        

    return (
        <st.MainanaliticsContainer>
            <st.SingleGraphicContainer>
                <st.GraphicTitle> Número de Facturas Mensual </st.GraphicTitle>
                <LineChartComponent data={Data1} />
            </st.SingleGraphicContainer>

            <st.SingleGraphicContainer>
                <st.GraphicTitle> Tasa de clientes Mensual </st.GraphicTitle>
                <LineChartComponent data={Data2} />
            </st.SingleGraphicContainer>

            <st.SingleGraphicContainer>
                <st.GraphicTitle> Valor de factura promedio anual </st.GraphicTitle>
                <LineChartComponent data={Data3} />
            </st.SingleGraphicContainer>

            <st.SingleGraphicContainer>
                <st.GraphicTitle> Valor de factura promedio mensual </st.GraphicTitle>
                <LineChartComponent data={Data4} />
            </st.SingleGraphicContainer>            
        </st.MainanaliticsContainer>
    )
}