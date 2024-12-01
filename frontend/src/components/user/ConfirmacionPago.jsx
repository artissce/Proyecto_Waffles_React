// ConfirmacionPago.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QR0G4RsZYaPFezKssehsZe72JzAuR7TZUnFdItrIYCJ2fybPKYYdFtRT85VJZim9Ob94HkehOqNH2Lnorox004m00viOw6JFZ'); // Usa tu clave pública real

const ConfirmacionPago = () => {
  const [searchParams] = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (!stripe || !clientSecret) {
      return;
    }

    stripe.confirmCardPayment(clientSecret).then((result) => {
      if (result.error) {
        setMessage(`Error: ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setMessage('Pago realizado exitosamente!');
        }
      }
    });
  }, [stripe, searchParams]);

  return (
    <div className="container mt-5">
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmacionPago;
