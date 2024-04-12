import UsuarioModel from "../models/UsuarioModel.js";
import RolModel from "../models/RolModel.js";
/*METODOS PARA EL CRUD */

//mostrar todos los registros
export const getAll = async(req,res) => {
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
export const createUsuario= async(req,res) => {
    try {
        // Obtener los datos del usuario del cuerpo de la solicitud
        const { nombre, correo, contrasena, idRol } = req.body;

        // Verificar que el rol exista en la base de datos
        const rolExistente = await RolModel.findByPk(idRol);
        if (!rolExistente) {
            return res.status(404).json({ message: 'Rol not found' });
        }

        // Crear el nuevo usuario
        const newUsuario = await UsuarioModel.create({
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
        });

        // Asociar el usuario con el rol
        await newUsuario.setRolModel(rolExistente);
        res.json({ message: "Registro de usuario correctamente" });
    } catch (error) {
        res.json({message:error.message})
    }
}
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