//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push
import IngredientesModel from "./IngredientesModel.js";

const Producto_IngredienteModel= db.define('producto_ingrediente',{
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'productos', // Nombre de la tabla referenciada
          key: 'idProducto', // Nombre de la columna referenciada en la tabla productos
        },
      },
      idIng: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ingredientes', // Nombre de la tabla referenciada
          key: 'idIng', // Nombre de la columna referenciada en la tabla ingredientes
        },
      },
    }, {
      timestamps: false, // Evita la creación automática de createdAt y updatedAt
    });

    Producto_IngredienteModel.belongsTo(IngredientesModel, {
        foreignKey: 'idIng', // Nombre de la columna en UsuarioModel que actúa como clave foránea
        as: 'ing', // Alias para la asociación, opcional
      });

export default Producto_IngredienteModel;