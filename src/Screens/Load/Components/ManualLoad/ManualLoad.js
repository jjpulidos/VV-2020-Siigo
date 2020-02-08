import React, { useState, useContext, useEffect } from 'react';
import * as st from './ManualLoad.styles';

export const ManualLoad = () => {
  const [Fields, setFields] = useState({
    Nombre: '',
    Descripción: '',
    Precio: '',
    'Fecha de Expiración': ''
  });

  const ReturnFields = () =>
    Fields.forEach((item, index) => (
      <st.Field key={index}>
        <st.FieldTitle> {item} </st.FieldTitle>
        <Input
          onChange={e => setFields({ ...Fields, [item]: e.target.value })}
        />
      </st.Field>
    ));

  return (
    <st.ManualLoadContainer>
      <st.Form>{ReturnFields}</st.Form>
    </st.ManualLoadContainer>
  );
};
