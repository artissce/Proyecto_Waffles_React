import Model from "../models/BlogModel.js";

/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAll = async(req,res) => {
    try {
        const pedidos= await Model.findAll()
        res.json(pedidos)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getPedido = async(req,res) => {
    try {
        const pedido = Model.findAll({
            where:{
                idPedido:req.params.idPedido
            }
        })
        res.json(pedido)
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createPedido = async(req,res) => {
    try {
        await Model.create(req.body)
        res.json({"message":"Registro de pedido correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updatePedido = async(req,res) => {
    try {
        await Model.update(req.body,{
            where:{id: req.params.idPedido}
        })
        res.json({"message":"Actualizacion de pedido correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletePedido = async(req,res) => {
    try {
        await Model.destroy(req.body,{
            where:{id: req.params.idPedido}
        })
        res.json({"message":"Borrado de pedido correcto"})
    } catch (error) {
        res.json({message:error.message})
    }
}