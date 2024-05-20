import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import fs from 'fs'
dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export const uploadToCloudinary = async (file) => {
    // const result = await cloudinary.v2.uploader.upload(file.path)
    // fs.unlinkSync(file.path)
    // return result.secure_url
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, (err, url) => {
            if (err) return reject(err)
            fs.unlinkSync(file.path)
            return resolve(url)
        })
    })
}