import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import PaymentForm from '../PaymentForm'; // Componente de Stripe para pagos con tarjeta

const URI_PEDIDOS = 'http://localhost:8000/pedidos/';
const URI_PAQUETES = 'http://localhost:8000/paquete/';
const URI_PRODUCTOS = 'http://localhost:8000/producto/';

const CreatePedido = () => {
    const [cliente, setCliente] = useState('');
    const [paquetes, setPaquetes] = useState([]);
    const [selectedPaquetes, setSelectedPaquetes] = useState([]);
    const [productos, setProductos] = useState({});
    const [ingredientesDisponibles, setIngredientesDisponibles] = useState({});
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState({});
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [monto, setMonto] = useState(0);
    const [pedidoId, setPedidoId] = useState(null);
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

    const handleIngredienteRemove = (paqueteIndex, productoId, ingredienteId) => {
        setIngredientesSeleccionados((prevState) => {
            const newIngredientesSeleccionados = { ...prevState };
            if (
                newIngredientesSeleccionados[paqueteIndex] &&
                newIngredientesSeleccionados[paqueteIndex][productoId]
            ) {
                newIngredientesSeleccionados[paqueteIndex][productoId] = newIngredientesSeleccionados[
                    paqueteIndex
                ][productoId].filter((ing) => ing.idIng !== ingredienteId);
            }
            return newIngredientesSeleccionados;
        });
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

        const newIngredientesDisponibles = { ...ingredientesDisponibles };
        delete newIngredientesDisponibles[index];
        setIngredientesDisponibles(newIngredientesDisponibles);

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

                const newIngredientesDisponibles = { ...ingredientesDisponibles, [index]: {} };
                const newIngredientesSeleccionados = { ...ingredientesSeleccionados, [index]: {} };

                for (const producto of paquete.assignedPro) {
                    const resProd = await axios.get(`${URI_PRODUCTOS}${producto.idProducto}`);
                    const productoData = resProd.data;
                    newIngredientesDisponibles[index][producto.idProducto] = productoData.assignedIng.map(ing => ({
                        idIng: ing.idIng,
                        nombre: ing.nombre,
                    }));
                    newIngredientesSeleccionados[index][producto.idProducto] = [];
                }
                setIngredientesDisponibles(newIngredientesDisponibles);
                setIngredientesSeleccionados(newIngredientesSeleccionados);
            } catch (error) {
                console.error('Error fetching paquete:', error);
            }
        }
    };

    const handleIngredienteAdd = (paqueteIndex, productoId) => {
        const selectedIngredientId = parseInt(
            document.getElementById(`select-${paqueteIndex}-${productoId}`).value
        );
        setIngredientesSeleccionados(prevState => {
            const newIngredientesSeleccionados = { ...prevState };
            if (!newIngredientesSeleccionados[paqueteIndex]) {
                newIngredientesSeleccionados[paqueteIndex] = {};
            }
            if (!newIngredientesSeleccionados[paqueteIndex][productoId]) {
                newIngredientesSeleccionados[paqueteIndex][productoId] = [];
            }

            const ingredientes = newIngredientesSeleccionados[paqueteIndex][productoId];
            if (!ingredientes.some(ing => ing.idIng === selectedIngredientId)) {
                const ingrediente = ingredientesDisponibles[paqueteIndex][productoId].find(
                    ing => ing.idIng === selectedIngredientId
                );
                if (ingrediente) {
                    newIngredientesSeleccionados[paqueteIndex][productoId] = [
                        ...ingredientes,
                        ingrediente,
                    ];
                }
            }
            return newIngredientesSeleccionados;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedIngredientesSeleccionados = Object.entries(ingredientesSeleccionados).flatMap(([paqueteIndex, paquete]) =>
                Object.entries(paquete).flatMap(([productoId, ingredientes]) =>
                    ingredientes.map(ing => ({
                        productoId: parseInt(productoId),
                        ingredienteId: ing.idIng,
                    }))
                )
            );
    
            const pedidoData = {
                cliente,
                paquetes: selectedPaquetes,
                estado: 'En proceso',
                metodoPago,
                ingredientesSeleccionados: formattedIngredientesSeleccionados,
            };
    
            if (metodoPago === 'Tarjeta') {
                // Generar el token con PaymentForm
                const stripe = window.Stripe("pk_test_51QR0G4RsZYaPFezKssehsZe72JzAuR7TZUnFdItrIYCJ2fybPKYYdFtRT85VJZim9Ob94HkehOqNH2Lnorox004m00viOw6JFZ"); // Sustituye con tu clave pública de Stripe
                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: "card",
                    card: { /* Pasa los datos del formulario de tarjeta */ },
                });
    
                if (error) {
                    console.error("Error generando token de Stripe:", error.message);
                    alert("Hubo un problema al procesar el pago con tarjeta.");
                    return;
                }
    
                pedidoData.token = paymentMethod.id; // Añade el token al pedido
                pedidoData.totalPagado = monto; // Añade el monto al pedido
            }
    
            const pedidoResponse = await axios.post(URI_PEDIDOS, pedidoData);
            const idPedidoCreado = pedidoResponse.data.idPedido;
    
            alert("Pedido creado correctamente.");
            navigate('/home/pedidos');
        } catch (error) {
            console.error("Error creando el pedido:", error);
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
                    <label className="form-label">Método de Pago</label>
                    <select
                        className="form-select"
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                        required
                    >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                    </select>
                </div>
                <button type="button" className="btn btn-secondary mb-3" onClick={addPaquete}>
                    Añadir Paquete
                </button>
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
                                <div className="d-flex">
                                    <select id={`select-${index}-${producto.idProducto}`} className="form-select">
                                        {ingredientesDisponibles[index]?.[producto.idProducto]?.map(
                                            ingrediente => (
                                                <option key={ingrediente.idIng} value={ingrediente.idIng}>
                                                    {ingrediente.nombre}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-primary ms-2"
                                        onClick={() => handleIngredienteAdd(index, producto.idProducto)}
                                    >
                                        Agregar
                                    </button>
                                </div>
                                <ul className="list-group mt-2">
                                    {ingredientesSeleccionados[index]?.[producto.idProducto]?.map(
                                        ingrediente => (
                                            <li
                                                key={ingrediente.idIng}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >
                                                {ingrediente.nombre}
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleIngredienteRemove(index, producto.idProducto, ingrediente.idIng)}
                                                >
                                                    Eliminar
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-danger mb-3"
                            onClick={() => removePaquete(index)}
                        >
                            Eliminar Paquete
                        </button>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3">
                    Crear Pedido
                </button>
            </form>
        </Container>
    );
};

export default CreatePedido;
