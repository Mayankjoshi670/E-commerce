import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidatesCache, reduceStock } from "../utils/feature.js";
import ErrorHandler from "../utils/util-class.js";

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
                  await invalidatesCache({product : true , order:true , admin:true });
                //    we will invalidate all data because when we are placeing an order 
                //  product stock decreases 
                 return res.status(201).json({
                    sucess : true , 
                    message : "Order places successfully"
                 })
                });