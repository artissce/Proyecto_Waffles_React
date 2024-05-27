import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/pedidos/';
const URI_PAQUETES = 'http://localhost:8000/paquetes/';

const CreatePedido = () => {
    const [cliente, setCliente] = useState('');
    const [paquetes, setPaquetes] = useState([]);
    const [selectedPaquete, setSelectedPaquete] = useState('');
    const [productos, setProductos] = useState([]);
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPaquetes();
    }, []);

    const getPaquetes = async () => {
        try {
            const res = await axios.get(URI_PAQUETES);
            setPaquetes(res.data);
        } catch (error) {
            console.error('Error fetching paquetes:', error);
        }
    };

    const handlePaqueteChange = async (e) => {
        const idPaquete = e.target.value;
        setSelectedPaquete(idPaquete);
        if (idPaquete) {
            const res = await axios.get(`${URI_PAQUETES}${idPaquete}`);
            const paquete = res.data;
            setProductos(paquete.assignedPro);
            setIngredientesSeleccionados(paquete.assignedPro.map(producto => ({
                idPaquete: producto.idProducto,
                ingredientes: []
            })));
        } else {
            setProductos([]);
            setIngredientesSeleccionados([]);
        }
    };

    const handleIngredienteChange = (idProducto, idIng) => {
        setIngredientesSeleccionados(prevState =>
            prevState.map(item =>
                item.idProducto === idProducto
                    ? {
                        ...item,
                        ingredientes: item.ingredientes.includes(idIng)
                            ? item.ingredientes.filter(id => id !== idIng)
                            : [...item.ingredientes, idIng]
                    }
                    : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI, {
                cliente,
                paquetes: [selectedPaquete],
                estado: 'En proceso',
                ingredientesSeleccionados
            });
            navigate('/home/pedidos');
        } catch (error) {
            console.error('Error creating pedido:', error);
        }
    };

    return (
        <Container>
            <h1>Crear Pedido</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Paquete</label>
                    <select
                        className="form-select"
                        value={selectedPaquete}
                        onChange={handlePaqueteChange}
                        required
                    >
                        <option value="">Selecciona un paquete</option>
                        {paquetes.map(paquete => (
                            <option key={paquete.idPaquete} value={paquete.idPaquete}>
                                {paquete.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {productos.map(producto => (
                    <div key={producto.idProducto} className="mb-3">
                        <label className="form-label">{producto.nombre}</label>
                        {producto.assignedIng.map(ingrediente => (
                            <div key={ingrediente.idIng} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={ingrediente.idIng}
                                    onChange={() => handleIngredienteChange(producto.idProducto, ingrediente.idIng)}
                                />
                                <label className="form-check-label">
                                    {ingrediente.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Crear Pedido</button>
            </form>
            <Link to="/home/pedidos" className='btn btn-secondary mt-2'>Regresar</Link>
        </Container>
    );
};

export default CreatePedido;
