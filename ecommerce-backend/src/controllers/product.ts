import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/util-class.js";
import { rm } from "fs";

// export const newProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res: Response, next: NextFunction) => {
    export const newProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res: any, next: NextFunction) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if(!photo)return next(new ErrorHandler("please Add Photo", 400));
    if(!name || !price || !stock || !category)
        {
            // whwn we add photo and dont add other field it add the phot so we need to delter photo manually 
            rm(photo.path , ()=>{
                console.log("photo deleted successfully") ;
            })
            return next(new ErrorHandler("please enter all fields", 400)) ; 
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




export const getLatestProducts = TryCatch(async (req:Request, res: Response, next: NextFunction) => {
    const { name, price, stock, category } = req.body;
   const products = await Product.find({}).sort({createdAt:-1}).limit(5);
    return res.status(200).json({
        success: true,
       products
    });
});

export const getAllCategories = TryCatch(async (req , res , next)=>{
    const categories = await Product.distinct("category") ; 
    return res.status(200).json({
        sucess : true , 
       categories
    })
})


export const getAdminProducts = TryCatch(async(req , res , next)=>{
    const products = await Product.find({}) ; 
    return res.status(200).json({
        sucess : true , 
        products
    })
})
export const getSingleProduct = TryCatch (async (req , res:any , next) =>{
   const id = req.params.id
    
const product = await Product.findById(id);
    if(!product) return next (new ErrorHandler("Invalid Product id " , 404)) ;
    return res.status(200).json({
        sucess : true , 
        product 
    })
})




export const updateProduct = TryCatch(async (req: Request<{id : string }, {}, NewProductRequestBody>, res: any, next: NextFunction) => {
    const {id} = req.params  ; 
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if(!product) return next (new ErrorHandler("Invalid Product id " , 404)) ; 
     if(photo){
        rm(product.photo , ()=>{
            console.log(" old photo deleted successfully") ;
        })
       product.photo  = photo.path ; 
     }
     if(name) product.name = name ; 
     if(price) product.price = price ; 
     if(stock) product.stock = stock ; 
     if(category) product.category = category ; 
     
     await product.save() ; 
    return res.status(200).json({
        success: true,
        message: "Product updated successfully"
    });
});



export const deleteProduct = TryCatch(async(req , res:any , next)=>{
    const  product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler("product not found" , 404)) ; 
    rm(product.photo , ()=>{
        console.log("phot=  deleted successfully") ; 
    })
    await Product.deleteOne()
    return res.status(200).json({
        sucess : true , 
        message : "produce deleted successfully"
    })
})




