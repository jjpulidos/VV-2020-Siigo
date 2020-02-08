import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Screens/Login/Login';

import { Router, navigate } from '@reach/router';
import { Load } from './Screens/Load/Load';

const App = () => {
  useEffect(() => {
    navigate('login');
  }, []);

  return (
    <Router>
      <Login path='/login' />
      <Load path='load' />
    </Router>
  );
};

export default App;
