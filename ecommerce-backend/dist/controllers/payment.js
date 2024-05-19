import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/util-class.js";
export const createPaymentIntent = TryCatch(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return next(new ErrorHandler("please enter amount", 400));
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "inr"
    });
    return res.status(201).json({
        sucess: true,
        paymentIntent: paymentIntent.client_secret
    });
});
export const newCoupon = TryCatch(async (req, res, next) => {
    const { coupon, amount } = req.body;
    await Coupon.create({ code: coupon, amount });
    if (!coupon || !amount)
        return next(new ErrorHandler("please enter both coupon and amount ", 400));
    return res.status(201).json({
        sucess: true,
        message: `coupon ${coupon} Created sucessfully`
    });
});
export const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new ErrorHandler("no coupon found", 400));
    return res.status(200).json({
        sucess: true,
        discount: discount.amount,
    });
});
export const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find({});
    if (!coupons)
        return next(new ErrorHandler("no coupon found", 400));
    return res.status(200).json({
        sucess: true,
        coupons
    });
});
export const deleteCoupon = TryCatch(async (req, res, next) => {
    console.log("inside delete coupon ");
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon)
        return next(new ErrorHandler("Invalid Coupon ID", 400));
    return res.status(200).json({
        success: true,
        message: `Coupon ${coupon.code} Deleted Successfully`,
    });
});
