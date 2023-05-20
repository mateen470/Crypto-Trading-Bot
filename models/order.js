import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  symbol: String,
  status: String,
  avgPrice: Number,
  executedQty: Number,
  cumQuote: Number,
  timeInForce: String,
  type: String,
  side: String,
  price: Number,
  cost: Number,
  average: Number,
  filled: Number,
  remaining: Number,
  totalProfit: Number,
  runDateTime: Date,
  strategyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Strategy",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  created: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
