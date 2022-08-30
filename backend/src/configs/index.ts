import dotenv from "dotenv";

dotenv.config();

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5000,
  ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET || "",
  STRIPE: {
    API_KEY: process.env.STRIPE_API_KEY || "",
    PREMIUM_PRODUCT_ID: process.env.STRIPE_PREMIUM_PRODUCT_ID || "",
    WEBHOOK_ENDPOINT_SECRET: process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET || "",
    CHECKOUT_SUCCESS_URL: process.env.STRIPE_CHECKOUT_SUCCESS_URL || "",
    CHECKOUT_CANCEL_URL: process.env.STRIPE_CHECKOUT_CANCEL_URL || "",
  },
};
