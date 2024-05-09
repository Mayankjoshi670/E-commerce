import express from 'express';
import { newOrder } from '../controllers/order.js';
const app = express.Router();
// /api/v1/order/new/new
app.post("/new", newOrder);
export default app;
