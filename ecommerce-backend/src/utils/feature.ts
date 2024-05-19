// for connecting backed 
import mongoose from 'mongoose';
import { OrderItemType, invalidatesCacheProps } from '../types/types.js';
import { Product } from '../models/product.js';
import { myCache } from '../app.js';
import { Order } from '../models/order.js';
export const connectDB = (uri:string )=>{
// mongoose.connect("mongodb://localhost:27017",{  // we dont need it to be static so we import it from .env 
mongoose.connect(uri ,{
    dbName:"E-commerce"
}).then((c)=> console.log(`DB is connected to ${c.connection.host}`))
.catch((e)=>console.log(e));
};

export const invalidatesCache = async({
    product ,
     order ,
      admin ,
       userId ,
        orderId,
        productId
    }:invalidatesCacheProps)=>{
    if(product){
       const productKeys:string[] = [
        "latest-product",
        "categories",
        "all-products" , 
        
    ];
    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object")
        {
            productId.forEach((i) => productKeys.push(`product-${i}`));
            // console.log("WTF");
        }

    myCache.del(productKeys);
    }
    if(order){
        const ordersKeys: string[] = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
          ];// we are putting bydefault value as all-order  
        myCache.del(ordersKeys);
    }

    if(admin){
        myCache.del([
            "admin-stats",
            "admin-pie-charts",
            "admin-bar-charts",
            "admin-line-charts",
          ]);
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



export const calculatePercentage =(thisMonth:number , lastMonth:number)=>{
 if(lastMonth=== 0 ) return thisMonth*100 ; 
    const precent = (thisMonth/lastMonth)*100;
 return  Number(precent.toFixed(0)) ; 
}



export const getInventories = async ({
    categories,
    productsCount,
  }: {
    categories: string[];
    productsCount: number;
  }) => {
    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );
  
    const categoriesCount = await Promise.all(categoriesCountPromise);
  
    const categoryCount: Record<string, number>[] = [];
  
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / productsCount) * 100),
      });
    });
  
    return categoryCount;
  };


  interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
  }

  type FuncProps = {
    length: number;
    docArr: MyDocument[];
    today: Date;
    property?: "discount" | "total";
  };



export const getChartData = ({
    length,
    docArr,
    today,
    property,
  }: FuncProps) => {
    const data: number[] = new Array(length).fill(0);
  
    docArr.forEach((i) => {
      const creationDate = i.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
  
      if (monthDiff < length) {
        if (property) {
          data[length - monthDiff - 1] += i[property]!;
        } else {
          data[length - monthDiff - 1] += 1;
        }
      }
    });
  
    return data;
  };

