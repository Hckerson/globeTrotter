import "dotenv/config";
import cors from "cors";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import baseRoutes from "./src/routes/base";
import { errorMiddleWare } from "./src/common/middleware/global-error-middleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Autcreateclihorization"],
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const publicRoutes = ["/login", "/signup", "/verify-password", "/verify-email"];

app.use("/v1", (req, res, next) => {
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }
  // apply global middleware
  next();
});

app.use("/v1", errorMiddleWare)

// mount routes
app.use("/v1", baseRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
