
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

export const initializeStripe = async (publicKey) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};

export const redirectToCheckout = async (stripe, sessionId) => {
  try {
    const result = await stripe.redirectToCheckout({
      sessionId,
    });
    console.log(result);
  } catch (err) {
    console.error('Error redirecting to checkout:', err);
  }
};
