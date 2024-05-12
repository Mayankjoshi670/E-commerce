// for connecting backed 
import mongoose from 'mongoose';
import { Product } from '../models/product.js';
import { myCache } from '../app.js';
export const connectDB = (uri) => {
    // mongoose.connect("mongodb://localhost:27017",{  // we dont need it to be static so we import it from .env 
    mongoose.connect(uri, {
        dbName: "E-commerce"
    }).then((c) => console.log(`DB is connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
export const invalidatesCache = async ({ product, order, admin, userId, orderId }) => {
    if (product) {
        const productKeys = [
            "latest-product",
            "categories",
            "all-products"
        ];
        const products = await Product.find({}).select("_id");
        products.forEach(i => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
        const ordersKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ]; // we are putting bydefault value as all-order  
        myCache.del(ordersKeys);
    }
    if (admin) {
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product not found ");
        product.stock -= order.quantity;
        await product.save();
        // product.save() will update into the database with new sock 
    }
};
