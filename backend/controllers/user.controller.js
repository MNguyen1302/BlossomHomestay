import User from "../models/user.model.js"
import Place from "../models/place.model.js"

const addToWishList = async (req, res) => {
    try {
        const { placeId } = req.params

        if(!placeId) {
            return res.status(400).json({status: 400, message: "Place Id is requied!"})
        }

        const user = await User.findById(req.user.id)
        const place = await Place.findById(placeId)

        const favouritePlace = user.wishList.find((item) => item._id.toString() === placeId)

        if(favouritePlace) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== placeId)
            await user.save()
            res.status(200).json({ status: 200, message: "Place is removed from wish lish", wishList: user.wishList})
        } else {
            user.wishList.push(place)
            await user.save()
            res.status(200).json({ status: 200, message: "Place is added to wish lish", wishList: user.wishList})
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message})
    }
}

export default { addToWishList }