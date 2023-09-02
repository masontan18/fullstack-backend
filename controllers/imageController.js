import prisma from "../src/utils/prisma.js"

const getAllImages = async (req,res) => {
    try {
        const images = await prisma.image.findMany()
        if (images.length == 0) {
            return res.sendStatus(204)
        }
        res.json(images)
    } catch (err) {
        console.log(err)
    }
}

const uploadImage = async(req, res) => {
    try {
        const { price, title, description, url } = req.body
        if (!price || !title || !description || !url) return res.status(400).json({ "message": "price, title, description, url are required" })
        
        const result = await prisma.image.create({
            data: {
                price,
                title,
                description,
                url
            }
        })
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
    }
}

export { uploadImage, getAllImages }