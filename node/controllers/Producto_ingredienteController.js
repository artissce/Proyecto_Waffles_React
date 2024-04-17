import Producto_IngredienteModel from "../models/Producto_IngredienteModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAllPI = async(req,res) => {
    try {
        const PI= await Producto_IngredienteModel.findAll({
            attributes: ['idProducto', 'idIng'],
          });
        res.json(PI)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getPI = async(req,res) => {
    try {
        const PI = await Producto_IngredienteModel.findAll({
            where:{
                idPI:req.params.idPI
            },
            attributes: ['idProducto', 'idIng'],
        })
        res.json(PI[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createPI = async(req,res) => {
    try {
       const newPI = {
            nombrePI: req.body.nombrePI,
          };
        await Producto_IngredienteModel.create(newPI)
        res.json({"message":"Registro de PI correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updatePI = async(req,res) => {
    try {
        const [updatedCount]=await Producto_IngredienteModel.update(req.body,{
            where:{idPI: req.params.idPI}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'PI not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de PI correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletePI= async(req,res) => {
    try {
        const idPI = req.params.idPI; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await Producto_IngredienteModel.destroy({
            where: { idPI: idPI } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de PI correcto" });
        } else {
            res.status(404).json({ "message": "PI no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}