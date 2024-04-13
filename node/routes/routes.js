import express from "express";
import { createPedido, deletePedido, getAll, getPedido, updatePedido } from "../controllers/PedidoController.js";
import { createRol, deleteRol, getAllRol, getRol, updateRol } from "../controllers/RolController.js";

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

// Exportar los routers
export const Routers = {
  PedidoRouter,
  RolRouter,
};
