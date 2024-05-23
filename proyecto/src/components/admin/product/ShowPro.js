import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/producto/';

const ShowPro = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getPro();
    }, []);

    // Procedure to fetch all products
    const getPro = async () => {
        try {
            const res = await axios.get(URI);
            setProductos(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Procedure to delete a product
    const deletePro = async (idProducto) => {
        try {
            await axios.delete(`${URI}${idProducto}`);
            getPro(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' align='center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/pro/create" className='btn btn-primary mt-2 mb-2'>
                        <i className="fas fa-plus"></i>
                    </Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '10%' }}>ID</th>
                                    <th scope="col" style={{ width: '20%' }}>Nombre</th>
                                    <th scope="col" style={{ width: '10%' }}>Precio</th>
                                    <th scope="col" style={{ width: '15%' }}>Categoría</th>
                                    <th scope="col" style={{ width: '25%' }}>Descripción</th>
                                    <th scope="col" style={{ width: '10%' }}>Ingredientes</th> {/* Nueva columna para mostrar ingredientes */}
                                    <th scope="col" style={{ width: '10%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>
                                            {producto.ingredientes && Array.isArray(producto.ingredientes) ? (
                                                <ul>
                                                    {producto.ingredientes.map((ingrediente) => (
                                                        <li key={ingrediente.idIng}>{ingrediente.nombreIng}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>No hay ingredientes</span>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/producto/edit/${producto.idProducto}`} className='btn btn-info'>
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => deletePro(producto.idProducto)} className='btn btn-danger'>
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

export default ShowPro;
