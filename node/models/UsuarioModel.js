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
    correo: { type: DataTypes.INTEGER},//define el tipo
    contrasena: { type: DataTypes.STRING}//define el tipo
}, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })
// Definir la relación con el modelo Rol
UsuarioModel.belongsTo(RolModel, {
    foreignKey: 'idRol', // Nombre de la clave externa en la tabla Usuario
    onDelete: 'CASCADE', // Opcional: elimina automáticamente los roles asociados cuando se elimina un usuario
});

export default UsuarioModel;