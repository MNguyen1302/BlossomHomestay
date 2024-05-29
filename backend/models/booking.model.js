import mongoose from "mongoose";

export default mongoose.model(
    "Booking",
    mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        paymentStatus: {
            type: Boolean,
            default: false
        },
        paymentIntentId: {
            type: String,
            unique: true
        }
    },
    {timestamps: true}
    )
)
