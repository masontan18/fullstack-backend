import jwt from "jsonwebtoken";
import prisma from "../src/utils/prisma.js";

const handleRefreshToken = async (req, res) => {
  //     const cookies = req.cookies
  //     console.log(cookies)
  //     if (!cookies.jwt) return res.sendStatus(401)
  //     const refreshToken = cookies.jwt
  //     console.log(refreshToken)

  //     const foundUser = await prisma.user.findFirst({
  //         where: {
  //             refreshToken: refreshToken
  //         }
  //     })
  //     if(!foundUser) return res.status(400).json({ "message": "no user matched with this refreshToken found" })

  //     jwt.verify(
  //         refreshToken,
  //         process.env.REFRESH_TOKEN_SECRET,
  //         (err, decoded) => {
  //             if (err || decoded.id !== Number(foundUser.id)) {
  //                 return res.sendStatus(403)
  //             }
  //             const accessToken = jwt.sign(
  //                 {id: decoded.id},
  //                 process.env.ACCESS_TOKEN_SECRET,
  //                 { expiresIn: "5m" }
  //             )
  //             res.json({ "token": accessToken, "userId": foundUser.id })
  //         }
  //     )

  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  console.log(refreshToken);

  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!foundUser)
    return res
      .status(400)
      .json({ message: "no user matched with this refreshToken found" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.id !== Number(foundUser.id)) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.json({ token: accessToken, userId: foundUser.id, refreshToken: refreshToken });
  });
};

export { handleRefreshToken };
