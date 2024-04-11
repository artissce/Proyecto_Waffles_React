import express from "express"
import { createPedido, deletePedido, getAll, getPedido, updatePedido } from "../controllers/BlogController.js"

const router = express.Router()

router.get('/',getAll)
router.get('/:id',getPedido)
router.post('/',createPedido)
router.put('/:id',updatePedido)
router.delete('/:id',deletePedido)

export default router