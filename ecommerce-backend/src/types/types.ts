import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    name : string ; 
    email: string; 
    photo: string;
    gender: string;
    _id: string;
    dob:Date;
}

export interface NewProductRequestBody {
    name : string ; 
    price: number;
    stock:number ; 
    category: string; 

   
}

export type ControllerType  = (
    req : Request<any>, 
    res:Response,
    next : NextFunction
)=> Promise<Response<any, Record<string , any>>| undefined>;

export type SearchRequestQuery = {
    search?: string;
    price?: string ; 
    category?: string ;
    sort?: string; 
    page?: string ; 

}


export interface baseQueary{
    name?:{
        $regex : string ; 
        $options : string ;
    };
    price?:{
        $lte : number ; 
    };
    category?: string ;
}


export type invalidatesCacheProps = {
    product?: boolean;
    order?:boolean ; 
    admin ?: boolean ;
    userId?:string; 
    orderId?:string ; 
    
}

export type OrderItemType = {
    name : string ; 
    photo : string ; 
    price : number ;
    quantity:number;
    productId:string ; 
}
export type ShippingInfoType = {
    address:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
}

export interface NewOrderRequestBody {
    shippingInfo: ShippingInfoType ; 
    user:string ; 
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    status:string;
    orderItems:OrderItemType[];
}