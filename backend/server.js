import express from "express"
import cors from "cors"
import { connectDB } from "./config/Db.js"
import reportRouter from "./routes/reportRoute.js"
import investigatorRouter from "./routes/InvestigatorRoute.js"
import caseRouter from "./routes/caseRoute.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())
//db connection
connectDB();
app.get("/",(req,res)=>{
    res.send("API working")

})
//api endpoints
app.use("/api/report",reportRouter)
app.use("/api/investigator",investigatorRouter)
app.use("/images",express.static('uploads'))
app.use("/api/case",caseRouter)

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

