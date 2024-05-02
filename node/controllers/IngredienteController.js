import IngredientesModel from "../models/IngredientesModel.js";
import TiposIngredientesModel from "../models/TiposIngredientesModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
// Antes de usar los modelos, sincronizarlos con la base de datos
await IngredientesModel.sync();
await TiposIngredientesModel.sync();
export const getAllIng = async(req,res) => {
    try {
        const Ing= await IngredientesModel.findAll({
            attributes: ['idIng', 'nombre', 'idTipo'],
          });
        res.json(Ing)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getIng = async(req,res) => {
    try {
        const Ing = await IngredientesModel.findAll({
            where:{
                idIng:req.params.idIng
            },
            attributes: ['idIng', 'nombre', 'idTipo'],
        })
        res.json(Ing[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
// Función para crear un Ing con su rol asociado
export const createIng = async (req, res) => {
    try {
      const { nombre, idTipo} = req.body;
  
      // Verificar que se haya proporcionado un ID de rol
      if (!idTipo) {
        return res.status(400).json({ message: "ID de rol requerido" });
      }
  
      // Verificar que el rol exista en la base de datos
      const tipoExistente = await TiposIngredientesModel.findByPk(idTipo);
      if (!tipoExistente) {
        return res.status(404).json({ message: 'tipo not found' });
      }
  
      // Crear el nuevo Ing con el rol asociado
      const newIng = await IngredientesModel.create({
        nombre: nombre,
        idTipo: idTipo, // Asignar el ID del rol al Ing
      });
  
      // Asociar el rol al Ing usando setRol
      await newIng.addAssignedTipo(tipoExistente);
  
      res.json({ message: "Registro de Ing correctamente", newIng: {...newIng.toJSON(), idTipo: idTipo} });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

//actualizar un registro
export const updateIng = async(req,res) => {
    try {
        const [updatedCount]=await IngredientesModel.update(req.body,{
            where:{idIng: req.params.idIng}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Ing not found' }); // Handle no record found
        }
        // Obtener el ingrediente actualizado
        const updatedIngrediente = await IngredientesModel.findByPk(req.params.idIng);

        // Actualizar la relación con TiposIngredientesModel (TI_I)
        if (updatedIngrediente && idTipo) {
            const tipoExistente = await TiposIngredientesModel.findByPk(idTipo);
            if (!tipoExistente) {
                return res.status(404).json({ message: 'Tipo de ingrediente no encontrado' });
            }

            // Eliminar todas las relaciones anteriores
            await updatedIngrediente.addAssignedTipo([]);

            // Establecer la nueva relación con el tipo de ingrediente actualizado
            await updatedIngrediente.addAssignedTipo([tipoExistente]);
        }
        res.json({"message":"Actualizacion de Ing correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deleteIng= async(req,res) => {
    try {
        const idIng = req.params.idIng; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await IngredientesModel.destroy({
            where: { idIng: idIng } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de Ing correcto" });
        } else {
            res.status(404).json({ "message": "Ing no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}