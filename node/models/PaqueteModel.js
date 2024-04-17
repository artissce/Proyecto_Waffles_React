//PENDIENTEEEEE
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push

const PaqueteModel = db.define('paquetes',{
    //INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`) VALUES (NULL, 'Sofia', '2024-04-11', '13:13:41', '1', 'En proceso');
    idPaquete: { // Assuming your primary key is named 'idPedido'
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, // Disable auto-increment
      },
    nombre: { type: DataTypes.STRING},//define el tipo
    precio: { type: DataTypes.DECIMAL},//define el tipo
    descripcion: { type: DataTypes.CITEXT},//define el tipo
    //idProducto:{ type: DataTypes.INTEGER},
    cantidadProducto:{ type: DataTypes.INTEGER}
}, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })
PaqueteModel.belongsTo(productos, {
    foreignKey: 'idProducto', // Nombre de la clave externa en la tabla Usuario
    onDelete: 'CASCADE', // Opcional: elimina automáticamente los roles asociados cuando se elimina un usuario
});
export default PaqueteModel;