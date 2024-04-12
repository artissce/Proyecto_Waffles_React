//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push

const PedidoModel = db.define('pedidos',{
    //INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`) VALUES (NULL, 'Sofia', '2024-04-11', '13:13:41', '1', 'En proceso');
    idPedido: { // Assuming your primary key is named 'idPedido'
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Disable auto-increment
      },
    cliente: { type: DataTypes.STRING},//define el tipo
    fecha: {
        type: DataTypes.DATEONLY, // Tipo de datos para la fecha (sin hora)
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME, // Tipo de datos para la hora
        allowNull: false,
      },
    paquete: { type: DataTypes.INTEGER},//define el tipo
    estado: { type: DataTypes.STRING}//define el tipo
}, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })

export default PedidoModel;