import express from "express";
import multer from "multer";
import path from 'path';
import placeController from "../controllers/place.controller.js";

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

router.post("/create", upload.array("listingPhotos"), placeController.createPlace)

router.get("/", placeController.getPlacesByCategory)

export default router;