import express from "express" 
import { usersRouter } from "./routes/users.js"
import cookieParser from "cookie-parser"
import { corsOptions } from "./config/corsOptions.js"
import cors from "cors"
import { credentials } from "./middlewares/credentials.js"

const app = express()
const port = process.env.PORT || 8080

app.use(credentials)
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// third party middleware for cookie
app.use(cookieParser());

app.use("/users", usersRouter)

app.listen(port, () => {
  console.log(`App started; listening on port ${port}`)
})