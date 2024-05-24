import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const URI_PAQ = 'http://localhost:8000/paquete/';
const URI_PROD = 'http://localhost:8000/producto/';

const CreatePaq = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidadProducto, setCantidadProducto] = useState(1);
    const [productos, setProductos] = useState([]);
    const [productosList, setProductosList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProductosList();
    }, []);

    const getProductosList = async () => {
        try {
            const res = await axios.get(URI_PROD);
            console.log("Lista de productos:", res.data); // Verificar que los datos se reciban correctamente
            setProductosList(res.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const addProductoField = () => {
        setCantidadProducto(cantidadProducto + 1);
        setProductos([...productos, { idProducto: '', cantidad: 1 }]);
    };

    const removeProductoField = (index) => {
        const newProductos = [...productos];
        newProductos.splice(index, 1);
        setProductos(newProductos);
        setCantidadProducto(cantidadProducto - 1);
    };

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI_PAQ, {
                nombre,
                precio,
                descripcion,
                cantidadProducto,
                productos,
            });
            navigate('admin/paquete');
        } catch (error) {
            console.error("Error al crear el paquete:", error);
        }
    };

    return (
        <div align='center'>
            <h1>Crear Paquete</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className='form-control'
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Cantidad de Productos</label>
                    <button type='button' onClick={addProductoField} className='btn btn-success ml-2'>+</button>
                    {Array.from({ length: cantidadProducto }).map((_, index) => (
                        <div key={index} className='input-group mb-3'>
                            <select
                                value={productos[index]?.idProducto || ''}
                                onChange={(e) => setProductos(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = { ...newState[index], idProducto: e.target.value };
                                    return newState;
                                })}
                                className='form-control'
                            >
                                <option value='' disabled>Selecciona un producto</option>
                                {productosList.map(prod => (
                                    <option key={prod.idProducto} value={prod.idProducto}>{prod.nombre}</option>
                                ))}
                            </select>
                            <input
                                type='number'
                                value={productos[index]?.cantidad || 1}
                                onChange={(e) => setProductos(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = { ...newState[index], cantidad: parseInt(e.target.value) };
                                    return newState;
                                })}
                                className='form-control'
                            />
                            <button type='button' onClick={() => removeProductoField(index)} className='btn btn-danger'>-</button>
                        </div>
                    ))}
                </div>
                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    );
};

export default CreatePaq;
