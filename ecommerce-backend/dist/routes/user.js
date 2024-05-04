import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
// app.post("/new" , controllers) 
console.log("inside api.v1");
app.post("/new", newUser);
// /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);
//  /api/v1/user/_id   get signle user 
// app.get("/:id" , getUser);
// app.delete("/:id" , deleteUser)
//  insted of this we can do chaining 
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);
export default app;
