// for connecting backed 
import mongoose from 'mongoose';
import { OrderItemType, invalidatesCacheProps } from '../types/types.js';
import { Product } from '../models/product.js';
import { myCache } from '../app.js';
export const connectDB = (uri:string )=>{
// mongoose.connect("mongodb://localhost:27017",{  // we dont need it to be static so we import it from .env 
mongoose.connect(uri ,{
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



export const reduceStock = async (orderItems:OrderItemType[])=>{
    for(let i = 0 ; i< orderItems.length ; i++){
        const order = orderItems[i] ; 
        const product = await Product.findById(order.productId) ;
        if(!product) throw new Error("Product not found ") ; 
        product.stock -= order.quantity
        await product.save();
        // product.save() will update into the database with new sock 
    }
}