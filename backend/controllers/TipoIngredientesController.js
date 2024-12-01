import TiposIngredientesModel from "../models/TiposIngredientesModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAllTipo = async(req,res) => {
    try {
        const tipo= await TiposIngredientesModel.findAll({
            attributes: ['idTipo', 'nombreTipo'],
          });
        res.json(tipo)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getTipo = async(req,res) => {
    try {
        const tipo = await TiposIngredientesModel.findAll({
            where:{
                idTipo:req.params.idTipo
            },
            attributes: ['idTipo', 'nombreTipo'],
        })
        res.json(tipo[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createTipo = async(req,res) => {
    try {
       const newtipo = {
            nombreTipo: req.body.nombreTipo,
          };
        await TiposIngredientesModel.create(newtipo)
        res.json({"message":"Registro de tipo correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updateTipo = async(req,res) => {
    try {
        const [updatedCount]=await TiposIngredientesModel.update(req.body,{
            where:{idTipo: req.params.idTipo}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'tipo not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de tipo correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deleteTipo= async(req,res) => {
    try {
        const idTipo = req.params.idTipo; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await TiposIngredientesModel.destroy({
            where: { idTipo: idTipo } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de tipo correcto" });
        } else {
            res.status(404).json({ "message": "tipo no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}