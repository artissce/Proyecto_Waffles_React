//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push

const RolModel= db.define('roles',{
    idRol: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Disable auto-increment
      },
    nombreRol: { type: DataTypes.STRING},//define el tipo
    }, {timestamps: false, // Evita la creación automática de createdAt y updatedAt
})

export default RolModel;