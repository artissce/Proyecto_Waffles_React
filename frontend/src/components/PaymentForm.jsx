import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const stripePromise = loadStripe("pk_test_51QR0G4RsZYaPFezKssehsZe72JzAuR7TZUnFdItrIYCJ2fybPKYYdFtRT85VJZim9Ob94HkehOqNH2Lnorox004m00viOw6JFZ");

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontSize: "18px", // Aumentar el tamaño de la fuente para mejor visibilidad
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: false, // Mostrar campo del código postal
};

const CheckoutForm = ({ idPedido, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      // Envía el token al backend para procesar el pago
      const response = await axios.post("http://localhost:8000/pagos/", {
        idPedido,
        monto: parseFloat(amount),
        metodoPago: "Tarjeta",
        token: paymentMethod.id, // El token generado por Stripe
      });

      if (response.data.requiresAction) {
        alert("Se requiere acción adicional para completar el pago.");
        window.location.href = response.data.return_url;
      } else {
        alert("Pago procesado exitosamente.");
      }
    } catch (error) {
      console.error("Error procesando el pago:", error);
      setErrorMessage(
        error.response?.data?.message || "Ocurrió un error al procesar el pago."
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="form-label text-danger">Detalles de la Tarjeta</label>
        <div className="p-3" style={{ border: "1px solid #ced4da", borderRadius: "0.25rem", backgroundColor: "#f8f9fa" }}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-success"
          disabled={!stripe || loading}
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ idPedido, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm idPedido={idPedido} amount={amount} />
    </Elements>
  );
};

export default PaymentForm;

