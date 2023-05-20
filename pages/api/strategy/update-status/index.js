import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PATCH":
      try {
        console.log("api-state", req.body);
        await connectMongo();
        const strategy = await Strategy.findByIdAndUpdate(
          req?.body?.strategyId,
          { state: req?.body?.state }
        );
        res.status(200).json({ status: 200, body: strategy });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
