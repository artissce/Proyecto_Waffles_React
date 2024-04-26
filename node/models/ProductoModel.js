// En el modelo de Productos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Producto_IngredienteModel from "./Producto_IngredienteModel.js";
import IngredientesModel from "./IngredientesModel.js";
const ProductoModel = db.define('productos', {
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    }, {timestamps: false}
)
    // Otros atributos del producto

// Definir la asociación muchos a muchos con Ingredientes
/*ProductoModel.belongsToMany(IngredientesModel, {
    through: Producto_IngredienteModel, // Tabla de enlace
    foreignKey: 'idProducto', // Clave foránea en la tabla producto_ingrediente que apunta a Productos
    otherKey: 'idIng', // Clave foránea en la tabla producto_ingrediente que apunta a Ingredientes
    as: 'ingredientes', // Alias para la relación, opcional
});*/

export default ProductoModel;
