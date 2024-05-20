import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { uploadToCloudinary } from "../services/cloudinary.js"

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const avatar = req.file

        if(!avatar) 
            return res.status(400).send("No file uploaded")

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User already exists!"})
        }

        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(password, salt)

        const result = await uploadToCloudinary(avatar)

        const user = new User({
            firstName,
            lastName, 
            email,
            password: hashedPassword,
            avatar: result.secure_url
        })

        await user.save()

        res.status(200).json({ status: 200, message: "User registered successfully!", user })
    } catch (err) {
        res.status(500).json({ status: 500, message: "Registation failed!", error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email)
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(409).json({ status: 409, message: "User doesn't exists!"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ status: 400, message: "Invalid Credentials!" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ status: 200, token, user })
    } catch (err) {
        res.status(500).json({ status: 500, error: err.message })
    }
}

export default { 
    register, 
    login
};