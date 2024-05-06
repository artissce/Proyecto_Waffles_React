import express from "express";
import { createPedido, deletePedido, getAll, getPedido, updatePedido } from "../controllers/PedidoController.js";
import { createRol, deleteRol, getAllRol, getRol, updateRol } from "../controllers/RolController.js";
import { createUsuario, deleteUsuario, getAllUsuario, getUsuario, updateUsuario, authenticateUser } from "../controllers/UsuarioController.js";
import { createTipo, deleteTipo, getAllTipo, getTipo, updateTipo } from "../controllers/TipoIngredientesController.js";
import { createIng, deleteIng, getAllIng, getIng, updateIng } from "../controllers/IngredienteController.js";
//import { createPI, deletePI, getAllPI, getPI, updatePI } from "../controllers/Producto_IngredienteController.js";
import { createPro,deletePro,getAllPro,getPro,updatePro } from "../controllers/ProductoController.js";


const PedidoRouter = express.Router();
//PEDIDOS
PedidoRouter.get('/', getAll);
PedidoRouter.get('/:idPedido', getPedido);
PedidoRouter.post('/', createPedido);
PedidoRouter.put('/:idPedido', updatePedido);
PedidoRouter.delete('/:idPedido', deletePedido);

//ROL
const RolRouter = express.Router();
RolRouter.get('/', getAllRol);
RolRouter.get('/:idRol', getRol);
RolRouter.post('/', createRol);
RolRouter.put('/:idRol', updateRol);
RolRouter.delete('/:idRol', deleteRol);

const UsuarioRouter = express.Router();
UsuarioRouter.get('/', getAllUsuario);
UsuarioRouter.get('/:idUsuario', getUsuario);
UsuarioRouter.post('/', createUsuario);
UsuarioRouter.put('/:idUsuario', updateUsuario);
UsuarioRouter.delete('/:idUsuario', deleteUsuario);
UsuarioRouter.post('/:correo',authenticateUser)//PENDIENTE

const TipoRouter = express.Router();
TipoRouter.get('/', getAllTipo);
TipoRouter.get('/:idTipo', getTipo);
TipoRouter.post('/', createTipo);
TipoRouter.put('/:idTipo', updateTipo);
TipoRouter.delete('/:idTipo', deleteTipo);

const IngRouter = express.Router();
IngRouter.get('/', getAllIng);
IngRouter.get('/:idIng', getIng);
IngRouter.post('/', createIng);
IngRouter.put('/:idIng', updateIng);
IngRouter.delete('/:idIng', deleteIng);
/*
const PIRouter = express.Router();
PIRouter.get('/', getAllPI);
PIRouter.get('/:idProducto/:idIng', getPI);
PIRouter.post('/', createPI);
PIRouter.put('/:idProducto/:idIng', updatePI);
PIRouter.delete('/:idProducto/:idIng', deletePI);*/

const ProRouter = express.Router();
ProRouter.get('/', getAllPro);
ProRouter.get('/:idProducto', getPro);
ProRouter.post('/', createPro);
ProRouter.put('/:idProducto', updatePro);
ProRouter.delete('/:idProducto', deletePro);

// Exportar los routers
export const Routers = {
  PedidoRouter,
  RolRouter,
  UsuarioRouter,
  TipoRouter,
  IngRouter,
  ProRouter
  //PIRouter,
};
