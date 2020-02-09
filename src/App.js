import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Screens/Login/Login';

import { Router, navigate } from '@reach/router';
import { Load } from './Screens/Load/Load';
import { MainMenu } from './Screens/MainMenu/MainMenu';
import { ControlPanel } from './Screens/ControlPanel/ControlPanel';
import { AddClient } from './Screens/AddClient/AddClient';
import { Analitics } from './Screens/Analitics/Analitics';

const App = () => {
  useEffect(() => {
    //navigate('main-menu');
  }, []);

  return (
    <Router>
      <Login path='login' />
      <MainMenu path='main-menu' />
      <Load path='load' />
      <AddClient path='add-client' />
      <ControlPanel path='control-panel' />
      <Analitics path='analitics' />
    </Router>
  );
};

export default App;
