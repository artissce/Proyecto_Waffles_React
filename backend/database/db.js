import { Sequelize } from "sequelize";

const db = new Sequelize('dbventa','root','',{//conexion a la base de datos
    host:'localhost',
    dialect: 'mysql'
})

export default db