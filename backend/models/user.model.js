import mongoose from "mongoose";

export default mongoose.model(
    "User",
    mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: ""
        },
        tripList: {
            type: Array,
            default: []
        },
        wishList: {
            type: Array,
            default: []
        },
        propertyList: {
            type: Array,
            default: []
        },
        reservationList: {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
    )
)
