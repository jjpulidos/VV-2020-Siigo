import React, { useState, useContext, useEffect } from 'react'
import * as st from './ClientEditor.styles'
import { Input, Icon, Button } from 'antd'
import { UpdateCustomer, DeleteClient } from '../../../../../Services/AppSyncInteraction'
import Swal from 'sweetalert2'

export const ClientEditor = props => {
    const [ProductFields, setProductFields] = useState({
        "Nombre": props.client.first_name || "", 
        "Apellido": props.client.last_name || ""
    })
    const [TenantId] = useState(localStorage.getItem('user-id'))
    const [ID] = useState(props.client.id)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })




    const RenderProductEditionFields = () => 
        Object.keys(ProductFields).map((item, index) => 
            <st.SingleProductEditionField key={index}>
                <st.FieldTitle> {item} </st.FieldTitle>
                <Input 
                    value={ProductFields[item]} 
                    onChange={e => setProductFields({...ProductFields, [item]: e.target.value})} 
                />
            </st.SingleProductEditionField>
        )


    const ValidateBeforeUpdate = () => {
        if (!ProductFields["Nombre"].trim().length) { ShowSweetAlert("error", "El nombre no puede quedar vacío"); return false}
        if (!ProductFields["Apellido"].trim().length) {ShowSweetAlert("error", "El apellido no puede quedar vacío"); return false}
        
        SaveNewProduct() 
    }

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


    const SaveNewProduct = () => 
        UpdateCustomer(ProductFields, TenantId, ID)
          .then(() => {
            ShowSweetAlert("success", "Cliente actualizado exitosamente")
            props.showListAgain()
          })
          .catch(err => {
              console.error(err)
              ShowSweetAlert("error", "Hubo un error actualizando el cliente")
          })


    const ConfirmBeforeDelete = () => 
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1890FF',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => result.value && DeleteSingleProduct())
    


    const DeleteSingleProduct = () => 
        DeleteClient(ID)
            .then(() => {
                ShowSweetAlert('success', 'El producto se ha eliminado correctamente')
                props.showListAgain()
            })
            .catch(err => {
                console.error(err)
                ShowSweetAlert('error', 'Hubo un problema eliminando el producto')
            })







    return (
        <st.ProductEditionContainer>
            <Icon onClick={() => props.showListAgain()} type='arrow-left' style={{
                color: '#323232', 
                position: 'absolute',
                top: '3%', right: '20%',
                cursor: 'pointer', fontSize: '1.5em'
            }} />


            <st.ProductEditionFieldsContainer>
                { RenderProductEditionFields() }
            </st.ProductEditionFieldsContainer>

            <st.ButtonsContainer >
                <Button onClick={ValidateBeforeUpdate} type='primary' > Guardar </Button>
                <st.DeleteButtonContainer>
                    <Icon 
                        onClick={ConfirmBeforeDelete}
                        type='delete' 
                        style={{color: 'tomato'}} />
                </st.DeleteButtonContainer>
            </st.ButtonsContainer>
        </st.ProductEditionContainer>
    )
}