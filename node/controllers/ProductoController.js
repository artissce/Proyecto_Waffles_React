import IngredientesModel from "../models/IngredientesModel.js";
import ProductoModel from "../models/ProductoModel.js";
import TiposIngredientesModel from "../models/TiposIngredientesModel.js";
import Producto_IngredienteModel from "../models/Producto_IngredienteModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
// Antes de usar los modelos, sincronizarlos con la base de datos
await IngredientesModel.sync();
await TiposIngredientesModel.sync();

export const getAllPro = async(req,res) => {
    try {
        const pro= await ProductoModel.findAll({
            attributes: ['idProducto', 'nombre', 'precio','categoria','descripcion'],
          });
        res.json(pro)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getPro = async(req,res) => {
    try {
        const pro = await ProductoModel.findAll({
            where:{
                idProducto:req.params.idProducto
            },
            attributes: ['idProducto', 'nombre', 'precio','categoria','descripcion'],
        })
        res.json(idProducto[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
// Función para crear un Ing con su rol asociado
export const createPro = async (req, res) => {
    try {
        const { nombre, precio, categoria, descripcion, cantIng, ingredientes } = req.body;

        // Verificar que se haya proporcionado una lista de ingredientes
        if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0) {
            return res.status(400).json({ message: "La lista de ingredientes es requerida y debe ser un arreglo no vacío." });
        }

        // Crear el nuevo producto con los datos proporcionados
        const newPro = await ProductoModel.create({
            nombre,
            precio,
            categoria,
            descripcion,
            cantIng,
        });

       // Verificar si el ID del producto se generó correctamente
        if (!newPro || !newPro.idProducto) {
            return res.status(500).json({ message: "Error al obtener el ID del producto generado." });
        }

        // Obtener el ID del producto generado automáticamente
        const idProductoGenerado = newPro.idProducto;
       // return res.status(500).json({ message: idProductoGenerado,"$idProductoGenerado" });
        if (!idProductoGenerado) {
            return res.status(500).json({ message: "Error al obtener el ID del producto generado." });
        }
        // Llenar la tabla Producto_Ingrediente con las asociaciones entre el producto y los ingredientes
        for (let i = 0; i < cantIng; i++) {
            const ingredienteId = ingredientes[i % ingredientes.length]; // Obtener el ID del ingrediente usando el índice del ciclo
            const ingrediente = await IngredientesModel.findByPk(ingredienteId);
            if (ingrediente) {
                await Producto_IngredienteModel.create({
                    idProducto: idProductoGenerado, // Usar el ID generado automáticamente para el nuevo producto
                    idIng: ingredienteId,
                });
            }
        }

        res.json({ message: "Registro de Producto correctamente", newPro: newPro.toJSON() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
  

//actualizar un registro
export const updatePro = async(req,res) => {
    try {
        const [updatedCount]=await IngredientesModel.update(req.body,{
            where:{idIng: req.params.idIng}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Ing not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de Ing correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deletePro= async(req,res) => {
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