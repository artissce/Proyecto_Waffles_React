//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push
import TiposIngredientesModel from "./TiposIngredientesModel.js";
import Producto_IngredienteModel from "./Producto_IngredienteModel.js";
import ProductoModel from "./ProductoModel.js";

const IngredientesModel= db.define('ingredientes',{
    idIng: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Disable auto-increment
      },
    nombre: { type: DataTypes.STRING},//define el tipo
    idTipo: { type: DataTypes.INTEGER, allowNull: false }, // Asegúrate de que idRol no pueda ser nulo
  //define el tipo
    }, {
    timestamps: false, // Evita la creación automática de createdAt y updatedAt
  })

IngredientesModel.belongsTo(TiposIngredientesModel, {
  foreignKey: 'idTipo', // Nombre de la columna en UsuarioModel que actúa como clave foránea
  as: 'tipo', // Alias para la asociación, opcional
});

IngredientesModel.belongsToMany(ProductoModel, {
  through: Producto_IngredienteModel,
  foreignKey: 'idIng',
  otherKey: 'idProducto',
  as: 'productos',
});
 

export default IngredientesModel;