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
// console.log("inside api/v1/user/new")    
// export const newUser = 
// async (
//       req: Request<{}, {}, NewUserRequestBody>,
//       res: Response,
//       next: NextFunction
//     ) => {
//       const { name, email, photo, gender, _id  , dob} = req.body;  
//    let  user = await User.create({
//     name, 
//     email,
//     photo,
//     gender,
//      _id,
//     dob
//       });
//       res.status(201).json({
//         success: true,
//         message: `Welcome, ${user.name}`,
//       });
//     }







import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/util-class.js";
export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) : Promise<Response<any, Record<string, any>>> => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await User.findById(_id);

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    if (!_id || !name || !email || !photo || !gender || !dob)
       next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email, 
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);


export const  getAllUsers = TryCatch(async(req , res, next)=>{
  const users = await User.find({});
  return res.status(201).json({
    sucess:true , 
    users
  })
})



export const  getUser = TryCatch(async(req:any , res:any, next:any)=>{
  const id = req.params.id; 
  const user = await User.findById(id);
 if(!user ) return next (new ErrorHandler("Invalid Id" , 400)) ; 
  return res.status(201).json({
    sucess:true , 
    user
  })
})



export const  deleteUser = TryCatch(async(req:any , res:any, next:any)=>{
  const id = req.params.id; 
  const user =  await User.findById(id);
 if(!user ) return next (new ErrorHandler("Invalid Id" , 400)) ; 
 await user.deleteOne();
 return res.status(201).json({
    sucess:true , 
   message : "User deleted successfully",
  })
})

