"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const base_1 = __importDefault(require("./src/routes/base"));
const global_error_middleware_1 = require("./src/common/middleware/global-error-middleware");
const auth_middleware_1 = require("./src/common/middleware/auth-middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
const publicRoutes = ["/auth"];
app.use("/v1", (req, res, next) => {
    if (publicRoutes.some((route) => req.path.startsWith(route))) {
        return next();
    }
    (0, auth_middleware_1.authMiddleware)(req, res, next);
});
app.use("/v1", global_error_middleware_1.errorMiddleWare);
// mount routes
app.use("/v1", base_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
