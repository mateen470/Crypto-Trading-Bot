import mongoose, { Schema, model, models } from "mongoose";

const walletSchema = new Schema({
  exchangeId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  assets: [Object],
  created: { type: Date, default: Date.now },
});

const Wallet = models.Wallet || model("Wallet", walletSchema);

export default Wallet;
