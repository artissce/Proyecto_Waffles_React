// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize"; // Importar tipos de datos de Sequelize

// Definir el modelo PedidoModel
const PedidoModel = db.define('pedidos', {
    // Definir los atributos del modelo
    idPedido: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Habilitar auto-incremento
    },
    cliente: { 
        type: DataTypes.STRING,
        allowNull: false, // Añadir restricción NOT NULL si es necesario
    },
    fecha: {
        type: DataTypes.DATEONLY, // Tipo de datos para la fecha (sin hora)
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME, // Tipo de datos para la hora
        allowNull: false,
    },
    paquete: { 
        type: DataTypes.INTEGER,
        allowNull: false, // Añadir restricción NOT NULL si es necesario
    },
    estado: { 
        type: DataTypes.STRING,
        allowNull: false, // Añadir restricción NOT NULL si es necesario
    },
    total: { 
        type: DataTypes.FLOAT,
        allowNull: false, // Añadir restricción NOT NULL si es necesario
    },
}, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
});

export default PedidoModel;
