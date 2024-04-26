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

// Definir las relaciones entre los modelos
UsuarioModel.belongsTo(RolModel, {
    foreignKey: 'idRol',
    as: 'rol',
});
//RolModel.hasMany(UsuarioModel);
/*
TiposIngredientesModel.belongsToMany(IngredientesModel, {
  through: 'TipoIngredientes_Ingredientes', // Nombre de la tabla intermedia
  foreignKey: 'idTipo', // Clave foránea en la tabla intermedia que apunta a TipoIngredientes
  otherKey: 'idIng', // Clave foránea en la tabla intermedia que apunta a Ingredientes
  as: 'ingredientes', // Alias para la relación, opcionaltipoingredientes_ingredientes
});

IngredientesModel.belongsToMany(TiposIngredientesModel, {
  //through: 'TipoIngredientes_Ingredientes',
  foreignKey: 'idIng',
  //otherKey: 'idTipo',
  as: 'tiposIngredientes',
});

IngredientesModel.belongsToMany(Producto_IngredienteModel, {//modificar ^
  through: 'Ingredientes_Producto_Ingrediente',
  foreignKey: 'idIng',
  otherKey: 'idProducto',
  as: 'productosI',
});

Producto_IngredienteModel.belongsToMany(IngredientesModel, {//modificar ^
  through: 'Ingredientes_Producto_Ingrediente',
  foreignKey: 'idProducto',
  otherKey: 'idIng',
  as: 'ingredientes', // Cambiado a un alias único
});

Producto_IngredienteModel.belongsToMany(ProductoModel, {//modificar *
  through: 'Producto_Ingrediente_Producto',
  foreignKey: 'idPI', // Clave foránea en la tabla intermedia que apunta a Producto_Ingrediente
  otherKey: 'idProducto', // Clave foránea en la tabla intermedia que apunta a Producto
  as: 'productosP',
});

ProductoModel.belongsToMany(Producto_IngredienteModel, {//modficar *
  through: 'Producto_Ingrediente_Producto',
  foreignKey: 'idProducto',
  otherKey: 'idPI',
  as: 'ingredientesProducto', // Cambiado a un alias único
});*/



const app = express()
app.use(cors())
app.use(express.json())


app.use('/pedidos',Routers.PedidoRouter)
app.use('/roles', Routers.RolRouter);
app.use('/usuarios', Routers.UsuarioRouter);
app.use('/tipo', Routers.TipoRouter);
app.use('/ing', Routers.IngRouter);
app.use('/pi', Routers.PIRouter);
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