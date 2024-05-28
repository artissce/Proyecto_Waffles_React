import PedidoModel from "../models/PedidoModel.js";
import PaqueteModel from "../models/PaqueteModel.js";
import ProductoModel from "../models/ProductoModel.js";
import IngredientesModel from "../models/IngredientesModel.js";
import PedidoDetalleModel from "../models/PedidoDetalleModel.js"; // Importar el modelo de detalles del pedido

/* METODOS PARA EL CRUD */
import { Op } from 'sequelize'; // Importa Op de Sequelize para operadores de consulta

// Mostrar todos los registros de pedidos con los paquetes, productos e ingredientes relacionados por fecha
export const getAllPedidosByDate = async (req, res) => {
    try {
        const { fecha } = req.params; // Obtener la fecha de los parámetros de la solicitud

        const pedidos = await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes'],
            where: {
                fecha: {
                    [Op.eq]: fecha // Filtrar por la fecha proporcionada
                }
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
                }
            ]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mostrar todos los registros de pedidos con los paquetes, productos e ingredientes relacionados
export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes'],
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
                }
            ]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un pedido por ID con los paquetes, productos e ingredientes relacionados
export const getPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.findByPk(req.params.idPedido, {
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total', 'cantidadPaquetes'],
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
                }
            ]
        });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un pedido
export const createPedido = async (req, res) => {
    try {
        const { cliente, paquetes, estado, ingredientesSeleccionados } = req.body;

        const selectedPaquetes = await PaqueteModel.findAll({
            where: {
                idPaquete: paquetes
            },
            include: {
                model: ProductoModel,
                as: 'assignedPro',
                include: {
                    model: IngredientesModel,
                    as: 'assignedIng'
                }
            }
        });

        if (!selectedPaquetes || selectedPaquetes.length !== paquetes.length) {
            return res.status(404).json({ message: 'Uno o más paquetes no encontrados' });
        }

        const hoy = new Date();
        const fechaFormateada = hoy.toISOString().slice(0, 10);
        const horaActual = hoy.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' });

        const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);

        const newPedido = await PedidoModel.create({
            cliente,
            fecha: fechaFormateada,
            hora: horaActual,
            estado,
            total,
            cantidadPaquetes: paquetes.length
        });

        await newPedido.addAssignedPaq(selectedPaquetes);

        // Manejar ingredientes seleccionados
        console.log(`Ingredientes seleccionados recibidos: ${JSON.stringify(ingredientesSeleccionados)}`);
        for (const ing of ingredientesSeleccionados) {
            console.log(`Procesando productoId: ${ing.productoId}, ingredienteId: ${ing.ingredienteId}`);
            await PedidoDetalleModel.create({
                idPedido: newPedido.idPedido,
                idProducto: ing.productoId,
                idIng: ing.ingredienteId,
                cantidad: 1 // Puedes ajustar la cantidad según tus necesidades
            });
        }

        res.json({ message: "Pedido registrado correctamente" });
    } catch (error) {
        console.error('Error creating pedido:', error);
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un pedido
export const updatePedido = async (req, res) => {
    try {
        const { paquetes, estado, cliente, ingredientesSeleccionados } = req.body;
        const { idPedido } = req.params;

        console.log(`Actualizando pedido ${idPedido} con cliente: ${cliente}, estado: ${estado}, paquetes: ${paquetes}`);

        const pedido = await PedidoModel.findByPk(idPedido, {
            include: {
                model: PaqueteModel,
                as: 'assignedPaq',
                include: {
                    model: ProductoModel,
                    as: 'assignedPro',
                    include: {
                        model: IngredientesModel,
                        as: 'assignedIng'
                    }
                }
            }
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        console.log(`Pedido encontrado: ${JSON.stringify(pedido)}`);

        // Actualizar campos del pedido
        await pedido.update({ cliente, estado });

        if (paquetes && paquetes.length > 0) {
            const selectedPaquetes = await PaqueteModel.findAll({
                where: {
                    idPaquete: paquetes
                },
                include: {
                    model: ProductoModel,
                    as: 'assignedPro',
                    include: {
                        model: IngredientesModel,
                        as: 'assignedIng'
                    }
                }
            });

            if (!selectedPaquetes || selectedPaquetes.length !== paquetes.length) {
                return res.status(404).json({ message: 'Uno o más paquetes no encontrados' });
            }

            console.log(`Paquetes seleccionados: ${JSON.stringify(selectedPaquetes)}`);

            // Eliminar relaciones existentes
            await pedido.setAssignedPaq([]);
            await PedidoDetalleModel.destroy({ where: { idPedido: idPedido } }); // Eliminar detalles anteriores

            // Añadir los nuevos paquetes
            await pedido.addAssignedPaq(selectedPaquetes);

            // Manejar ingredientes seleccionados
            console.log(`Ingredientes seleccionados recibidos: ${JSON.stringify(ingredientesSeleccionados)}`);
            for (const ing of ingredientesSeleccionados) {
                console.log(`Procesando productoId: ${ing.productoId}, ingredienteId: ${ing.ingredienteId}`);
                await PedidoDetalleModel.create({
                    idPedido: idPedido,
                    idProducto: ing.productoId,
                    idIng: ing.ingredienteId,
                    cantidad: 1 // Puedes ajustar la cantidad según tus necesidades
                });
            }

            // Actualizar el total y cantidad de paquetes
            const total = selectedPaquetes.reduce((acc, paquete) => acc + paquete.precio, 0);
            await pedido.update({ total, cantidadPaquetes: paquetes.length });

            console.log(`Pedido actualizado con nuevos paquetes y total: ${total}`);
        } else {
            console.log('Actualizando pedido sin cambiar los paquetes');
        }

        res.json({ message: 'Pedido actualizado correctamente' });
    } catch (error) {
        console.error('Error actualizando el pedido:', error);
        res.status(500).json({ message: error.message });
    }
};


// Eliminar un pedido
export const deletePedido = async (req, res) => {
    try {
        const idPedido = req.params.idPedido;

        const pedido = await PedidoModel.findByPk(idPedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await pedido.setAssignedPaq([]);
        await PedidoDetalleModel.destroy({ where: { idPedido: idPedido } }); // Eliminar detalles del pedido

        await PedidoModel.destroy({
            where: { idPedido: idPedido }
        });

        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status500.json({ message: error.message });
    }
};
