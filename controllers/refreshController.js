import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                {},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            )
            res.json({ accessToken })
        }
    )
}

export { handleRefreshToken }


