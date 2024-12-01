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

// Mostrar pedidos por fecha
export const getAllPedidosByDate = async (req, res) => {
    try {
        const { fecha } = req.params;

        const pedidos = await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes', 'metodoPago', 'estadoPago'],
            where: {
                fecha: { [Op.eq]: fecha }
            },
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
                    include: [
                        {
                            model: IngredientesModel,
                            as: 'ingrediente',
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

// Crear un pedido
export const createPedido = async (req, res) => {
    try {
        const { cliente, paquetes, estado, metodoPago, ingredientesSeleccionados, totalPagado, idTransaccion } = req.body;

        const selectedPaquetes = await PaqueteModel.findAll({
            where: { idPaquete: paquetes },
            include: { model: ProductoModel, as: 'assignedPro' }
        });

        if (!selectedPaquetes || selectedPaquetes.length !== paquetes.length) {
            return res.status(404).json({ message: 'Uno o más paquetes no encontrados' });
        }

        const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);

        const newPedido = await PedidoModel.create({
            cliente,
            fecha: new Date().toISOString().slice(0, 10),
            hora: new Date().toLocaleTimeString("es-MX", { timeZone: "America/Mexico_City" }),
            estado,
            total,
            cantidadPaquetes: paquetes.length,
            metodoPago,
            estadoPago: metodoPago === "Tarjeta" ? 1 : 0
        });

        await newPedido.addAssignedPaq(selectedPaquetes);

        for (const ing of ingredientesSeleccionados) {
            await PedidoDetalleModel.create({
                idPedido: newPedido.idPedido,
                idProducto: ing.productoId,
                idIng: ing.ingredienteId,
                cantidad: ing.cantidad || 1
            });
        }

        if (metodoPago === "Tarjeta") {
            await PagoModel.create({
                idPedido: newPedido.idPedido,
                monto: totalPagado,
                fechaHora: new Date(),
                idTransaccion
            });
        }

        res.json({ message: "Pedido creado correctamente.", idPedido: newPedido.idPedido });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un pedido
export const updatePedido = async (req, res) => {
    try {
        const { paquetes, estado, cliente, metodoPago, ingredientesSeleccionados } = req.body;
        const { idPedido } = req.params;

        const pedido = await PedidoModel.findByPk(idPedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const selectedPaquetes = await PaqueteModel.findAll({ where: { idPaquete: paquetes } });

        const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);

        await pedido.update({ cliente, estado, metodoPago, total, cantidadPaquetes: paquetes.length });

        await pedido.setAssignedPaq(selectedPaquetes);

        await PedidoDetalleModel.destroy({ where: { idPedido } });

        for (const ing of ingredientesSeleccionados) {
            await PedidoDetalleModel.create({
                idPedido,
                idProducto: ing.productoId,
                idIng: ing.ingredienteId,
                cantidad: ing.cantidad || 1
            });
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
