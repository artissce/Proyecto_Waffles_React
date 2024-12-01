import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Formulario } from './components/login/Formulario';
import { Home } from './components/home/Home';
import { HomeAdmin } from './components/admin/HomeAdmin';
import PaymentForm from './components/user/PaymentForm'; // Importar PaymentForm
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (user) => {
    // Actualizar el estado del componente padre con el usuario autenticado
    setUsuario(user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} /> {/* Ruta principal */}
        <Route path="/admin/*" element={<HomeAdmin />} /> {/* Ruta para el admin */}
        <Route path="/home/*" element={<Home />} /> {/* Ruta para el usuario común */}
        <Route path="/payment" element={<PaymentForm />} /> {/* Nueva ruta para el formulario de pago */}
        <Route path="/payment-confirmation" element={<PaymentForm />} /> {/* Nueva ruta para el formulario de pago */} 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
