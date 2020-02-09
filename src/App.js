import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Screens/Login/Login';

import { Router, navigate } from '@reach/router';
import { Load } from './Screens/Load/Load';
import { MainMenu } from './Screens/MainMenu/MainMenu';

const App = () => {
  useEffect(() => {
    navigate('mainmenu');
  }, []);

  return (
    <Router>
      <Login path='login' />
      <MainMenu path='mainmenu' />
      <Load path='load' />
    </Router>
  );
};

export default App;
