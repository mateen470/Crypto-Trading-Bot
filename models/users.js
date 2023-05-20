import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  accountVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: Number,
  //   userApiKey: String,
  //   userSecretKey: String,
  exchanges: {
    type: [
      {
        exchangeName: String,
        name: String,
        apiKey: String,
        apiSecret: String,
      },
    ],
    default: [],
  },
});

const Users = models.Users || model("Users", userSchema);

export default Users;
