import React, { useState, useContext, useEffect } from 'react';
import * as st from './Load.styles';
import { Button } from 'antd';
import { ManualLoad } from './Components/ManualLoad/ManualLoad';

export const Load = () => {
  const [LoadOption, setLoadOption] = useState(null);
  return (
    <st.LoadContainer>
      <st.LoadOptionsContainer>
        <st.Title>Tipo de carga</st.Title>
        <Button onClick={() => setLoadOption(1)} type='primary'>
          {' '}
          Carga Manual{' '}
        </Button>
        <Button onClick={() => setLoadOption(2)} type='primary'>
          {' '}
          Carga CSV{' '}
        </Button>
      </st.LoadOptionsContainer>

      <st.SelectedLoadOptionContainer>
        {LoadOption && (
          <st.Title>
            {' '}
            {LoadOption === 1 ? 'Carga Manual' : 'Carga CSV'}{' '}
          </st.Title>
        )}
      </st.SelectedLoadOptionContainer>
    </st.LoadContainer>
  );
};
