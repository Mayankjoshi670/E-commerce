import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, 
//  getAllProducts ,
getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
app.post("/new", adminOnly, singleUpload, newProduct);
//  get all products with filter 
app.get("/all", getAllProducts);
app.get("/latest", getLatestProducts);
app.get("/catgories", getAllCategories);
app.get("/admin-products", getAdminProducts);
// app.route("/:id" ).get(getSingleProduct).put(singleUpload , updateProduct).delete(deleteProduct);
app.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct);
export default app;
