import React, { useState, useContext, useEffect } from 'react';
import * as st from './ManualLoad.styles';
import { Input, Button } from 'antd';
import { CreateProductService } from '../../../../Services/AppSyncInteraction'
import Swal from 'sweetalert2'


export const ManualLoad = () => {
  const [Fields, setFields] = useState({
    "Nombre": '',
    "Descripción": '',
    "Precio": '',
    "Fecha de Expiración": ''
  });
  const [FieldsInitialState] = useState({"Nombre": '',"Descripción": '',"Precio": '',"Fecha de Expiración": ''})
  const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
  })
  const [ID, setID] = useState(localStorage.getItem("user-id"))


  // This function validates fields before
  const ValidateBeforeSend = () => {
    if (!Fields["Nombre"].trim().length) { ShowSweetAlert("error", "El nombre no puede quedar vacío"); return false}
    if (!Fields["Descripción"].trim().length) {ShowSweetAlert("error", "La descripción no puede quedar vacía"); return false}
    if (!Fields["Precio"].trim().length) {ShowSweetAlert("error", "El precio no puede quedar vacío"); return false}

    /^\d+$/.test(Fields["Precio"].trim()) ? SendData() : ShowSweetAlert("error", "El campo de precio solo debe tener números")
    
    
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


  // This function uses the CreateProduct service function to upload the data to DynamoDB
  const SendData = () => {
      let data = {
        tenant_id: ID,
        name: Fields["Nombre"].trim(),
        description:  Fields["Descripción"].trim(),
        price:  parseFloat(Fields["Precio"]),
        expired_date:  Fields["Fecha de Expiración"].trim()
      }
    
    CreateProductService(data)
      .then(res => {
        ShowSweetAlert("success", "Producto creado exitosamente")
        setFields(FieldsInitialState)
        console.log("%cData Uploaded", "color: green; font-weight: bolder", res.data)
      })
      .catch(err => console.error("ERROR => ", err)) 
  }


  // This function return the form in a generalized and dynamic way :D
  const ReturnFields = () => 
    Object.keys(Fields).map((item, index) => (
        <st.Field key={index}>
        <st.FieldTitle> {item} {index < Object.keys(Fields).length - 1 ? "*": ""} </st.FieldTitle>
        <Input
            value={Fields[item]}
            onChange={e => setFields({ ...Fields, [item]: e.target.value })}
        />
        </st.Field>
    ))


  return (
    <st.ManualLoadContainer>
        <st.Form>
            {ReturnFields()}
            <Button style={{width: '25%'}} type='primary' onClick={ValidateBeforeSend}> Crear </Button> 
        </st.Form>
    </st.ManualLoadContainer>
  );
};
