import prisma from "../src/utils/prisma.js"

const getAllImages = async (req,res) => {
    try {
        const images = await prisma.image.findMany({
            orderBy: {
                id: "asc"
            }
        })
        res.json(images)
    } catch (err) {
        console.log(err)
    }
}

const uploadImage = async (req, res) => {
    try {
        const { price, title, description, url, userId } = req.body
        if (!price || !title || !description || !url) return res.status(400).json({ "message": "price, title, description, url are required" })
        
        const result = await prisma.image.create({
            data: {
                userId,
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

const updateImage = async (req, res) => {
    try {
        const { id, price, title, description } = req.body
        if (!id) return res.status(400).json({ "message": "id is required for updateImage" })
        const result = await prisma.image.update({
            where: {
                id: Number(id)
            },
            data: {
                price,
                title,
                description
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
    }

}

const deleteImage = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ "message": "id is required"})
    const foundImage = await prisma.image.findFirst({
        where: {
            id: Number(id)
        }
    })
    if (!foundImage) return res.status(400).json({ "message": "no user record found" })
    const result = await prisma.image.delete({
        where: {
            id: Number(id)
        }
    })
    console.log("image deleted successfully")
    res.json(result)
}

const getAnImage = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ "message": "id is required for getAnImage" })
        const foundImage = await prisma.image.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.json(foundImage)
    } catch (err) {
        console.log(err)
    }
}

const getUserImages = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ "message": "user id is required for getUserImages" })
        const foundUser = await prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!foundUser) return res.status(400).json({ "message": "no user record found for getUserImages" })
        const result = await prisma.image.findMany({
            where: {
                userId: Number(id)
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

export { uploadImage, getAllImages, deleteImage, getUserImages, getAnImage, updateImage }