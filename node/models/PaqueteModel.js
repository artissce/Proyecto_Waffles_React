//PENDIENTEEEEE
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push

const PaqueteModel = db.define('paquetes',{
    //INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`) VALUES (NULL, 'Sofia', '2024-04-11', '13:13:41', '1', 'En proceso');
    idPaquete: { // Assuming your primary key is named 'idPedido'
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Disable auto-increment
        allowNull:false
      },
    nombre: { type: DataTypes.STRING,allowNull:false},//define el tipo
    precio: { type: DataTypes.FLOAT,allowNull:false},//define el tipo
    descripcion: { type: DataTypes.CITEXT,allowNull:false},//define el tipo
    //idProducto:{ type: DataTypes.INTEGER},
    cantidadProducto:{ type: DataTypes.INTEGER,allowNull:false}
}, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })

export default PaqueteModel;