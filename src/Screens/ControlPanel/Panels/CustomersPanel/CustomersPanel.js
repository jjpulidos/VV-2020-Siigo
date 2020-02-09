import React, { useState, useContext, useEffect } from 'react'
import * as st from './CustomersPanel.styles'
import { Input, Empty, AutoComplete, Icon, Modal} from 'antd'
import { BringSomeCustomers, SubscribeToClientsAtDelete, SubscribeToClientsAtCreate, DeleteClient, SubscribeToClientsAtUpdate } from '../../../../Services/AppSyncInteraction'
import Swal from 'sweetalert2'
import { ClientEditor } from './Components/ClientEditor'
import * as _ from 'lodash'



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
    const [PageNumber, setPageNumber] = useState(1)
    const [PaginationRange, setPaginationRange] = useState(0)
    const [TotalPages, setTotalPages] = useState(0)
    const [LastSerchs, setLastSearchs] = useState([])
    const [ModalVisibility, setModalVisibility] = useState(false)



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
        setLastSearchs(JSON.parse(localStorage.getItem('csearchs')))
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
            next: () => {
                BringClients()
            }
        })

        const sub_update = SubscribeToClientsAtUpdate().subscribe({
            next: () => BringClients()
        })

        const sub_delete = SubscribeToClientsAtDelete().subscribe({
            next: () => BringClients()
        })

        return () => {
            sub_creation.unsubscribe()
            sub_update.unsubscribe()
            sub_delete.unsubscribe()
        }
    }, [])


    const BringClients = () => 
        BringSomeCustomers(ID)
            .then(res => {
                console.log(res.data.listCustomers.items)
                setClients(res.data.listCustomers.items)
                setNamesArray(res.data.listCustomers.items.map(x=>x.first_name))
                setDataSource(res.data.listCustomers.items.map(x=>x.first_name))
                setTotalPages(parseInt(res.data.listProducts.items.length / 5))
            })
            .catch(err => console.error(err))


    const ReturnClients = () => 
        Clients.slice(PaginationRange, PaginationRange + 5).map((client, index) => 
            <st.SingleClient key={index}>
                <st.InfoText> {client.first_name} {client.last_name} </st.InfoText>
                <Icon onClick={() => HandleIconsBehavior('edit', client)} type='edit' style={{fontSize: '1.5em', cursor: 'pointer', color: 'steelblue'}} />
                <Icon onClick={() => HandleIconsBehavior('delete', null, client.id)} type='delete' style={{fontSize: '1.5em', cursor: 'pointer', color: 'tomato'}} />
            </st.SingleClient>
            )


    const ReturnFilteredClients = () => 
            Clients.filter(x=>x.first_name.toLowerCase().includes(SearchText.toLowerCase())).map((client, index) => 
                <st.SingleClient key={index}>
                    <st.InfoText> {client.first_name} {client.last_name} </st.InfoText>
                    <Icon onClick={() => HandleIconsBehavior('edit', client)} type='edit' style={{fontSize: '2em', cursor: 'pointer', color: 'steelblue'}} />
                    <Icon onClick={() => HandleIconsBehavior('delete', null, client.id)} type='delete' style={{fontSize: '2em', cursor: 'pointer', color: 'tomato'}} />
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

        const SaveSearch = searchedvalue => {
            setSearchText(searchedvalue)
            setSearchText(searchedvalue)
            let searchs = []
            if (LastSerchs !== null){
                if (LastSerchs.length < 3 ) {
                    searchs = LastSerchs
                    searchs.push(searchedvalue)
                    localStorage.setItem('csearchs', JSON.stringify(searchs))
                }else {
                    searchs = LastSerchs
                    searchs.shift()
                    searchs.push(searchedvalue)
                    localStorage.setItem('csearchs', JSON.stringify(searchs))
                }
            }else {
                searchs.push(searchedvalue)
                localStorage.setItem('csearchs', JSON.stringify(searchs))
            }
            
            
          }



        const NextPage = () => {
            if (PageNumber < Clients.length / 5) {
                setPageNumber(PageNumber + 1)
                if (PageNumber === TotalPages - 1) {
                    setPaginationRange(PaginationRange + 5)
                } else {
                    setPaginationRange(PaginationRange + 5)
                }
            }
          }
    
    
          const PrevPage = () => {
            if (PageNumber > 1) {
                setPageNumber(PageNumber - 1)
                setPaginationRange(PaginationRange - 5)
              }
          }

          const ShowModal = () => {
            setModalVisibility(true)
          }
    


    return (
        <st.CustomersPanelContaiener>
             <st.TopTitlesContainer>
                <st.Title onClick={()=>localStorage.removeItem('searchs')}> Clientes </st.Title>
                <st.LastSearchedContainer onClick={ShowModal}> últimas búsquedas </st.LastSearchedContainer> 
            </st.TopTitlesContainer>
            
            <st.SearchInputContainer>
            <AutoComplete
                dataSource={DataSource}
                style={{width: '100%'}}
                onSelect={selected => SaveSearch(selected)}
                value={SearchText}
                onSearch={text => SearchValue(text)}
                placeholder="Busca a algún cliente..."
            />
            </st.SearchInputContainer>

            {
                ShowClientList ?
                <st.ClientsListContainer>
                    { (Clients.length && !SearchText.length) 
                        ? ReturnClients() :
                            (Clients.length && SearchText.length) ? 
                            ReturnFilteredClients() :
                        <st.NoClientsToShow>
                            <Empty description='Sin clientes aún' />
                        </st.NoClientsToShow>
                    }

                    <st.PaginationContainer>
                        <Icon onClick={PrevPage} style={{cursor: 'pointer', color: '#1890FF', fontSize: '1.2em'}} type='arrow-left' />
                            { PageNumber }
                        <Icon onClick={NextPage} style={{cursor: 'pointer', color: '#1890FF', fontSize: '1.2em'}} type='arrow-right' />
                    </st.PaginationContainer> 
                </st.ClientsListContainer>
                :
                <ClientEditor showListAgain={() => setShowClientList(true) }  client={LocalClientToEdit} />
            }


        <Modal
          title="Últimas búsquedas realizadas"
          visible={ModalVisibility}
          onOk={() => setModalVisibility(false)}
          onCancel={() => setModalVisibility(false)}
        >
            { LastSerchs && LastSerchs.map((search, index) => <p key={index}>{search}</p>) }
        </Modal>
        </st.CustomersPanelContaiener> 
    )
}