import PaqueteModel from "../models/PaqueteModel.js";

/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAll = async(req,res) => {
    try {
        const paquete= await PaqueteModel.findAll({
            attributes: ['idPaquete', 'nombre', 'precio', 'descripcion', 'idProducto', 'cantidadProducto'],//modificar
          });
        res.json(paquete)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getPaquete = async(req,res) => {
    try {
        const paquete = await PaqueteModel.findAll({
            where:{
                idPaquete:req.params.idPaquete
            },
            attributes: ['idPaquete', 'nombre', 'precio', 'descripcion', 'idProducto', 'cantidadProducto'] // Specify desired columns
        })
        res.json(paquete[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
export const createPaquete = async(req,res) => {
    try {
        const newpaquete = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            idProducto: req.body.idProducto,
            cantidadProducto: req.body.cantidadProducto,
          };
        await PaqueteModel.create(newpaquete)
        res.json({"message":"Registro de paquete correctamente"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//actualizar un registro
export const updatePaquete = async(req,res) => {
    try {
        const [updatedCount]=await PaqueteModel.update(req.body,{
            where:{idPaquete: req.params.idPaquete}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'paquete not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de paquete correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletepaquete = async(req,res) => {
    try {
        const idPaquete = req.params.idPaquete; // Obtener el ID del paquete de los parámetros de la solicitud
        const resultado = await PaqueteModel.destroy({
            where: { idPaquete: idPaquete } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de paquete correcto" });
        } else {
            res.status(404).json({ "message": "paquete no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}