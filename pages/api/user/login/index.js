import connectMongo from "../../../../utils/connectMongo";
import Users from "../../../../models/users";
import * as AWS from "aws-sdk";
import * as bcrypt from "bcrypt";

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
        if (findUserByEmail) {
          const match = await bcrypt.compare(
            req.body.password,
            findUserByEmail.password
          );
          if (match) {
            // const params = {
            //   Source: "bazilsb7@gmail.com",
            //   Destination: {
            //     ToAddresses: [`${req.body.email}`],
            //   },
            //   ReplyToAddresses: [],
            //   Message: {
            //     Body: {
            //       Html: {
            //         Charset: "UTF-8",
            //         Data: `Hello Sir, this is your Two Factor Verification code: ${twoFactor}`,
            //       },
            //     },
            //     Subject: {
            //       Charset: "UTF-8",
            //       Data: `Two Factor Auth`,
            //     },
            //   },
            // };
            // await SES.sendEmail(params).promise();

            res.status(200).json({ status: 200, body: findUserByEmail });
          } else {
            res.status(401).json({
              status: 401,
              message: "Incorrect credentials",
            });
          }
        } else {
          res.status(401).json({
            status: 401,
            message: "Incorrect credentials",
          });
        }
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
