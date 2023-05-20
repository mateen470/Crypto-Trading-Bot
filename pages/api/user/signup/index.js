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
          res.status(409).json({
            status: 409,
            message: "Email Already Exists! Try a new one.",
          });
        } else {
          var verificationCode = Math.floor(Math.random() * 90000) + 10000;
          const bcryptedPassword = await bcrypt.hash(req.body.password, 10);
          const updatedUser = {
            ...req.body,
            password: bcryptedPassword,
            verificationCode,
          };
          const user = await Users.create(updatedUser);
          const params = {
            Source: "bazilsb7@gmail.com",
            Destination: {
              ToAddresses: [`${req.body.email}`],
            },
            ReplyToAddresses: [],
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: `Hello Sir, this is your verification code: ${verificationCode}`,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: `Verification Code`,
              },
            },
          };
          await SES.sendEmail(params).promise();

          res.status(200).json({ user });
        }
      } catch (error) {
        if (error.status == 400) {
          res.status(400).json({ message: "Invalid email", status: 400 });
        }
        console.log(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
