import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/util-class.js";
import { rm } from "fs";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("please Add Photo", 400));
    if (!name || !price || !stock || !category) {
        // whwn we add photo and dont add other field it add the phot so we need to delter photo manually 
        rm(photo.path, () => {
            console.log("photo deleted successfully");
        });
        return next(new ErrorHandler("please enter all fields", 400));
    }
    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path,
    });
    return res.status(201).json({
        success: true,
        message: "Product created successfully"
    });
});
export const getLatestProducts = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
        success: true,
        products
    });
});
