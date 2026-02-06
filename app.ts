import "dotenv/config";
import cors from "cors";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import baseRoutes from "./src/routes/base";
import { errorMiddleWare } from "./src/common/middleware/global-error-middleware";
import { authMiddleware } from "./src/common/middleware/auth-middleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const publicRoutes = ["/auth"];

app.use("/v1", (req, res, next) => {
  console.log(req.path);
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }
  authMiddleware(req, res, next);
});

app.use("/v1", errorMiddleWare)

// mount routes
app.use("/v1", baseRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
