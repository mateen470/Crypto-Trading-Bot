import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../models/order";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectMongo();
        const order = await Order.create(req.body);
        res.status(200).json({ status: 200, body: order });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
