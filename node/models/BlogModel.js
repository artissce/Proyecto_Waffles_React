//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push

const PedidoModel = db.define('pedidos',{
    //INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`) VALUES (NULL, 'Sofia', '2024-04-11', '13:13:41', '1', 'En proceso');
    idPedido: {type: DataTypes.INTEGER},
    cliente: { type: DataTypes.STRING},//define el tipo
    paquete: { type: DataTypes.INTEGER},//define el tipo
    estado: { type: DataTypes.STRING}//define el tipo
})

export default PedidoModel;