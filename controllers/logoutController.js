const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies) return res.sendStatus(204)
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None' })
    return res.sendStatus(204)
}

export { handleLogout }