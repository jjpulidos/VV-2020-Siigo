import React, { useState, useContext, useEffect } from 'react'
import * as st from './CustomersPanel.styles'
import { Input, Empty, AutoComplete, Icon } from 'antd'
import { BringSomeCustomers, SubscribeToClientsAtCreate, DeleteClient } from '../../../../Services/AppSyncInteraction'
import Swal from ''



export const CustomersPanel = () => {
    const { Search } = Input
    const [Clients, setClients] = useState([])
    const [ID] = useState(localStorage.getItem('user-id'))
    const [NamesArray, setNamesArray] = useState([])
    const [DataSource, setDataSource] = useState([])
    const [SearchText, setSearchText] = useState("")
    const [NewClient, setNewClient] = useState({})
    const [LocalClientToEdit, setLocalClientToEdit] = useState({})
    const [ShowClientList, setShowClientList] = useState(true)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    

    // This function returns the first Customers
    useEffect(() => {
        BringClients()
    }, [])


    useEffect(() => {
        !SearchText.length && setDataSource(NamesArray)
    }, [DataSource])



    // This hook take the last item from the subscription for putting it in the clients array
    useEffect(() => {
        setClients([...Clients, NewClient])
    }, [NewClient])



    // This function subscribe to the user creation event
    useEffect(() => {
        const sub_creation = SubscribeToClientsAtCreate().subscribe({
            next: item => {
                let newItem = item.value.data.onCreateCustomer
                setNewClient(newItem)   
            }
        })
    }, [])


    const BringClients = () => 
        BringSomeCustomers(ID)
            .then(res => {
                console.log(res.data.listCustomers.items)
                setClients(res.data.listCustomers.items)
                setNamesArray(res.data.listCustomers.items.map(x=>x.first_name))
                setDataSource(res.data.listCustomers.items.map(x=>x.first_name))
            })
            .catch(err => console.error(err))


    const ReturnClients = () => 
            Clients.map((client, index) => 
                <st.SingleClient key={index}>
                    <st.InfoText> {client.first_name} {client.last_name} </st.InfoText>
                </st.SingleClient>
            )


    const ReturnFilteredClients = () => 
            Clients.filter(x=>x.first_name.toLowerCase().includes(SearchText.toLowerCase())).map((client, index) => 
                <st.SingleClient key={index}>
                    <st.InfoText> {client.first_name} {client.last_name} </st.InfoText>
                    <Icon onClick={() => HandleIconsBehavior('edit', client)} type='edit' style={{cursor: 'pointer', color: 'steelblue'}} />
                    <Icon onClick={() => HandleIconsBehavior('delete', null, client.id)} type='delete' style={{cursor: 'pointer', color: 'tomato'}} />
                </st.SingleClient>
            )



    // This is a central function for handling Icons behavior
    const HandleIconsBehavior = (option, client=null, id) => {
        option === 'edit' && EditProduct(client)
        option === 'delete' && ConfirmBeforeDelete(id)
    }

    const EditProduct = client => {
        setLocalClientToEdit(client)
        setShowClientList(false)
    }


    const ConfirmBeforeDelete = id => 
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar la información de este cliente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1890FF',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => result.value && DeleteSingleClient(id))



    const DeleteSingleClient = id => 
          DeleteClient(id)
              .then(() => ShowSweetAlert('success', 'El producto se ha eliminado correctamente'))
              .catch(err => {
                  console.error(err)
                  ShowSweetAlert('error', 'Hubo un problema eliminando el producto')
              })


    const ShowSweetAlert = (state, message) => {
        state === 'error' ? 
            Toast.fire({
                icon: 'error',
                title: message
            })
            : 
            Toast.fire({
                icon: 'success',
                title: message
            })
            }

    const SearchValue = text => {
        setSearchText(text)
        setDataSource(DataSource.filter(x => x.toLowerCase().includes(text.toLowerCase())))
        }
    


    return (
        <st.CustomersPanelContaiener>
            <st.Title> Clientes </st.Title>
            
            <st.SearchInputContainer>
            <AutoComplete
                dataSource={DataSource}
                style={{width: '100%'}}
                onSelect={selected => setSearchText(selected)}
                value={SearchText}
                onSearch={text => SearchValue(text)}
                placeholder="Busca a algún cliente..."
            />
            </st.SearchInputContainer>

            {
                ShowClientList &&
                <st.ClientsListContainer>
                    { (Clients.length && !SearchText.length) 
                        ? ReturnClients() :
                            (Clients.length && SearchText.length) ? 
                            ReturnFilteredClients() :
                        <st.NoClientsToShow>
                            <Empty description='Sin clientes aún' />
                        </st.NoClientsToShow>
                    }
                </st.ClientsListContainer>
            }
        </st.CustomersPanelContaiener> 
    )
}