//esencia de secualize, un modelo representa abstractamente una tabla
//nombre != a base de datos, comienza con Mayusculas y singular,
//tabla en plural y minisuclas
//importar la conexion a la db
import db from "../database/db.js"
import {DataTypes} from "sequelize";//prueba de que puedo mandar push
//import IngredientesModel from "./IngredientesModel.js";

const Producto_IngredienteModel = db.define('producto_ingrediente', {
  idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
  idIng: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
}, {
  timestamps: false,
});

export default Producto_IngredienteModel;