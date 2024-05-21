import Place from "../models/place.model.js"
import { uploadToCloudinary } from "../services/cloudinary.js"

const createPlace = async (req, res) => {
    try {
        const { 
            creator, 
            category, 
            type,
            streetAddress, 
            aptSuite, 
            city, 
            province, 
            country, 
            guestCount, 
            bedroomCount, 
            bedCount, 
            bathroomCount, 
            amenities,
            title, 
            description, 
            highlight, 
            highlightDesc, 
            price 
        } = req.body

        const listingPhotos = req.files

        if(!listingPhotos) {
            return res.status(400).send("No files uploaded")
        }

        let listingPhotoPaths = []
        for (let photo of listingPhotos) {
            const result = await uploadToCloudinary(photo)
            listingPhotoPaths.push(result.secure_url)
        }

        const newPlace = new Place({
            creator, 
            category,
            type, 
            streetAddress, 
            aptSuite, 
            city, 
            province, 
            country, 
            guestCount, 
            bedroomCount, 
            bedCount, 
            bathroomCount, 
            amenities,
            listingPhotos: listingPhotoPaths,
            title, 
            description, 
            highlight, 
            highlightDesc, 
            price 
        })
        await newPlace.save()

        res.status(200).json({ status: 200, place: newPlace })  
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: "Fail to create place!", error: err.message })
    }
}

const getPlacesByCategory = async (req, res) => {
    const qCategory = req.query.category
    try {
        let places
        if (qCategory) {
            places = await Place.find({ category: qCategory }).populate("creator")
        } else {
            places = await Place.find().populate("creator")
        }

        res.status(200).json(places)
    } catch (err) {
        res.status(500).json({ status: 500, message: "Fail to fetch places!", error: err.message })
    }
}

const getDetail = async (req, res) => {
    try {
        const { placeId } = req.params

        const place = await Place.findById(placeId).populate("creator")

        res.status(200).json(place)
    } catch (error) {
        res.status(500).json({status: 500, message: "Fail to fetch places!", error: err.message})
    }
}

export default { 
    createPlace,
    getPlacesByCategory,
    getDetail
};