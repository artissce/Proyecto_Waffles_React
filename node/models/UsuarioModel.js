//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import RolModel from "./RolModel.js";
import {DataTypes} from "sequelize";//prueba de que puedo mandar push


const UsuarioModel= db.define('usuarios',{
    idUsuario: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Disable auto-increment
      },
    nombre: { type: DataTypes.STRING},//define el tipo
    correo: { type: DataTypes.STRING,validate: {
      isEmail: true // Valida si es un correo electrónico válido
    }},//define el tipo
    contrasena: { type: DataTypes.STRING,validate: {
      isLength: {
        min: 8, // Longitud mínima de 8 caracteres
        max: 32 // Longitud máxima de 32 caracteres
      }
    }}//define el tipo
    }, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })

UsuarioModel.belongsToMany(RolModel, {
  as: 'roles', // Alias for the association
  foreignKey: 'idRol', // Foreign key in the Usuario table
  onDelete: 'CASCADE', // Opcional: elimina automáticamente los roles asociados cuando se elimina un usuario
  through: 'usuario_rol' // Join table for the many-to-many relationship
});

export default UsuarioModel;