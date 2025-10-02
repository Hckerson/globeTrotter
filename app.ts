import cors from'cors'
import "dotenv/config";
import logger from "morgan";
import cookieParser from "cookie-parser";
import express from "express";

import userRoute from "./routes/user";

const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4000"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders:['Content-Type', 'Autcreateclihorization']  
}));

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const publicRoutes = [
  '/login',
  '/signup',
  '/verify-password',
  '/verify-email',
]

app.use('/v1', (req, res, next)=>{
  if(publicRoutes.some((route)=> req.path.startsWith(route))){
    next()
  }
  // apply global middleware  
  next()
})

// mount routes
app.use("/v1", userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
