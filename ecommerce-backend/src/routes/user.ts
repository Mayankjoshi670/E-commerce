import  express from "express";
import { newUser } from "../controllers/user.js";

const app =  express.Router() ; 
// app.post("/new" , controllers) 
console.log("inside api.v1");
app.post("/new" , newUser)
export default app;