import React, { useState, useContext, useEffect } from 'react'
import * as st from './AddClient.styles'
import { Input, Button, Icon } from 'antd'
import Swal from 'sweetalert2' 
import { navigate } from '@reach/router'
import { CreateClientService } from '../../Services/AppSyncInteraction'

export const AddClient = () => {
    const [Fields, setFields] = useState({name: "", lastname: ""})
    const [FieldsInitialState] = useState({name: "", lastname: ""})
    const [ID] = useState(localStorage.getItem('user-id'))
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    // This one is the confirmation function, just in case
    const VerifyBeforeGoBack = () =>   
        Swal.fire({
            title: '¿Estás seguro que quieres salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1890FF',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => result.value && navigate('main-menu')) 



    // This one add cliens... 나는 졸려
    const AddClient = () => 
        CreateClientService(ID, Fields)
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Cliente creado correctamente'
                })
                setFields(FieldsInitialState)
            })
            .catch(err => {
                console.error(err)
                Toast.fire({
                    icon: 'error',
                    title: 'Hubo un problema creando el cliente'
                })
            })
            
    

    return (
        <st.AddClientContainer>
            
            <st.FormBox>
                <st.BackArrowContainer>
                    <Icon onClick={() => navigate('main-menu')} style={{fontSize: '1.4em', cursor: 'pointer'}} type='arrow-left' />
                </st.BackArrowContainer>
                <st.Title>
                    Añadir nuevo cliente
                </st.Title>

                <st.FormContainer>
                    <st.Subtitle> Nombre </st.Subtitle>
                    <Input value={Fields.name} onChange={e => setFields({...Fields, name: e.target.value})} /> 

                    <st.Subtitle> Apellido </st.Subtitle>
                    <Input value={Fields.lastname} onChange={e => setFields({...Fields, lastname: e.target.value})} /> 
                </st.FormContainer>

                <st.FinalButtonsContainer>
                    <Button onClick={AddClient} type='primary' > Crear </Button>
                    <Button onClick={VerifyBeforeGoBack} > Cancelar </Button>
                </st.FinalButtonsContainer>
            </st.FormBox>
        </st.AddClientContainer>
    )
}