// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize"; // Importar tipos de datos de Sequelize

const PedidoModel = db.define('pedidos', {
    idPedido: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    estado: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: { 
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cantidadPaquetes: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    metodoPago: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    estadoPago: { 
        type: DataTypes.BOOLEAN, // Sequelize maneja BOOLEAN como TINYINT(1) en MySQL.
        allowNull: false,
    },
}, {
    timestamps: false,
});


export default PedidoModel;
