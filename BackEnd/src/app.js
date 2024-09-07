import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
const app= express();

app.use(cors({
   origin: "http://localhost:5174",
   methods: "GET, POST ,PUT, DELETE, PATCH",
   credentials: true
}))

app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.json({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//defining routes
import { router } from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js'
app.use("/api/v1/users", router);
app.use("/api/v1/admin",adminRouter)

export {app}