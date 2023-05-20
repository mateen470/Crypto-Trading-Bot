import connectMongo from "../../../../utils/connectMongo";
import Wallet from "../../../../models/wallet";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        await connectMongo();
        try {
          const wallet = await Wallet.findOne({ userId: id })
            .sort({ created: -1 })
            .exec();
          res.status(200).json({ status: 200, body: wallet });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ status: 500, message: "Error fetching wallet" });
        }
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
