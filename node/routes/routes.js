import express from "express"
import { createPedido, deletePedido, getAll, getPedido, updatePedido } from "../controllers/BlogController.js"

const router = express.Router()

router.get('/',getAll)
router.get('/:idPedido',getPedido)
router.post('/',createPedido)
router.put('/:idPedido',updatePedido)
router.delete('/:idPedido',deletePedido)

export default router