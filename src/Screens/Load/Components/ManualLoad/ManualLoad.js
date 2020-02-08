import React, { useState, useContext, useEffect } from 'react';
import * as st from './ManualLoad.styles';
import { Input, Button } from 'antd';
import { CreateProductService } from '../../../../Services/CreateProduct.service'

export const ManualLoad = () => {
  const [Fields, setFields] = useState({
    "Nombre": '',
    "Descripción": '',
    "Precio": '',
    'Fecha de Expiración': ''
  });

  // This function uses the CreateProduct service function to upload the data to DynamoDB
  const SendData = () => {
      let data = {
        tenant_id: "111",
        name: Fields["Nombre"],
        description:  Fields["Descripción"],
        price:  parseFloat(Fields["Precio"]),
        expired_date:  Fields["Fecha de Expiración"]
      }
    
    CreateProductService(data)
      .then(res => console.log("%cData Uploaded", "color: green; font-weight: bolder", res.data))
      .catch(err => console.error("ERROR => ", err)) 
  }


  // This function return the form in a generalized and dynamic way :D
  const ReturnFields = () => 
    Object.keys(Fields).map((item, index) => (
        <st.Field key={index}>
        <st.FieldTitle> {item} </st.FieldTitle>
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
          <Button style={{width: '25%'}} type='primary' onClick={SendData}> Crear </Button> 
        </st.Form>
    </st.ManualLoadContainer>
  );
};
