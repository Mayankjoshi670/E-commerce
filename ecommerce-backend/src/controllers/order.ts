import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidatesCache, reduceStock } from "../utils/feature.js";
import ErrorHandler from "../utils/util-class.js";
import { myCache } from "../app.js";

 export const newOrder = TryCatch(
    async(req:Request<{},{},NewOrderRequestBody> , res , next:any) => {
        const {
            shippingInfo ,
            orderItems ,
            user ,
            subtotal ,
            tax ,
            shippingCharges ,
            discount ,
            total
            } = req.body;


            if(!shippingInfo||
                !orderItems ||
                !user ||
                !subtotal ||
                !tax ||
                !total){
                    return next(new ErrorHandler("please enter correct inforamtion" , 400)) ; 
                }
            await Order.create(
                {
                    shippingInfo ,
                    orderItems ,
                    user ,
                    subtotal ,
                    tax ,
                    shippingCharges ,
                    discount ,
                    total
                } )
                    // after placeing order we need to decrease product stocks to do so we will make a function in src>utils>features.ts a function names reduce product stock 
                  await   reduceStock(orderItems) ; 
                  await invalidatesCache({product : true , order:true , admin:true , userId:user });
                //    we will invalidate all data because when we are placeing an order 
                //  product stock decreases 
                 return res.status(201).json({
                    sucess : true , 
                    message : "Order places successfully"
                 })
                });



     export const myOrders = TryCatch(
        async (req , res , next)=>{
    const {id:user} = req.query;
    const key = `my-oder-${user}`;
            let orders = [] ;
            if(myCache.has(key)){
                orders = JSON.parse(myCache.get("key") as string );
            }
            else {
                orders = await Order.find({user}) ; 
                myCache.set(key ,JSON.stringify(orders));
            }
            return res.status(200).json({
                sucess :true , 
                orders ,
            })
        }
    )           


   export const allOrders = TryCatch(
    async (req , res , next)=>{
        const key = `all-orders`;
        let orders = []  ; 
        //  we can make another function insted of if else block because we have to wrire it every time when we are dooing cacheing 
        //  so we make a function where we pass key and it will do caching automatically 
        if(myCache.has(key)){
        orders = JSON.parse(myCache.get(key) as string );
    }
    else {
        orders = await Order.find().populate("user", "name" ) ; 
        //  we are using populate because we also want the user name  because we want to send it to admin from where you have placed orders 
        //  you are thinking then why you have not send the name in use order buy route because it is obvious that you will buy with you account so we can directly can show name from there 

        myCache.set(key ,JSON.stringify(orders));
    }
    return res.status(200).json({
        sucess : true , 
        orders , 
    })
})


export const getSingleOrder = TryCatch(async (req , res , next:any)=>{
   const {id} = req.params;
    const key = `order-${id}`;
    let order ;
    if(myCache.has(key))order = JSON.parse(myCache.get(key )as string);
    else {
        order = await Order.findById(id).populate("user" , "name");
        if(!order){
            return next(new ErrorHandler("Order not found" , 404));
        }
        myCache.set(key , JSON.stringify(order))
    }
    return res.status(200).json({
        sucess : true , 
        order
    })
})


export const processOrder = TryCatch(async (req, res, next:any) => {
    const { id } = req.params;
  
    const order = await Order.findById(id);
  
    if (!order) return next(new ErrorHandler("Order Not Found", 404));
  
    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Delivered";
        break;
    }
  
    await order.save();
  
    invalidatesCache({
        product:false , 
        order : true , 
        admin :true  , 
        userId : order.user , 
        orderId:String(order._id)
      });
  
    return res.status(200).json({
      success: true,
      message: "Order Processed Successfully",
    });
  });






  export const deleteOrder = TryCatch(async (req, res, next:any) => {
    const { id } = req.params;
  
    const order = await Order.findById(id);
  
    if (!order) return next(new ErrorHandler("Order Not Found", 404));
  
   await order.deleteOne() ; 

    invalidatesCache({
      product:false , 
      order : true , 
      admin :true  , 
      userId : order.user , 
      orderId:String(order._id)
    });
  
    return res.status(200).json({
      success: true,
      message: "Order Deleted  Successfully",
    });
  });