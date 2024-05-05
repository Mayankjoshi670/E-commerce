import express from "express"
const app =  express()
const port : number = 4000 ; 
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";


// impoerting routes 
import userRoute from './routes/user.js'
import productRoute from './routes/products.js'
connectDB() ; 
// using routes 
app.use(express.json());
// we use express.josn middleware because we can't directly do object destructureing 
//  and make sure it will be on top of all routes 
app.get("/" , (req, res)=>{
res.send("api is working for / route  ")
})

// Using routes 
app.use("/api/v1/user", userRoute);

app.use("/api/v1/product", productRoute);


app.use("/uploads" ,express.static("uploads"));

// middleware for catching errors 
app.use(errorMiddleware)
app.listen(port, ()=>{
    console.log(`server is running on  http://localhost:${port} ` );
})