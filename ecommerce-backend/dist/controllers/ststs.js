import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
export const getDashboardStats = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-stats")) {
        stats = JSON.parse(myCache.get("admin-stats"));
    }
    else {
    }
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getPieCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-stats")) {
        stats = JSON.parse(myCache.get("admin-stats"));
    }
    else {
    }
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getBarCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-stats")) {
        stats = JSON.parse(myCache.get("admin-stats"));
    }
    else {
    }
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
export const getLineCharts = TryCatch(async (req, res, next) => {
    let stats;
    if (myCache.has("admin-stats")) {
        stats = JSON.parse(myCache.get("admin-stats"));
    }
    else {
    }
    return res.status(200).json({
        sucess: true,
        stats,
    });
});
