import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import router from "./routes/routes.js"//nodemon app para ejecutar la conexion

const app = express()
app.use(cors())
app.use(express.json())
app.use('/pedidos',router)

try {
    await db.authenticate();
    console.log('Conexion exitosa a la DB');
  } catch (error) {
    console.log('ERROR EN CONEXION:', error); // Use error directly
  }
  

/*app.get('/', (req,res)=>{
    res.send('Hola mundo')
})*/

app.listen(8000,()=>{//puerto deonde escucha 
    console.log('Server up running in http://localhost:8000/')
})