import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import {Routers} from "./routes/routes.js"//nodemon app para ejecutar la conexion

import UsuarioModel from "./models/UsuarioModel.js";
import RolModel from "./models/RolModel.js";
import TiposIngredientesModel from "./models/TiposIngredientesModel.js";
import IngredientesModel from "./models/IngredientesModel.js";
import Producto_IngredienteModel from "./models/Producto_IngredienteModel.js";
import ProductoModel from "./models/ProductoModel.js";
import PaqueteModel from "./models/PaqueteModel.js"
// Definir las relaciones entre los modelos
UsuarioModel.belongsTo(RolModel, {
    foreignKey: 'idRol',
    as: 'rol',
});
RolModel.hasMany(UsuarioModel, {
  foreignKey: 'idRol',
  as: 'usuarios',
});

TiposIngredientesModel.belongsToMany(IngredientesModel,{
  as:"assignedIngs",
  through: "TI_I",//tabla intermedia
  foreignKey:"idTipo",
  otherKey:"idIng",
  timestamps:false
})

IngredientesModel.belongsToMany(TiposIngredientesModel,{
  as:"assignedTipo",
  through: "TI_I",//tabla intermedia
  foreignKey:"idIng",
  otherKey:"idTipo",
  timestamps:false
})

IngredientesModel.belongsToMany(ProductoModel,{
  as:"assignedProducto",
  through: "producto_ingrediente",
  foreignKey:"idIng",
  otherKey:"idProducto",
  timestamps:false
})

ProductoModel.belongsToMany(IngredientesModel,{
  as:"assignedIng",
  through: "producto_ingrediente",
  foreignKey:"idProducto",
  otherKey:"idIng",
  timestamps:false
})

// En ProductoModel.js
ProductoModel.belongsToMany(PaqueteModel, {
  as:"assignedPaq",
  through: 'producto_paquete',
  foreignKey: 'idProducto',
  otherKey:"idPaquete",
  timestamps:false
});

// En PaqueteModel.js
PaqueteModel.belongsToMany(ProductoModel, {
  as:"assignedPro",
  through: 'producto_paquete',
  foreignKey: 'idPaquete',
  otherKey:'idProducto',
  timestamps:false
});


const app = express()
app.use(cors())
app.use(express.json())


app.use('/pedidos',Routers.PedidoRouter)
app.use('/roles', Routers.RolRouter);
app.use('/usuarios', Routers.UsuarioRouter);
app.use('/tipo', Routers.TipoRouter);
app.use('/ing', Routers.IngRouter);
app.use('/producto',Routers.ProRouter);
app.use('/paquete',Routers.PaqRouter);

//app.use('/pi', Routers.PIRouter);
(async () => {
  try {
    await db.authenticate();
    console.log("Conexion exitosa a la DB");

    // Sincronizar los modelos con la base de datos
    await db.sync({/*alter:true*/}); // Esto sincroniza todos los modelos con la base de datos
    console.log("Database synced");
  } catch (error) {
    console.log("ERROR EN CONEXION:", error);
  }
 /*
 db.sync({alter:true}).then(()=>{

}).catch((e)=>{
  console.log(e)
})
 */
  app.listen(8000, () => {
    console.log("Server up running in http://localhost:8000/");
  });
})();