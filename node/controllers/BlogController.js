import PedidoModel from "../models/BlogModel.js";

/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAll = async(req,res) => {
    try {
        const pedido= await PedidoModel.findAll({
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'paquete', 'estado'],
          });
        res.json(pedido)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getPedido = async(req,res) => {
    try {
        const pedido = await PedidoModel.findAll({
            where:{
                idPedido:req.params.idPedido
            },
            attributes: ['idPedido', 'cliente', 'fecha', 'hora', 'paquete', 'estado'] // Specify desired columns
        })
        res.json(pedido[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createPedido = async(req,res) => {
    try {
       // Obtener la fecha y hora actual en la zona horaria de Ciudad de México
        const fechaHoraActual = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
        // Divide la cadena de fecha y hora en sus partes correspondientes
        const [fechaActual, horaActual] = fechaHoraActual.split(' ');
        const newPedido = {
            cliente: req.body.cliente,
            fecha: fechaActual, // Asigna la fecha actual obtenida
            hora: horaActual.slice(0, 8), // Obtiene la hora sin la parte de milisegundos
            paquete: req.body.paquete,
            estado: req.body.estado,
          };
        await PedidoModel.create(newPedido)
        res.json({"message":"Registro de pedido correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updatePedido = async(req,res) => {
    try {
        const [updatedCount]=await PedidoModel.update(req.body,{
            where:{idPedido: req.params.idPedido}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Pedido not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de pedido correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletePedido = async(req,res) => {
    try {
        const idPedido = req.params.idPedido; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await PedidoModel.destroy({
            where: { idPedido: idPedido } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de pedido correcto" });
        } else {
            res.status(404).json({ "message": "Pedido no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}