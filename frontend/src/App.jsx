import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter aquí
import './App.css';
import {Formulario} from './components/login/Formulario'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/home/Home';
import { useState } from 'react';
import { HomeAdmin } from './components/admin/HomeAdmin';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//import { Switch, BrowserRouter, Route,Router } from 'react-router-dom';

function App() {
  const [usuario, setUsuario] = useState(null);
  const handleLogin = (user) => {
    // Actualizar el estado del componente padre con el usuario autenticado
    setUsuario(user);
  };
  return (
   /* */
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/admin/*" element={<HomeAdmin />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
