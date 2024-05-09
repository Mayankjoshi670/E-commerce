// for connecting backed 
import mongoose from 'mongoose';
import { invalidatesCacheProps } from '../types/types.js';
import { Product } from '../models/product.js';
import { myCache } from '../app.js';
export const connectDB = ()=>{
mongoose.connect("mongodb://localhost:27017",{
    dbName:"E-commerce"
}).then((c)=> console.log(`DB is connected to ${c.connection.host}`))
.catch((e)=>console.log(e));
};

export const invalidatesCache = async({product , order , admin}:invalidatesCacheProps)=>{
    if(product){
       const productKeys:string[] = [
        "latest-product",
        "categories"
        ,"all-products"
    ];
    const products = await Product.find({}).select("_id");
    products.forEach(i=>{
        productKeys.push(`product-${i._id}`);
    })
    myCache.del(productKeys);
    }

    if(order){

    }

    if(admin){

    }
}