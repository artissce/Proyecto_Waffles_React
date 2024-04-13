import RolModel from "../models/RolModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAllRol = async(req,res) => {
    try {
        const rol= await RolModel.findAll({
            attributes: ['idRol', 'nombreRol'],
          });
        res.json(rol)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getRol = async(req,res) => {
    try {
        const rol = await RolModel.findAll({
            where:{
                idRol:req.params.idRol
            },
            attributes: ['idRol', 'nombreRol'],
        })
        res.json(rol[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createRol = async(req,res) => {
    try {
       const newRol = {
            nombreRol: req.body.nombreRol,
          };
        await RolModel.create(newRol)
        res.json({"message":"Registro de rol correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updateRol = async(req,res) => {
    try {
        const [updatedCount]=await RolModel.update(req.body,{
            where:{idRol: req.params.idRol}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'rol not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de rol correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deleteRol= async(req,res) => {
    try {
        const idRol = req.params.idRol; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await RolModel.destroy({
            where: { idRol: idRol } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de rol correcto" });
        } else {
            res.status(404).json({ "message": "rol no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}