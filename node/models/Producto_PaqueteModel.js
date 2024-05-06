// Producto_PaqueteModel.js (Tabla intermedia)
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Producto_PaqueteModel = db.define('producto_paquete', {
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPaquete: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Otros atributos de la tabla intermedia, si es necesario
},{
    timestamps: false,
  });

export default Producto_PaqueteModel;