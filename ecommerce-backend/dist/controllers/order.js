import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { invalidatesCache, reduceStock } from "../utils/feature.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
    await Order.create({
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total
    });
    // after placeing order we need to decrease product stocks to do so we will make a function in src>utils>features.ts a function names reduce product stock 
    await reduceStock(orderItems);
    await invalidatesCache({ product: true, order: true, admin: true });
    //    we will invalidate all data because when we are placeing an order 
    //  product stock decreases 
    return res.status(201).json({
        sucess: true,
        message: "Order places successfully"
    });
});
