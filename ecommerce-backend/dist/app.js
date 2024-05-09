import express from "express";
const app = express();
import { config } from "dotenv";
// call this config before connectdb() ; 
config({
    path: "./.env",
});
const port = process.env.PORT || 4000;
console.log(process.env.PORT);
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
// importing node-cache for caching 
import NodeCache from 'node-cache';
// impoerting routes 
import userRoute from './routes/user.js';
import productRoute from './routes/products.js';
import orderRoute from './routes/order.js';
connectDB();
// createing instance of nodecache 
export const myCache = new NodeCache();
// we can pass timer if we want after that time it destroys the instance
// else it will be remain until and unless you dont relode website of server restarted
// using routes 
app.use(express.json());
// we use express.josn middleware because we can't directly do object destructureing 
//  and make sure it will be on top of all routes 
app.get("/", (req, res) => {
    res.send("api is working for / route  ");
});
// Using routes 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/uploads", express.static("uploads"));
// middleware for catching errors 
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port} `);
});
