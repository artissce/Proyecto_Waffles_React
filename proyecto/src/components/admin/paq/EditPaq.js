import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/paquete/';
const URI_PRODUCTOS = 'http://localhost:8000/producto/';

const EditPaq = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidadProducto, setCantidadProducto] = useState(0);
    const [productos, setProductos] = useState([]);
    const [selectedProductos, setSelectedProductos] = useState([]);
    const navigate = useNavigate();
    const { idPaquete } = useParams();

    useEffect(() => {
        getPaqueteById();
        getProductos();
    }, []);

    const getPaqueteById = async () => {
        try {
            const res = await axios.get(`${URI}${idPaquete}`);
            const paquete = res.data;
            setNombre(paquete.nombre);
            setPrecio(paquete.precio);
            setDescripcion(paquete.descripcion);
            setCantidadProducto(paquete.cantidadProducto);
            setSelectedProductos(paquete.assignedPro.map(pro => ({
                idProducto: pro.idProducto,
                cantidad: pro.producto_paquete.cantidad
            })));
        } catch (error) {
            console.error('Error fetching paquete:', error);
        }
    };

    const getProductos = async () => {
        try {
            const res = await axios.get(URI_PRODUCTOS);
            setProductos(res.data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const updatePaq = async (e) => {
        e.preventDefault();
        try {
            const paqueteData = {
                nombre,
                precio,
                descripcion,
                cantidadProducto,
                productos: selectedProductos,
            };
            await axios.put(`${URI}${idPaquete}`, paqueteData);
            navigate('/paquete');
        } catch (error) {
            console.error('Error updating paquete:', error);
        }
    };

    const handleProductoChange = (index, field, value) => {
        const newSelectedProductos = [...selectedProductos];
        newSelectedProductos[index] = {
            ...newSelectedProductos[index],
            [field]: value,
        };
        setSelectedProductos(newSelectedProductos);
    };

    const addProductoField = () => {
        setSelectedProductos([...selectedProductos, { idProducto: '', cantidad: 1 }]);
    };

    const removeProductoField = (index) => {
        const newSelectedProductos = selectedProductos.filter((_, i) => i !== index);
        setSelectedProductos(newSelectedProductos);
    };

    return (
        <div className="container">
            <h3>Editar Paquete</h3>
            <form onSubmit={updatePaq}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad de Productos</label>
                    <input
                        type="number"
                        className="form-control"
                        value={cantidadProducto}
                        onChange={(e) => setCantidadProducto(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Productos</label>
                    {selectedProductos.map((producto, index) => (
                        <div key={index} className="d-flex mb-2">
                            <select
                                className="form-select"
                                value={producto.idProducto}
                                onChange={(e) =>
                                    handleProductoChange(index, 'idProducto', e.target.value)
                                }
                            >
                                <option value="">Seleccione un producto</option>
                                {productos.map((prod) => (
                                    <option key={prod.idProducto} value={prod.idProducto}>
                                        {prod.nombre}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="form-control mx-2"
                                value={producto.cantidad}
                                onChange={(e) =>
                                    handleProductoChange(index, 'cantidad', e.target.value)
                                }
                                min="1"
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeProductoField(index)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addProductoField}>
                        Añadir Producto
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">
                    Actualizar Paquete
                </button>
            </form>
        </div>
    );
};

export default EditPaq;
