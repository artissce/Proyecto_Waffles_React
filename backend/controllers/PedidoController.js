import PedidoModel from "../models/PedidoModel.js";
import PaqueteModel from "../models/PaqueteModel.js";
import ProductoModel from "../models/ProductoModel.js";
import IngredientesModel from "../models/IngredientesModel.js";
import PedidoDetalleModel from "../models/PedidoDetalleModel.js";
import PagoModel from "../models/PagoModel.js"; // Nuevo modelo para pagos
import { Op } from "sequelize";

/* METODOS PARA EL CRUD */

// Obtener todos los detalles de los pedidos
export const getAllPedidoDetalles = async (req, res) => {
    try {
        const pedidoDetalles = await PedidoDetalleModel.findAll({
            include: [
                {
                    model: ProductoModel,
                    as: 'producto',
                    attributes: ['nombre']
                },
                {
                    model: IngredientesModel,
                    as: 'ingrediente',
                    attributes: ['nombre']
                }
            ]
        });

        console.log('Pedido Detalles Recuperados:', JSON.stringify(pedidoDetalles, null, 2));

        res.json(pedidoDetalles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtener todos los pedidos
export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes', 'metodoPago', 'estadoPago'],
            include: [
                {
                    model: PaqueteModel,
                    as: "assignedPaq",
                    attributes: ['idPaquete', 'nombre', 'precio'],
                    include: {
                        model: ProductoModel,
                        as: 'assignedPro',
                        attributes: ['idProducto', 'nombre']
                    }
                },
                {
                    model: PedidoDetalleModel,
                    as: 'detalles',
                    attributes: ['idProducto', 'idIng', 'cantidad'],
                    include: [
                        {
                            model: IngredientesModel,
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: PagoModel,
                    attributes: ['idPago', 'monto', 'fechaHora', 'idTransaccion']
                }
            ]
        });

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pedido por ID
export const getPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.findByPk(req.params.idPedido, {
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes', 'metodoPago', 'estadoPago'],
            include: [
                {
                    model: PaqueteModel,
                    as: "assignedPaq",
                    attributes: ['idPaquete', 'nombre', 'precio'],
                    include: {
                        model: ProductoModel,
                        as: 'assignedPro',
                        attributes: ['idProducto', 'nombre']
                    }
                },
                {
                    model: PedidoDetalleModel,
                    as: 'detalles',
                    attributes: ['idProducto', 'idIng', 'cantidad'],
                    include: [
                        {
                            model: IngredientesModel,
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: PagoModel,
                    attributes: ['idPago', 'monto', 'fechaHora', 'idTransaccion']
                }
            ]
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/* METODOS PARA EL CRUD */

// Obtener todos los pedidos por fecha
export const getAllPedidosByDate = async (req, res) => {
    try {
        const { fecha } = req.params;

        const pedidos = await PedidoModel.findAll({
            where: { fecha: { [Op.eq]: fecha } },
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes', 'metodoPago', 'estadoPago'],
            include: [
                {
                    model: PaqueteModel,
                    as: "assignedPaq",
                    attributes: ['idPaquete', 'nombre', 'precio'],
                    include: {
                        model: ProductoModel,
                        as: 'assignedPro',
                        attributes: ['idProducto', 'nombre', 'cantIng']
                    }
                },
                {
                    model: PedidoDetalleModel,
                    as: 'detalles',
                    attributes: ['idProducto', 'idIng', 'cantidad'],
                    include: {
                        model: IngredientesModel,
                        attributes: ['nombre']
                    }
                },
                {
                    model: PagoModel,
                    as: 'pagos', // Usa el alias que definiste en la asociación
                    attributes: ['idPago', 'monto', 'fechaHora', 'idTransaccion']
                }
            ]
        });

        res.json(pedidos);
    } catch (error) {
        console.error('Error obteniendo pedidos por fecha:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


// Crear un pedido
// Crear un pedido
export const createPedido = async (req, res) => {
    try {
        const { cliente, paquetes, estado, metodoPago, ingredientesSeleccionados, totalPagado, token } = req.body;

        // Validar paquetes seleccionados
        const selectedPaquetes = await PaqueteModel.findAll({
            where: { idPaquete: paquetes },
            include: { model: ProductoModel, as: 'assignedPro' },
        });

        if (!selectedPaquetes || selectedPaquetes.length !== paquetes.length) {
            return res.status(404).json({ message: 'Uno o más paquetes seleccionados no existen.' });
        }

        // Calcular total
        const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);

        // Crear el pedido
        const newPedido = await PedidoModel.create({
            cliente,
            fecha: new Date().toISOString().slice(0, 10),
            hora: new Date().toLocaleTimeString("es-MX", { timeZone: "America/Mexico_City" }),
            estado: estado || "En proceso",
            total,
            cantidadPaquetes: paquetes.length,
            metodoPago,
            estadoPago: metodoPago === "Tarjeta" ? 1 : 0, // Estado del pago basado en el método
        });

        // Relacionar paquetes con el pedido
        if (selectedPaquetes.length > 0) {
            await newPedido.addAssignedPaq(selectedPaquetes);
        }

        // Crear detalles del pedido
        for (const ing of ingredientesSeleccionados) {
            await PedidoDetalleModel.create({
                idPedido: newPedido.idPedido,
                idProducto: ing.productoId,
                idIng: ing.ingredienteId,
                cantidad: ing.cantidad || 1,
            });
        }

        // Manejar pagos con tarjeta
        let idTransaccion = null;

        if (metodoPago === "Tarjeta") {
            const stripe = require("stripe")("tu-clave-secreta-de-stripe"); // Sustituye con tu clave de Stripe
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(totalPagado * 100), // Stripe trabaja con centavos
                    currency: "mxn",
                    payment_method: token, // El token generado por el frontend
                    confirmation_method: "manual",
                    confirm: true,
                });

                idTransaccion = paymentIntent.id;

                // Verificar estado del pago
                if (paymentIntent.status === "succeeded") {
                    await PagoModel.create({
                        idPedido: newPedido.idPedido,
                        monto: totalPagado || total,
                        fechaHora: new Date(),
                        idTransaccion,
                    });
                } else {
                    throw new Error("El pago con tarjeta no se completó.");
                }
            } catch (error) {
                console.error("Error procesando el pago con Stripe:", error.message);
                throw new Error("Error procesando el pago con tarjeta.");
            }
        }

        res.json({
            message: "Pedido creado correctamente.",
            idPedido: newPedido.idPedido,
        });
    } catch (error) {
        console.error("Error creando el pedido:", error);
        res.status(500).json({ message: "Ocurrió un error al crear el pedido." });
    }
};




// Actualizar un pedido
export const updatePedido = async (req, res) => {
    try {
        const { paquetes, estado, cliente, metodoPago, ingredientesSeleccionados, totalPagado, idTransaccion } = req.body;
        const { idPedido } = req.params;

        const pedido = await PedidoModel.findByPk(idPedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const selectedPaquetes = await PaqueteModel.findAll({ where: { idPaquete: paquetes } });
        const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);

        // Actualizar los datos del pedido
        await pedido.update({
            cliente,
            estado,
            metodoPago,
            total,
            cantidadPaquetes: paquetes.length,
        });

        // Actualizar los paquetes asignados
        await pedido.setAssignedPaq(selectedPaquetes);

        // Actualizar los detalles del pedido
        for (const ing of ingredientesSeleccionados) {
            await PedidoDetalleModel.upsert({
                idPedido,
                idProducto: ing.productoId,
                idIng: ing.ingredienteId,
                cantidad: ing.cantidad || 1,
            });
        }

        // Manejar el registro de pago
        if (metodoPago === "Tarjeta") {
            const existingPago = await PagoModel.findOne({ where: { idPedido } });
            if (existingPago) {
                await existingPago.update({
                    monto: totalPagado || total,
                    idTransaccion,
                    fechaHora: new Date(),
                });
            } else {
                await PagoModel.create({
                    idPedido,
                    monto: totalPagado || total,
                    idTransaccion,
                    fechaHora: new Date(),
                });
            }
        } else {
            // Si el método cambia a efectivo, eliminar el pago
            await PagoModel.destroy({ where: { idPedido } });
        }

        res.json({ message: "Pedido actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Eliminar un pedido
export const deletePedido = async (req, res) => {
    try {
        const { idPedido } = req.params;

        const pedido = await PedidoModel.findByPk(idPedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await PedidoDetalleModel.destroy({ where: { idPedido } });
        await PagoModel.destroy({ where: { idPedido } });
        await pedido.destroy();

        res.json({ message: "Pedido eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};