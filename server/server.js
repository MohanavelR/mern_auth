// Requirements
const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bd= require('body-parser')
dotEnv.config()
// import file
const authRouter = require('./routers/authRoutes')
const setDB_Connection = require('./config/db')
const userRouter = require('./routers/userRoutes')

/* set .env configration */
// Database connection
setDB_Connection()
// Create App
const app = express()
// Middle Wares
app.use(express.json())
app.use(cookieParser())
const allowedOrigins=['http://localhost:5173',"https://mern-auth-beta-seven.vercel.app"]
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))


// routers
/* set index path */
app.get('/',(req,res)=>{
    res.status(200).send("STATUS : API is Running.....")
})
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// set server
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Running on : http://127.0.0.1:${port}`)
})