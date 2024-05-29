import express from "express";
import bookingController from "../controllers/booking.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router({ mergeParams: true });

router.post("/create-payment-intent", tokenMiddleware.auth, bookingController.createPayment)

router.patch("/:paymentIntentId", tokenMiddleware.auth, bookingController.booking)

router.get("/:placeId", bookingController.getBookingByPlace)

export default router;