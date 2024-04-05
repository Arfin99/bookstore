import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {
  jwtsecret,
  salt_work_factor,
} from "../utils/environment_prop_access.js";

export const userRegistration = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email.match(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}/)) {
      return res.status(400).send("User Email is Invalid");
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already Exists");
    }

    const salt = bcrypt.genSaltSync(+salt_work_factor);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const jwtPaylod = { _id: user._id, name: user.name, role: user.role };
    const token = jwt.sign(jwtPaylod, jwtsecret, {
      algorithm: "HS256",
      expiresIn: "2d",
    });
    res.status(201).send(`User added, token :${token}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const userProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const profile = await User.findById(_id, {password: 0});
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
