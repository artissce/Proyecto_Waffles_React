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
        autoIncrement: true, // Disable auto-increment
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
    }   
  },idRol: { type: DataTypes.INTEGER, allowNull: false }, // Asegúrate de que idRol no pueda ser nulo//define el tipo
    }, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })

  UsuarioModel.belongsTo(RolModel, {
    foreignKey: 'idRol', // Nombre de la columna en UsuarioModel que actúa como clave foránea
    as: 'rol', // Alias para la asociación, opcional
  });
 

export default UsuarioModel;