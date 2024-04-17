import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import {Routers} from "./routes/routes.js"//nodemon app para ejecutar la conexion

const app = express()
app.use(cors())
app.use(express.json())


app.use('/pedidos',Routers.PedidoRouter)
app.use('/roles', Routers.RolRouter);
app.use('/usuarios', Routers.UsuarioRouter);
app.use('/tipo', Routers.TipoRouter);
app.use('/ing', Routers.IngRouter);
(async () => {
  try {
    await db.authenticate();
    console.log("Conexion exitosa a la DB");

    // Sincronizar los modelos con la base de datos
    await db.sync(); // Esto sincroniza todos los modelos con la base de datos
    console.log("Database synced");
  } catch (error) {
    console.log("ERROR EN CONEXION:", error);
  }

  app.listen(8000, () => {
    console.log("Server up running in http://localhost:8000/");
  });
})();