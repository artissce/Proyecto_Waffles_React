// En el modelo de Productos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
const ProductoModel = db.define('productos', {
    idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Habilitar auto-incremento
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cantIng:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valor por defecto si no se proporciona
    }
}, { timestamps: false });


export default ProductoModel;
