import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/users";
import * as AWS from "aws-sdk";
import * as bcrypt from "bcrypt";

const options = {
  accessKeyId: "AKIA6Q4YWN4JX6XKJE4T",
  secretAccessKey: "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",
  region: "eu-north-1",
};

const SES = new AWS.SES(options);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

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
            //         Data: `Hello Sir, this is your Two Factor Verification code: 1234`,
            //       },
            //     },
            //     Subject: {
            //       Charset: "UTF-8",
            //       Data: `Two Factor Auth`,
            //     },
            //   },
            // };
            // await SES.sendEmail(params).promise();

            return findUserByEmail;
            // res.status(200).json({status: 200, body: findUserByEmail});
          } else {
            throw new Error("Invaild Credentials");
          }
        } else {
          throw new Error("Invaild Credentials");
        }
      },
    }),
  ],
  callbacks: {
    // async session(session, user) {
    //   if (user && user.id) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   if (user && user.id) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    async jwt({ token, user, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.firstName = token.user.firstName;
      session.user.lastName = token.user.lastName;
      session.user.accountVerified = token.user.accountVerified;
      session.user.verificationCode = token.user.verificationCode;
      session.user.exchanges = token.user.exchanges;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
