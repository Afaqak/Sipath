
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
    await stripe.redirectToCheckout({
      sessionId,
    });
 
  } catch (err) {
    console.error('Error redirecting to checkout:', err);
  }
};
