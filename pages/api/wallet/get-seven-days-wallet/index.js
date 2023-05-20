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
        // const wallet = await Wallet.find({ userId: id }).sort({ created: -1 });
        // const yesterday = new Date(Date.now() - 86400000);
        // const query = { created: { $lt: yesterday } };
        // const wallet = await Wallet.find(query)
        //   .sort({ created: -1 })
        //   .exec((err, docs) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log(docs);
        //     }
        //   });
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const eightDaysAgo = new Date(today);
        eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
        try {
          const wallet = await Wallet.findOne({
            userId: id,
            created: { $lt: sevenDaysAgo, $gte: eightDaysAgo },
          });
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
