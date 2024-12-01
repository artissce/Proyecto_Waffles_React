import PagoModel from "../models/PagoModel.js";
import PedidoModel from "../models/PedidoModel.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QR0G4RsZYaPFezK6q1GBTdOPJve37xigzZ5oPWtoTFYVPeTFnuiz4WKmJ2vWR44aFcrm8ciAktg8UY6j22iQxgT00DK5EyYbx"); // Sustituye con tu clave secreta de Strip

/* MÉTODOS DEL CRUD */

// Crear un pago

import nodemailer from 'nodemailer'; // Importa Nodemailer al principio del archivo

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dulcebocao04@gmail.com', // Cambia por tu correo
    pass: 'qiyg ogjj apet aeyz', // Cambia por la contraseña de tu correo
  },
});
export const createPago = async (req, res) => {
    try {
      console.log("Datos recibidos en /pagos/:", req.body);
  
      const { idPedido, monto, metodoPago, token } = req.body;
  
      if (!idPedido || !monto || !metodoPago || !token) {
        return res.status(400).json({ message: "Datos insuficientes para registrar el pago." });
      }
  
      // Verificar si el pedido existe
      const pedido = await PedidoModel.findByPk(idPedido);
      if (!pedido) {
        return res.status(404).json({ message: "Pedido no encontrado." });
      }
  
      let idTransaccion = null;
  
      if (metodoPago === "Tarjeta") {
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(monto * 100),
            currency: "mxn",
            payment_method: token,
            confirmation_method: 'manual',
            confirm: true,
            return_url: 'http://localhost:3000/payment-confirmation',
          });
  
          idTransaccion = paymentIntent.id;
  
          if (paymentIntent.status === 'succeeded') {
            // Pago exitoso
            const newPago = await PagoModel.create({
              idPedido,
              monto,
              fechaHora: new Date(),
              idTransaccion,
            });
  
            await pedido.update({
              estadoPago: metodoPago === "Tarjeta" ? 1 : 0,
            });
  
            // Enviar correo de confirmación
            const mailOptions = {
              from: 'dulcebocao04@gmail.com', // Tu correo
              to: 'correo_del_cliente@example.com', // Cambia por el correo real del cliente
              subject: `¡Gracias por tu compra! Confirmación de tu pago`,
              text: `Hola,
            
            ¡Gracias por tu compra en Dulce Bocado! Nos complace informarte que tu pago se ha procesado exitosamente.
            
            Detalles del pago:
            - Monto pagado: ${monto} MXN
            - ID del Pedido: ${idPedido}
            - Fecha de pago: ${new Date().toLocaleString('es-MX')}
            
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
            
            ¡Gracias por confiar en nosotros!
            
            Atentamente,
            El equipo de Dulce Bocado`,
            };
  
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error al enviar el correo:', error);
              } else {
                console.log('Correo enviado:', info.response);
              }
            });
  
            return res.json({ message: "Pago procesado exitosamente.", pago: newPago });
          }
        } catch (stripeError) {
          console.error("Error al procesar el pago con Stripe:", stripeError);
          return res.status(400).json({ message: "Error al procesar el pago con Stripe.", error: stripeError.message });
        }
      }
  
      res.status(400).json({ message: "Método de pago no soportado." });
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