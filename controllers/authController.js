import prisma from '../src/utils/prisma.js';
import bcrypt from "bcrypt"
import jwt  from 'jsonwebtoken';

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ "message": "email and password are required for authentication"})
    }
    const foundUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (!foundUser) {
        return res.status(400).json({ "message": "Invalid email" })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        //JWTs
        const accessToken = jwt.sign(
            { email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        )

        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }     
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }) //secure: true
        res.json({ accessToken })
    } else {
        res.status(401).json({ "message": "Invalid password" })
    }
}

export { handleLogin }