import express from "express";
const app = express();
const port = 4000;
import userRoute from './routes/user.js';
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
connectDB();
// using routes 
app.use(express.json());
// we use express.josn middleware because we can't directly do object destructureing 
//  and make sure it will be on top of all routes 
app.get("/", (req, res) => {
    res.send("api is working for / route  ");
});
app.use("/api/v1/user", userRoute);
// middleware for catching errors 
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port} `);
});
