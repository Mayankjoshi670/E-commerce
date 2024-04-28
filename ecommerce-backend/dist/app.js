import express from "express";
const app = express();
const port = 4000;
import userRoute from './routes/user.js';
import { connectDB } from "./utils/feature.js";
connectDB();
// using routes 
app.get("/", (req, res) => {
    res.send("api is working for / route  ");
});
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
    console.log(`server is running on port :${port} `);
});
