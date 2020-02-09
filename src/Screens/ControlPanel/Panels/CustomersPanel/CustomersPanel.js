import React, { useState, useContext, useEffect } from 'react'
import * as st from './CustomersPanel.styles'
import { Input, Empty } from 'antd'
import { BringSomeCustomers } from '../../../../Services/AppSyncInteraction'



export const CustomersPanel = () => {
    const { Search } = Input
    const [Clients, setClients] = useState([])
    const [ID] = useState(localStorage.getItem('user-id'))
    

    // This function returns the first Customers
    useEffect(() => {
        BringClients()
    }, [])


    const BringClients = () => 
        BringSomeCustomers(ID)
            .then(res => {
                setClients(res.data.listCustomers.items)
            })
            .catch(err => console.error(err))


    const ReturnClients = () => 
            Clients.map((client, index) => 
                <st.SingleClient key={index}>
                    <st.InfoText> {client.first_name} </st.InfoText>
                    <st.InfoText> {client.last_name} </st.InfoText>
                </st.SingleClient>
            )
    


    return (
        <st.CustomersPanelContaiener>
            <st.Title> Clientes </st.Title>
            
            <st.SearchInputContainer>
                <Search 
                    placeholder='Busca a algún cliente...'
                />
            </st.SearchInputContainer>

            <st.ClientsListContainer>
                { Clients.length ? ReturnClients() : (
                    <st.NoClientsToShow>
                        <Empty description='Sin clientes aún' />
                        
                    </st.NoClientsToShow>
                )}
            </st.ClientsListContainer>
        </st.CustomersPanelContaiener>
    )
}