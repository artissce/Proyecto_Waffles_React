// PagoModel.js
import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PagoModel = db.define("pagos", {
  idPago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fechaHora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idTransaccion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default PagoModel;