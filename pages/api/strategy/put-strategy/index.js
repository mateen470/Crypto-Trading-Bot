import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case "PUT":
      try {
        await connectMongo();
        const strategy = await Strategy.findOneAndUpdate(
          { _id: id },
          { $set: body },
          { new: true }
        );
        console.log(strategy, id, body);
        res.status(200).json({ status: 200, body: strategy });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
