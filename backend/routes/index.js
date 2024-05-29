import express from "express";
import authRoute from "./auth.route.js";
import placeRoute from "./place.route.js"
import bookingRoute from "./booking.route.js"
import userRoute from "./user.route.js"

const router = express.Router();

router.use("/auth", authRoute);

router.use("/place", placeRoute);

router.use("/booking", bookingRoute)

router.use("/user", userRoute)

export default router;