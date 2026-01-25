import "dotenv/config";

export const config = {
  app: {
    appName: process.env.APP_NAME,
    frontendUrl: process.env.FRONTEND_URL,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
  email: {
    email: process.env.APP_EMAIL,
    from: process.env.APP_EMAIL,
    username: process.env.APP_EMAIL,
    password: process.env.APP_PASSWORD,
  },
  api: {
    amadeus: {
      apiKey: process.env.AMADEUS_API_KEY,
      apiSecret: process.env.AMADEUS_API_SECRET,
      baseUrl: process.env.AMADEUS_BASE_URL,
    },
  },
};
