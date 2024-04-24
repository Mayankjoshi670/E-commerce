import express from "express"
const app =  express()
const port : number = 4000 ; 

import userRoute from './routes/user.js'


// using routes 
app.use("/api/v1/user" , userRoute) ; 
app.listen(port, ()=>{
    console.log(   `server is running on port :${port} ` )
})