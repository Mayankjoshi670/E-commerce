


import { User } from "../models/user.js";
import ErrorHandler from "../utils/util-class.js";
import { TryCatch } from "./error.js";

// middleware to make sure only admin is allowed to do certain actions like getting all users, deleting users, and more
export const adminOnly = TryCatch(async (req, res, next:any) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler("Please log in", 401));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("No user found", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("Admin only", 403));
    next();
});
// The difference between query and params is that we use query by using '?' and we use params directly
