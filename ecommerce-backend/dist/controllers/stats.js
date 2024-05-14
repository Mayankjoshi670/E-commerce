import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
export const getDashboardStats = TryCatch(async (req, res, next) => {
    let stats = {};
    if (myCache.has("admin-stats"))
        stats = JSON.parse(myCache.get("admin-stats"));
    else {
        //  we need 
        // revenue , users , trancetion , products    and all these will compare with the previouse months
        //  and we nedd last 6 monthe reancation 
        //  gender ratios  , top 4 tranctions 
        const today = new Date();
        const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1); // this will give start of month
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endofLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    }
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getPieCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-st"))
        stats = JSON.parse(myCache.get("admin-st"));
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getBarCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-sta"))
        stats = JSON.parse(myCache.get("admin-sta"));
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getLineCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-stat"))
        stats = JSON.parse(myCache.get("admin-stat"));
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
