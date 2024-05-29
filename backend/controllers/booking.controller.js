import Stripe from "stripe"
import Booking from "../models/booking.model.js"

const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY, {
    apiVersion: "2024-04-10"
})

const createPayment = async (req, res) => {
    try {
        const { hostId, placeId, startDate, endDate, totalPrice, payment_intent_id } = req.body

        const bookingData = new Booking({
            customerId: req.user.id,
            hostId,
            placeId,
            startDate,
            endDate,
            totalPrice,
            currency: "usd",
            paymentIntentId: payment_intent_id
        })

        let foundBooking
        if(payment_intent_id) {
            foundBooking = await Booking.findOne({ customerId: req.user.id, paymentIntentId: payment_intent_id })
        }
        
        if(foundBooking && payment_intent_id) {
            const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

            if(current_intent) {
                const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                    amount: bookingData.totalPrice * 100
                })

                const booking = await Booking.findOne({ paymentIntentId: payment_intent_id, customerId: req.user.id})
                
                booking.hostId = bookingData.hostId
                booking.placeId = bookingData.placeId
                booking.startDate = bookingData.startDate
                booking.endDate = bookingData.endDate
                booking.totalPrice = bookingData.totalPrice

                await booking.save()
                
                if(!booking)
                    return res.status(400).json({ status: 400, message: "Error"})
                
                res.status(200).json({ paymentIntent: updated_intent })
            }
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: bookingData.totalPrice * 100,
                currency: bookingData.currency,
                automatic_payment_methods: {enabled: true}
            })
            
            bookingData.paymentIntentId = paymentIntent.id
            console.log(paymentIntent)
            await bookingData.save()
            res.status(200).json({ status: 200, paymentIntent})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({status: 500, message: "Fail to create payment!", error: err.message})
    }
}

const booking = async (req, res) => {
    try {
        const { paymentIntentId } = req.params

        if(!paymentIntentId) {
            return res.status(400).json({status: 400, message: "Payment Intent Id is requied!"})
        }

        const booking = await Booking.findOne({ paymentIntentId })
        booking.paymentStatus = true
        await booking.save()

        res.status(200).json({status: 200, booking})
    } catch (err) {
        res.status(500).json({status: 500, message: "Fail to booking homestay!", error: err.message})
    }
}

const getBookingByPlace = async (req, res) => {
    try {
        const { placeId } = req.params

        if(!placeId) {
            return res.status(400).json({status: 400, message: "Place Id is requied!"})
        }

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        const bookings = await Booking.find({ placeId, paymentStatus: true, endDate: { $gte: yesterday } }) 

        res.status(200).json({ status: 200, bookings })
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: "Fail to fetch!", error: err.message})
    }
}

export default {
    createPayment,
    booking,
    getBookingByPlace
}