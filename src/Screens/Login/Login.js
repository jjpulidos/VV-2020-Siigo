import React, { useState, useContext, useEffect } from 'react';
import * as st from './Login.styles.js';
import { Input, Button } from 'antd';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';

export const Login = () => {
  const [LoginCredentials, setLoginCredentials] = useState({
    email: '',
    pass: ''
  });

  useEffect(() => {
    CheckSession();
  }, []);

  const CheckSession = async () => {
    let session = await Auth.currentAuthenticatedUser();
    session && navigate('load');
  };

  const LoginService = async () => {
    Auth.signIn(LoginCredentials.email, LoginCredentials.pass)
      .then(res => console.log('successful logged in ', res))
      .catch(err => console.error(err));
  };

  return (
    <st.LoginMainContainer>
      <st.LoginBox>
        <st.Subtitle> Correo de la empresa </st.Subtitle>
        <Input
          onChange={e =>
            setLoginCredentials({ ...LoginCredentials, email: e.target.value })
          }
        />

        <st.Subtitle> Contraseña </st.Subtitle>
        <Input
          onChange={e =>
            setLoginCredentials({ ...LoginCredentials, pass: e.target.value })
          }
          type='password'
        />

        <Button
          type='primary'
          style={{ marginTop: '2em' }}
          onClick={LoginService}
        >
          {' '}
          Entrar{' '}
        </Button>
      </st.LoginBox>
    </st.LoginMainContainer>
  );
};
