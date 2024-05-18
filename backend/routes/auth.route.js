import express from "express";
import multer from "multer";
import authController from "../controllers/auth.controller.js";
import path from 'path';

const router = express.Router({ mergeParams: true });

const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.post("/register", upload.single('avatar'), authController.register);

router.post("/login", authController.login)

export default router;