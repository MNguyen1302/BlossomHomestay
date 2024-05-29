import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    listings: [],
    bookingPlace: null,
    paymentIntentId: null,
    clientSecret: undefined
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            if(action.payload === null) {
                localStorage.removeItem("token")
            } else {
                if(action.payload.token)
                    localStorage.setItem("token", action.payload.token)
            }

            state.user = action.payload.user
        },
        setLogout: (state, action) => {
            state.user = null,
            state.token = null
        },
        setListings: (state, action) => {
            state.listings = action.payload
        },
        setWishList: (state, action) => {
            state.user.wishList = action.payload
        },
        setBookingPlace: (state, action) => {
            state.bookingPlace = action.payload
        },
        setClientSecret: (state, action) => {
            state.clientSecret = action.payload
        },
        setPaymentIntentId: (state, action) => {
            state.paymentIntentId = action.payload
        },
        resetBookPlace: (state, action) => {
            state.clientSecret = undefined
            state.paymentIntentId = null
            state.bookingPlace = null
        }
    }
})

export const { setLogin, setLogout, setListings, setClientSecret, setBookingPlace, setPaymentIntentId, resetBookPlace, setWishList } = userSlice.actions
export default userSlice.reducer