import logo from './logo.svg';
import './App.css';
import {Formulario} from './components/login/Formulario'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/home/Home';
import { useState } from 'react';
function App() {
  const [usuario,setUsuario]=useState([])//arreglo vacio
  return (
    <div className="App">
      {
        !usuario.length > 0 ? <Formulario setUsuario={ setUsuario }/>  :  <Home/>
      }
    </div>
  );
}

export default App;
