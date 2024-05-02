import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    name : string ; 
    email: string; 
    photo: string;
    gender: string;
    _id: string;
    dob:Date;
}


export type ControllerType  = (
    req : Request, 
    res:Response,
    next : NextFunction
)=> Promise<Response<any, Record<string , any>>| undefined>;