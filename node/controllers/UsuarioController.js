import UsuarioModel from "../models/UsuarioModel.js";
import RolModel from "../models/RolModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
// Antes de usar los modelos, sincronizarlos con la base de datos
await UsuarioModel.sync();
await RolModel.sync();
export const getAllUsuario = async(req,res) => {
    try {
        const usuario= await UsuarioModel.findAll({
            attributes: ['idUsuario', 'nombre', 'correo', 'contrasena','idRol'],
          });
        res.json(usuario)
    } catch (error) {
        res.json({message:error.message})
    }
}
//mostrar un registro
export const getUsuario = async(req,res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{
                idUsuario:req.params.idUsuario
            },
            attributes: ['idUsuario', 'nombre', 'correo', 'contrasena','idRol'],
        })
        res.json(usuario[0])
    } catch (error) {
        res.json({message:error.message})
    }
}
//crear un registro
// Función para crear un usuario con su rol asociado
export const createUsuario = async (req, res) => {
    try {
      const { nombre, correo, contrasena, idRol } = req.body;
  
      // Verificar que se haya proporcionado un ID de rol
      if (!idRol) {
        return res.status(400).json({ message: "ID de rol requerido" });
      }
  
      // Verificar que el rol exista en la base de datos
      const rolExistente = await RolModel.findByPk(idRol);
      if (!rolExistente) {
        return res.status(404).json({ message: 'Rol not found' });
      }
  
      // Crear el nuevo usuario con el rol asociado
      const newUsuario = await UsuarioModel.create({
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        idRol: idRol, // Asignar el ID del rol al usuario
      });
  
      // Asociar el rol al usuario usando setRol
      await newUsuario.setRol(rolExistente);
  
      res.json({ message: "Registro de usuario correctamente", newUsuario: {...newUsuario.toJSON(), idRol: idRol} });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

//actualizar un registro
export const updateUsuario = async(req,res) => {
    try {
        const [updatedCount]=await UsuarioModel.update(req.body,{
            where:{idUsuario: req.params.idUsuario}
        })

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'usuario not found' }); // Handle no record found
        }

        res.json({"message":"Actualizacion de usuario correcta"})
    } catch (error) {
        res.json({message:error.message})
    }
}
//elminar un registro
export const deleteUsuario= async(req,res) => {
    try {
        const idUsuario = req.params.idUsuario; // Obtener el ID del pedido de los parámetros de la solicitud
        const resultado = await UsuarioModel.destroy({
            where: { idUsuario: idUsuario } // Especificar la condición de eliminación
        });
        if (resultado === 1) {
            res.json({ "message": "Borrado de usuario correcto" });
        } else {
            res.status(404).json({ "message": "usuario no encontrado o no eliminado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}