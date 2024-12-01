import PagoModel from "../models/PagoModel.js";
import PedidoModel from "../models/PedidoModel.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QR0G4RsZYaPFezK6q1GBTdOPJve37xigzZ5oPWtoTFYVPeTFnuiz4WKmJ2vWR44aFcrm8ciAktg8UY6j22iQxgT00DK5EyYbx"); // Sustituye con tu clave secreta de Strip

/* MÉTODOS DEL CRUD */

// Crear un pago
export const createPago = async (req, res) => {
    try {
        const { idPedido, monto, metodoPago, token } = req.body;

        if (!idPedido || !monto || !metodoPago) {
            return res.status(400).json({ message: "Datos insuficientes para registrar el pago." });
        }

        // Verificar si el pedido existe
        const pedido = await PedidoModel.findByPk(idPedido);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado." });
        }

        let idTransaccion = null;

        // Procesar el pago si el método es tarjeta
        if (metodoPago === "Tarjeta") {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(monto * 100), // Convertir monto a centavos
                    currency: "mxn", // Moneda (ajústala si es diferente)
                    payment_method: token, // Token recibido desde el frontend
                    confirm: true, // Confirmar el pago automáticamente
                });

                idTransaccion = paymentIntent.id; // Guardar el ID de transacción
            } catch (stripeError) {
                return res.status(400).json({ message: "Error al procesar el pago con Stripe.", error: stripeError.message });
            }
        }

        // Crear el registro del pago en la base de datos
        const newPago = await PagoModel.create({
            idPedido,
            monto,
            fechaHora: new Date(),
            idTransaccion,
        });

        // Actualizar el estado del pedido si es necesario
        await pedido.update({
            estadoPago: metodoPago === "Tarjeta" ? 1 : 0,
        });

        res.json({ message: "Pago registrado exitosamente.", pago: newPago });
    } catch (error) {
        console.error("Error creando el pago:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los pagos
export const getAllPagos = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll({
            include: {
                model: PedidoModel,
                attributes: ['idPedido', 'cliente', 'fecha', 'total'],
            },
        });

        res.json(pagos);
    } catch (error) {
        console.error("Error obteniendo los pagos:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pago por ID
export const getPagoById = async (req, res) => {
    try {
        const { idPago } = req.params;

        const pago = await PagoModel.findByPk(idPago, {
            include: {
                model: PedidoModel,
                attributes: ['idPedido', 'cliente', 'fecha', 'total'],
            },
        });

        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado." });
        }

        res.json(pago);
    } catch (error) {
        console.error("Error obteniendo el pago:", error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un pago
export const updatePago = async (req, res) => {
    try {
        const { idPago } = req.params;
        const { monto, idTransaccion } = req.body;

        const pago = await PagoModel.findByPk(idPago);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado." });
        }

        await pago.update({
            monto: monto || pago.monto,
            idTransaccion: idTransaccion || pago.idTransaccion,
            fechaHora: new Date(), // Actualiza la fecha y hora automáticamente
        });

        res.json({ message: "Pago actualizado exitosamente.", pago });
    } catch (error) {
        console.error("Error actualizando el pago:", error);
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un pago
export const deletePago = async (req, res) => {
    try {
        const { idPago } = req.params;

        const pago = await PagoModel.findByPk(idPago);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado." });
        }

        await pago.destroy();

        res.json({ message: "Pago eliminado exitosamente." });
    } catch (error) {
        console.error("Error eliminando el pago:", error);
        res.status(500).json({ message: error.message });
    }
};
