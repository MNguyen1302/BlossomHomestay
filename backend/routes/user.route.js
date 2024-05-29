import express from "express";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router({ mergeParams: true });

router.patch("/add-wish-list/:placeId", tokenMiddleware.auth, userController.addToWishList)

export default router;