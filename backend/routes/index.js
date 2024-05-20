import express from "express";
import authRoute from "./auth.route.js";
import placeRoute from "./place.route.js"

const router = express.Router();

router.use("/auth", authRoute);

router.use("/place", placeRoute);

export default router;