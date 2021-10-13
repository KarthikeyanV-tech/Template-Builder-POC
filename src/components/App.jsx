import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from './common/Login';
import Home from './common/Home';
import React from 'react';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login}>
      </Route>
      <Route path="/home" component={Home}>           
      </Route>
    </Switch>      
  );
}

export default App;
