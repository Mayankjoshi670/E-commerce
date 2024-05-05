import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: [true, "please upload photo"],
    },
    price: {
        type: Number,
        required: [true, "enter price"]
    },
    stock: {
        type: Number,
        required: [true, "enter total stock"],
    },
    category: {
        type: String,
        required: [true, "plese enter category of your item "],
        trim: true
    }
}, {
    timestamps: true
});
//  we create a virtual schema 
//  virtual schema is a schema which is not stored into the databse they are computed at  time of access 
export const Product = mongoose.model("Product", schema);
