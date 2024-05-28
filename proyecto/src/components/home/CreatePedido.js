import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import { Link } from 'react-router-dom';

const URI_PEDIDOS = 'http://localhost:8000/pedidos/';
const URI_PAQUETES = 'http://localhost:8000/paquete/';
const URI_PRODUCTOS = 'http://localhost:8000/producto/';

const CreatePedido = () => {
    const [cliente, setCliente] = useState('');
    const [paquetes, setPaquetes] = useState([]);
    const [selectedPaquetes, setSelectedPaquetes] = useState([]);
    const [productos, setProductos] = useState({});
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState({});
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

    const addPaquete = () => {
        setSelectedPaquetes([...selectedPaquetes, '']);
    };

    const removePaquete = (index) => {
        const newSelectedPaquetes = [...selectedPaquetes];
        newSelectedPaquetes.splice(index, 1);
        setSelectedPaquetes(newSelectedPaquetes);

        const newProductos = { ...productos };
        delete newProductos[index];
        setProductos(newProductos);

        const newIngredientesSeleccionados = { ...ingredientesSeleccionados };
        delete newIngredientesSeleccionados[index];
        setIngredientesSeleccionados(newIngredientesSeleccionados);
    };

    const handlePaqueteChange = async (e, index) => {
        const paqueteId = e.target.value;
        const newSelectedPaquetes = [...selectedPaquetes];
        newSelectedPaquetes[index] = paqueteId;
        setSelectedPaquetes(newSelectedPaquetes);

        if (paqueteId) {
            try {
                const res = await axios.get(`${URI_PAQUETES}${paqueteId}`);
                const paquete = res.data;
                const newProductos = { ...productos, [index]: paquete.assignedPro || [] };
                setProductos(newProductos);

                const newIngredientesSeleccionados = { ...ingredientesSeleccionados, [index]: {} };
                for (const producto of paquete.assignedPro) {
                    const resProd = await axios.get(`${URI_PRODUCTOS}${producto.idProducto}`);
                    const productoData = resProd.data;
                    newIngredientesSeleccionados[index][producto.idProducto] = productoData.assignedIng.map(ing => ({
                        idIng: ing.idIng,
                        nombre: ing.nombre
                    }));
                }
                setIngredientesSeleccionados(newIngredientesSeleccionados);
            } catch (error) {
                console.error('Error fetching paquete:', error);
            }
        }
    };

    const handleIngredienteChange = (paqueteIndex, productoId, ingredienteId) => {
        setIngredientesSeleccionados(prevState => {
            const newIngredientesSeleccionados = { ...prevState };
            const ingredientes = newIngredientesSeleccionados[paqueteIndex][productoId] || [];
            if (ingredientes.some(ing => ing.idIng === ingredienteId)) {
                newIngredientesSeleccionados[paqueteIndex][productoId] = ingredientes.filter(ing => ing.idIng !== ingredienteId);
            } else {
                const ingrediente = ingredientesSeleccionados[paqueteIndex][productoId]?.find(ing => ing.idIng === ingredienteId);
                if (ingrediente) {
                    newIngredientesSeleccionados[paqueteIndex][productoId] = [...ingredientes, ingrediente];
                }
            }
            return newIngredientesSeleccionados;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedIngredientesSeleccionados = Object.values(ingredientesSeleccionados).flatMap(paquete =>
                Object.entries(paquete).map(([productoId, ingredientes]) => ({
                    productoId: parseInt(productoId),
                    ingredientes: ingredientes.map(ing => ing.idIng)
                }))
            );

            await axios.post(URI_PEDIDOS, {
                cliente,
                paquetes: selectedPaquetes,
                estado: 'En proceso',
                ingredientesSeleccionados: formattedIngredientesSeleccionados
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
                <button type="button" className="btn btn-secondary mb-3" onClick={addPaquete}>Añadir Paquete</button>
                {selectedPaquetes.map((selectedPaquete, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Paquete</label>
                        <select
                            className="form-select mb-2"
                            value={selectedPaquete}
                            onChange={(e) => handlePaqueteChange(e, index)}
                            required
                        >
                            <option value="">Selecciona un paquete</option>
                            {paquetes.map(paquete => (
                                <option key={paquete.idPaquete} value={paquete.idPaquete}>
                                    {paquete.nombre}
                                </option>
                            ))}
                        </select>
                        {productos[index]?.length > 0 && productos[index].map(producto => (
                            <div key={producto.idProducto} className="mb-3">
                                <label className="form-label">{producto.nombre}</label>
                                {ingredientesSeleccionados[index] && ingredientesSeleccionados[index][producto.idProducto]?.length > 0 ? (
                                    ingredientesSeleccionados[index][producto.idProducto].map(ingrediente => (
                                        <div key={ingrediente.idIng} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={ingrediente.idIng}
                                                onChange={() => handleIngredienteChange(index, producto.idProducto, ingrediente.idIng)}
                                            />
                                            <label className="form-check-label">
                                                {ingrediente.nombre}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay ingredientes disponibles para este producto.</p>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn btn-danger mb-3" onClick={() => removePaquete(index)}>Eliminar Paquete</button>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Crear Pedido</button>
            </form>
            <Link to="/home/pedidos" className="btn btn-secondary mt-2">Regresar</Link>
        </Container>
    );
};

export default CreatePedido;
