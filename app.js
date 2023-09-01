import express from "express" 
import { usersRouter } from "./routes/users.js"
import cookieParser from "cookie-parser"
import { corsOptions } from "./config/corsOptions.js"
import cors from "cors"
import { credentials } from "./middlewares/credentials.js"
import { authRouter } from "./routes/auth.js"
import { refreshRouter } from "./routes/refresh.js"
import { logoutRouter } from "./routes/logout.js"

const app = express()

// custom and third party middlewares for cors
app.use(credentials)
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// third party middleware for cookie
app.use(cookieParser());

// router
app.use("/users", usersRouter)
app.use("/auth", authRouter)
app.use("/refresh", refreshRouter)
app.use("/logout", logoutRouter)

export { app }