import React, { useState, useContext, useEffect } from 'react';
import * as st from './Load.styles';
import { Button } from 'antd';
import { ManualLoad } from './Components/ManualLoad/ManualLoad';
import { MassiveLoad } from './Components/MassiveLoad/MassiveLoad';

export const Load = () => {
  const [LoadOption, setLoadOption] = useState(null);
  return (
    <st.LoadContainer>

    {/* This block let the user choose between the load options  */}
      <st.LoadOptionsContainer>
        <st.Title>Tipo de carga</st.Title>
        <Button onClick={() => setLoadOption(1)} type='primary'>
          {' '}
          Carga Manual{' '}
        </Button>
        <Button onClick={() => setLoadOption(2)} type='primary'>
          {' '}
          Carga Masiva{' '}
        </Button>
      </st.LoadOptionsContainer>


    {/* This tags render the load method depending of the selected option */}
      <st.SelectedLoadOptionContainer>
        {LoadOption && (
          <st.Title>
            {' '}
            {LoadOption === 1 ? 'Carga Manual' : 'Carga Masiva'}{' '}
          </st.Title>
        )}
        {
            LoadOption === 1 
                ? <ManualLoad />
                : LoadOption === 2 && <MassiveLoad />
        }
      </st.SelectedLoadOptionContainer>
    </st.LoadContainer>
  );
};
