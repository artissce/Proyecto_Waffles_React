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
    cantidad: { // Nuevo campo para la cantidad del producto en el paquete
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Puedes ajustar el valor predeterminado según tu lógica
    },
    // Otros atributos de la tabla intermedia, si es necesario
},{
    timestamps: false,
});

export default Producto_PaqueteModel;
