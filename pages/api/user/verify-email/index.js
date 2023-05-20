import connectMongo from "../../../../utils/connectMongo";
import Users from "../../../../models/users";
import * as AWS from "aws-sdk";
var crypto = require("crypto");

export default async function handler(req, res) {
  const { method } = req;

  const options = {
    accessKeyId: "AKIA6Q4YWN4JX6XKJE4T",
    secretAccessKey: "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",
    region: "eu-north-1",
  };

  const SES = new AWS.SES(options);

  switch (method) {
    case "GET":
      res.status(200).json({ data: "nothing" });
      break;
    case "POST":
      try {
        await connectMongo();
        const findUserByEmail = await Users.findOne({ email: req.body.email });
        if (findUserByEmail.verificationCode == req.body.code) {
          const response = await Users.findOneAndUpdate(
            { email: req.body.email },
            {
              accountVerified: true,
              verificationCode: null,
            }
          );
          res.status(200).json({ status: 200, body: response });
        } else {
          res
            .status(404)
            .json({ status: 404, message: "Invalid Code! Try Again." });
        }
      } catch (error) {
        res.status(500).json({ status: 500, message: error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
