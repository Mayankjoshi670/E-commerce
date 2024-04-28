import { User } from "../models/user.js";
export const newUser = async (
//  we use types because 
//  let we are takeing something into body for this we create different folder
// example : 
//  req:Request
// when we hover on req.Request it shows this 
// (alias) interface Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any> = Record<string, any>>
// import Request
//  let say we want to take daya as body we take like this 
// req:Request<{},{},{name : string }>
//  now we can access it in below 
//  req.body.name 
req, res, next) => {
    try {
        const { name, email, gender, role, _id, dob } = req.body;
        await User.create({
            name,
            email,
            gender,
            role,
            _id,
            dob,
        });
        res.status(201).json({
            sucess: true,
            message: ` welcome ${User.name} sir`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error in createing user ",
        });
    }
};
