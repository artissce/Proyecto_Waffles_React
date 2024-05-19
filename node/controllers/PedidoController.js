import PedidoModel from "../models/PedidoModel.js";

/*METODOS PARA EL CRUD */

import PaqueteModel from "../models/PaqueteModel.js"; // Importa el modelo de PaqueteModel.js

// Mostrar todos los registros de pedidos
// Mostrar todos los registros de pedidos con los paquetes relacionados
export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total'], // Incluye las columnas deseadas
            include: { model: PaqueteModel, as: "assignedPaq", attributes: ['idPaquete', 'nombre', 'precio'] } // Incluye solo las columnas necesarias de PaqueteModel
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPedido = async(req,res) => {
    try {
        const pedido = await PedidoModel.findByPk(req.params.idPedido, {
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'estado', 'total'], // Especifica las columnas deseadas
            include: { model: PaqueteModel, as: "assignedPaq", attributes: ['idPaquete', 'nombre', 'precio'] } // Incluye solo las columnas necesarias de PaqueteModel
        });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//crear un registro

const calculateTotal = async (pedido, assignedPaq) => {
    let total = 0;
    for (const paqueteId of assignedPaq) {
      const paquete = await PaqueteModel.findByPk(paqueteId);
      if (paquete) {
        total += paquete.precio;
      }
    }
    pedido.total = total;
    await pedido.save();
  };
  
  
export const createPedido = async (req, res) => {
    try {
        const { cliente, paquete, estado, assignedPaq } = req.body;

        // Verificar que los paquetes existan en la tabla paquetes
        const paquetes = await PaqueteModel.findAll({
            where: {
                idPaquete: assignedPaq
            }
        });

        if (paquetes.length !== assignedPaq.length) {
            return res.status(400).json({ message: 'One or more packages do not exist' });
        }

        const hoy = new Date();
        const fechaFormateada = hoy.toISOString().slice(0, 10);

        // Obtener la hora actual en el formato HH:mm:ss
        const horaActual = hoy.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' });

        // Restar un día si es necesario
        hoy.setDate(hoy.getDate() - 1);
        const fechaActualRestada = hoy.toISOString().slice(0, 10); // Nueva fecha en formato YYYY-MM-DD


        // Calcular el total de los paquetes
        let total = 0;
        if (assignedPaq && Array.isArray(assignedPaq) && assignedPaq.length > 0) {
            assignedPaq.forEach(idPaquete => {
                const paquete = paquetes.find(p => p.idPaquete === idPaquete);
                if (paquete && typeof paquete.precio === 'number') {
                    total += paquete.precio;
                    console.log("entrando al ciclo, precio:", paquete.precio, "total actual:", total);
                }
            });
        }

        // Crear el nuevo pedido
        const newPedido = {
            cliente: req.body.cliente,
            fecha: fechaActualRestada, // Asigna la fecha formateada aquí
            hora: horaActual, // Obtiene la hora sin la parte de milisegundos
            paquete: req.body.paquete,
            estado: req.body.estado,
            total: total, // Asigna el total calculado aquí
        };

        // Guardar el pedido en la base de datos
        const pedido = await PedidoModel.create(newPedido);

        // Establecer las relaciones con los paquetes
        if (pedido && assignedPaq && Array.isArray(assignedPaq) && assignedPaq.length > 0) {
            await pedido.addAssignedPaq(assignedPaq);
        }

        res.json({ "message": "Registro de pedido correctamente" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
export const updatePedido = async (req, res) => {
    try {
        const { paquete, ...updatedFields } = req.body;
        const { idPedido } = req.params;

        const pedido = await PedidoModel.findByPk(idPedido, {
            include: { model: PaqueteModel, as: "assignedPaq" }
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido not found' });
        }

        // Actualizar campos del pedido excepto el paquete
        await pedido.update(updatedFields);

        // Si se proporciona un nuevo paquete, actualizar la relación
        if (paquete) {
            const nuevoPaquete = await PaqueteModel.findByPk(paquete);
            if (!nuevoPaquete) {
                return res.status(404).json({ message: 'Nuevo paquete not found' });
            }
            await pedido.setAssignedPaq(nuevoPaquete);
        }

        res.json({ message: 'Pedido updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//elminar un registro
export const deletePedido = async (req, res) => {
    try {
        const idPedido = req.params.idPedido;

        // Buscar el pedido por su ID
        const pedido = await PedidoModel.findByPk(idPedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido not found' });
        }

        // Eliminar la relación con el paquete (si existe)
        await pedido.setAssignedPaq([]);

        // Eliminar el pedido
        await PedidoModel.destroy({
            where: { idPedido: idPedido }
        });

        res.json({ message: 'Pedido deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
