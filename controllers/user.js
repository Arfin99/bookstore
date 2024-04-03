import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtsecret } from "../utils/environment_prop_access.js";

export const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("User already Exists");
  }
  user = new User({ name, email, password });
  await user.save();

  const jwtPaylod = { _id: user._id, name: user.name };
  const token = jwt.sign(jwtPaylod, jwtsecret, {
    algorithm: "HS256",
    expiresIn: "2d",
  });
  res.send(token);
};

export const userProfile = async (req, res) => {
  const { _id } = req.user;
  const profile = await User.findById(_id);
  res.send(profile);
};
