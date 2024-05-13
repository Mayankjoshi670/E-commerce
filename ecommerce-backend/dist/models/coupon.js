import mongoose from "mongoose";
const schema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "please enter coupon code"],
        unique: [true, "coupon already exists"],
    },
    amount: {
        type: Number,
        required: [true, "please enter amount"],
    }
});
export const Coupon = mongoose.model("Coupon", schema);
