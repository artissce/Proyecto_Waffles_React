import PedidoModel from "../models/BlogModel.js";

/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAll = async(req,res) => {
    try {
        const pedidos= await PedidoModel.findAll()
        res.json(pedidos)
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
            }
        })
        res.json(pedido[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createPedido = async(req,res) => {
    try {
        await PedidoModel.create(req.body)
        res.json({"message":"Registro de pedido correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updatePedido = async(req,res) => {
    try {
        await PedidoModel.update(req.body,{
            where:{idPedido: req.params.idPedido}
        })
        res.json({"message":"Actualizacion de pedido correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletePedido = async(req,res) => {
    try {
        await PedidoModel.destroy(req.body,{
            where:{idPedido: req.params.idPedido}
        })
        res.json({"message":"Borrado de pedido correcto"})
    } catch (error) {
        res.json({message:error.message})
    }
}