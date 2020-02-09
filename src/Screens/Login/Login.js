import React, { useState, useContext, useEffect } from 'react';
import * as st from './Login.styles.js';
import { Input, Button, Icon } from 'antd';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';

export const Login = () => {
  const [LoginCredentials, setLoginCredentials] = useState({
    email: '',
    pass: ''
  });
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    CheckSession();
  }, []);

  const CheckSession = async () => {
    let session = await Auth.currentAuthenticatedUser();
    session && navigate('main-menu');
  };

  const LoginService = async () => {
    setLoading(true)
    Auth.signIn(LoginCredentials.email, LoginCredentials.pass)
      .then(res => {
        localStorage.setItem('user-id', res.attributes.sub)
        console.log('successful logged in ', res)
        navigate('main-menu')
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      });
  };


  // This is an utility function, just for create tenants
  const Register = async () => {
    try {
      let response = await Auth.signUp(LoginCredentials.email, LoginCredentials.pass)
      console.log(response.attributes.sub)
    }catch (err){
      console.error(err)
    }
  }

  const Confirm = async () => {
    let res = await Auth.confirmSignUp(LoginCredentials.email, LoginCredentials.pass)
    console.log(res)
  }

  return (
    <st.LoginMainContainer>

      <st.ImageWrapper src={require('../../Assets/logo_vvc.svg')} />

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
          style={{ width: '100%', marginTop: '2em' }}
          onClick={LoginService}
        >
         {Loading ? <Icon type='loading' style={{color: 'white'}} /> : "Ingresar"}
        </Button>
      </st.LoginBox>
    </st.LoginMainContainer>
  );
};
