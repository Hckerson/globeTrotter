import 'dotenv/config'

export const config = {
  app:{
    email: process.env.APP_EMAIL,
    appName: process.env.APP_NAME,
    frontendUrl: process.env.FRONTEND_URL,
  }
}