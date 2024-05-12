import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { allOrders, myOrders, newOrder } from '../controllers/order.js';
const app = express.Router();
// /api/v1/order/new
app.post("/new", newOrder);
// /api/v1/order/my
app.get("/my", myOrders);
app.get("/all", adminOnly, allOrders);
export default app;
