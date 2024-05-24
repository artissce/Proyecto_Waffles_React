import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/paquete/'; // Asegúrate de que esta URI coincida con tu endpoint del backend

const ShowPaq = () => {
    const [paquetes, setPaquetes] = useState([]);

    useEffect(() => {
        getPaquetes();
    }, []);

    // Procedimiento para obtener todos los paquetes
    const getPaquetes = async () => {
        try {
            const res = await axios.get(URI);
            setPaquetes(res.data);
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        }
    };

    // Procedimiento para eliminar un paquete
    const deletePaquete = async (idPaquete) => {
        try {
            await axios.delete(`${URI}${idPaquete}`);
            getPaquetes(); // Actualiza la lista después de la eliminación
        } catch (error) {
            console.error('Error deleting paquete:', error);
        }
    };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' align='center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/paquete/create" className='btn btn-primary mt-2 mb-2'>
                        <i className="fas fa-plus"></i>
                    </Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '10%' }}>ID</th>
                                    <th scope="col" style={{ width: '20%' }}>Nombre</th>
                                    <th scope="col" style={{ width: '10%' }}>Precio</th>
                                    <th scope="col" style={{ width: '15%' }}>Descripción</th>
                                    <th scope="col" style={{ width: '10%' }}>Cantidad</th>
                                    <th scope="col" style={{ width: '25%' }}>Productos</th>
                                    <th scope="col" style={{ width: '10%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paquetes.map((paquete) => (
                                    <tr key={paquete.idPaquete}>
                                        <td>{paquete.idPaquete}</td>
                                        <td>{paquete.nombre}</td>
                                        <td>{paquete.precio}</td>
                                        <td>{paquete.descripcion}</td>
                                        <td>{paquete.cantidadProducto}</td>
                                        <td>
                                            {paquete.assignedPro.map((producto) => (
                                                <div key={producto.idProducto}>
                                                    {producto.nombre} ({producto.categoria})
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            <Link to={`/paquete/edit/${paquete.idPaquete}`} className='btn btn-info'>
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => deletePaquete(paquete.idPaquete)} className='btn btn-danger'>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPaq;
