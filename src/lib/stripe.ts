import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    throw new Error("Stripe secret key not provided.");
}

export const stripe = new Stripe(stripeSecretKey, {
    appInfo: {
        name: 'Ignite Shop',
    }
});