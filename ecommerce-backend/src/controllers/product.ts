import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody, SearchRequestQuery, baseQueary } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/util-class.js";
import { rm } from "fs";
import {faker} from "@faker-js/faker"
import { myCache } from "../app.js";
import { invalidatesCache } from "../utils/feature.js";





//  we will revaldate on New , update, delete and on New Order 
export const getLatestProducts = TryCatch(async (req:Request, res: Response, next: NextFunction) => {
   let products  ;
   if(myCache.has("latest-product"))
    products = JSON.parse(myCache.get('latest-product') as string );
    //  if we already have get the products so we dont need to get them again form databse  we can get them directly them using cacheing 
    // we also need to re-calidate when new product is created other wise it will reutn the old prodct list form local storage 
   else {
       products = await Product.find({}).sort({createdAt:-1}).limit(5);
       myCache.set("latest-product" , JSON.stringify(products))
       //   after getting products we can do caching ie we can store them in local storage 
   }
    return res.status(200).json({
        success: true,
       products
    });
});
//  we will revaldate on New , update, delete and on New Order 
export const getAllCategories = TryCatch(async (req , res , next)=>{
  let categories  ;
  if(myCache.has("categories")){
    categories = JSON.parse(myCache.get("categories") as string );
  }
  else {
      categories = await Product.distinct("category") ; 
      myCache.set("categories" , JSON.stringify(categories))
  }
    return res.status(200).json({
        sucess : true , 
       categories
    })
})

//  we will revaldate on New , update, delete and on New Order 
export const getAdminProducts = TryCatch(async(req , res , next)=>{
    let products  ; 
    if(myCache.has('all-products')){
        products = JSON.parse(myCache.get('all-products') as string );
    }
    else {
        products = await Product.find({}) ; 
        myCache.set('all-products', JSON.stringify(products));
    }
    return res.status(200).json({
        sucess : true , 
        products
    })
})
export const getSingleProduct = TryCatch (async (req , res:any , next) =>{
   let product ; 
   const id = req.params.id
   if(myCache.has(`product-${id}`)){
    product = JSON.parse(myCache.get(`product-${id}`) as string )
   }
   else {
        product = await Product.findById(id);
    myCache.set( `product-${id}` , JSON.stringify(product))
   }
    
    if(!product) return next (new ErrorHandler("Invalid Product id " , 404)) ;
    return res.status(200).json({
        sucess : true , 
        product 
    })
})

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
        await invalidatesCache({product : true })
        return res.status(201).json({
            success: true,
            message: "Product created successfully"
        });
    });




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
    //  await invalidatesCache({product : true , productId : (product._id)  })
    await invalidatesCache({ product: true,  productId: String(product._id) });


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
    await Product.deleteOne();
    await invalidatesCache({product : true  ,  productId: String(product._id)});
    return res.status(200).json({
        sucess : true , 
        message : "product deleted successfully"
    })
})




//  **********************************************************************

export const getAllProducts =  TryCatch(async(req:Request<{},{},{},SearchRequestQuery> , res:any , next)=>{
    const {search , sort , category , price } = req.query ; 
    const page = Number(req.query.page)|| 1 ;
    const limit = Number(process.env.Product_Per_Page)||10 ;
    const skip = limit * (page-1) ; 
    const baseQueary : baseQueary = {
        //  we have write just category because we have same key and value pair 
    };


if (search)
    baseQueary.name = {
      $regex: search,
      $options: "i",
    };

  if (price)
    baseQueary.price = {
      $lte: Number(price),
    };

  if (category) baseQueary.category = category;

  const productsPromise = Product.find(baseQueary)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);

  const [products, filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQueary),
  ]);

  const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

  return res.status(200).json({
    success: true,
    products,
    totalPage,
  });
}
);


// for generateing fake data 




// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\66b49fd4-b6f1-4149-b6da-7da963e37644.jpg",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };

// generateRandomProducts(40);

//  for deletig products 

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };
// deleteRandomsProducts(38);