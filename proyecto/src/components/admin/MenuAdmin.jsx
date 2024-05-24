import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAdmin.css'; // Archivo CSS para estilos personalizados

const MenuAdmin = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="menu-admin-container">
                        <h2 className="text-center mb-4">Admin Menu</h2>
                        <table className="menu-table table table-striped">
                            <tbody>
                                <tr>
                                    <td><Link to="/roles" className="btn btn-outline-primary btn-block">Gestionar Roles</Link></td>
                                    <td><Link to="/usuarios" className="btn btn-outline-primary btn-block">Gestionar Usuarios</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/tipo" className="btn btn-outline-primary btn-block">Gestionar Tipos</Link></td>
                                    <td><Link to="/ing" className="btn btn-outline-primary btn-block">Gestionar Ingredientes</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="/producto" className="btn btn-outline-primary btn-block">Gestionar Productos</Link></td>
                                    <td><Link to="/paquete" className="btn btn-outline-primary btn-block">Gestionar Paquetes</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuAdmin;
