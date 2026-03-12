import express, { Router } from "express";

class AnalyticsRoute {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {}

    getRouter() {
        return this.router;
    }
}

export default new AnalyticsRoute().getRouter();