import logo from './logo.svg';
import './App.css';
import {Formulario} from './components/login/Formulario'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/home/Home';
import { useState } from 'react';
import { HomeAdmin } from './components/admin/HomeAdmin';
import React from 'react';
import { BrowserRouter, Route,Router,Switch } from 'react-router-dom';

function App() {
  const [usuario,setUsuario]=useState([])//arreglo vacio
  return (
    <div className="App">
      {
        /*!usuario.length > 0 ? <Formulario setUsuario={ setUsuario }/>  :  <Home/><HomeAdmin/>*/
      }
      <Router>
            <Switch>
                <Route path="/admin/HomeAdmin" component={HomeAdmin} />
                <Route path="/home/Home" component={Home} />
                <Route path="/">
                    <Formulario />
                </Route>
            </Switch>
        </Router>
    
      
   </div>
  );
}

export default App;
