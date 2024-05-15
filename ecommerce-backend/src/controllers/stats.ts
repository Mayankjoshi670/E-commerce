import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/feature.js";


export const getDashboardStats = TryCatch(async(req , res , next)=>{
    let stats = {}  ; 
    if(myCache.has("admin-stats" ))stats = JSON.parse(myCache.get("admin-stats")as string );
    else {
        //  we need 
        // revenue , users , trancetion , products    and all these will compare with the previouse months
        //  and we nedd last 6 monthe reancation 
        //  gender ratios  , top 4 tranctions 
        const today = new Date();
        const thisMonth = {
            start : new Date(today.getFullYear(), today.getMonth() , 1) , 
            end: today 
        }
        const lastMonth = {
             start: new Date(today.getFullYear(), today.getMonth() - 1, 1),  
            end:new Date(today.getFullYear() , today.getMonth() , 0 ) ,
        }
       

        //  get products of last month and current and calculate difference 
       const thisMonthProductsPromise = await Product.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end, 
            }
        }) 


        const lastMonthProductsPromise = await Product.find({
            createdAt:{
                $gte:lastMonth.start,
                $lte:lastMonth.end, 
            }
        }) 


// get the growth of the user count 

        const thisMonthUsersPromise = await User.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end, 
            }
        }) 


        const lastMonthUsersPromise = await User.find({
            createdAt:{
                $gte:lastMonth.start,
                $lte:lastMonth.end, 
            }
        }) 


// get the increase orders count 

        const thisMonthOrdersPromise = await Order.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end, 
            }
        }) 


        const lastMonthOrdersPromise = await Order.find({
            createdAt:{
                $gte:lastMonth.start,
                $lte:lastMonth.end, 
            }
        }) 

        const [thisMonthProducts ,
             thisMonthUsers ,
            thisMonthOrders , 
            lastMonthProducts,
            lastMonthUsers, 
            lastMonthOrders,] = await Promise.all([
            thisMonthProductsPromise ,
             thisMonthUsersPromise, 
             thisMonthOrdersPromise , 
             lastMonthProductsPromise,
             lastMonthUsersPromise, 
             lastMonthOrdersPromise,
            ])

            const changePercent ={
                revenue : calculatePercentage(54646,4448),
                 product : calculatePercentage(thisMonthProducts.length , lastMonthProducts.length ),
                user :calculatePercentage(thisMonthUsers.length , lastMonthUsers.length ),
                order : calculatePercentage(thisMonthOrders.length , lastMonthOrders.length )

            }




    
            stats = {
                 changePercent
            }

}
 
    return res.status(200).json({
        sucess: true, 
        stats, 
    })
})



export const getPieCharts = TryCatch(async(req , res , next)=>{
    let stats  ; 
    if(myCache.has("admin-st" ))stats = JSON.parse(myCache.get("admin-st")as string );
   
    return res.status(200).json({
        sucess: true, 
        stats, 
    })
})

export const getBarCharts= TryCatch(async(req , res , next)=>{
    let stats  ; 
    if(myCache.has("admin-sta" ))stats = JSON.parse(myCache.get("admin-sta")as string );
   
    return res.status(200).json({
        sucess: true, 
        stats, 
    })
})

export const getLineCharts = TryCatch(async(req , res , next)=>{
    let stats  ; 
    if(myCache.has("admin-stat" ))stats = JSON.parse(myCache.get("admin-stat")as string );
   
    return res.status(200).json({
        sucess: true, 
        stats, 
    })
})